import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import {getDownloadURL, getStorage,ref,uploadBytes} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';


const firebaseConfig = {
    apiKey: "AIzaSyAlu_3mtUtofrX1TsxemgUs1r6-gEf_j_Q",
    authDomain: "resmenu-c1b90.firebaseapp.com",
    projectId: "resmenu-c1b90",
    storageBucket: "resmenu-c1b90.appspot.com",
    messagingSenderId: "142367069819",
    appId: "1:142367069819:web:f1c79ebd5b924b98f2f4de",
    measurementId: "G-C55G2NCHYR"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp)
  const db = firebaseApp.firestore();
  const auth=firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
      console.log(res.user)
    }).catch((error) => {
      console.log(error.message)
    })
  }


  export {auth ,storage};
  export default db;

  export const createusertemplatemenu = async (data) => {
    if(!data) return
 var uuid;
    const {categorie,description,image,menu_name,price,uid,templateid,menuid,imageurl} =data
    if(menuid==""){
      uuid =uuidv4()
    }else{
uuid= menuid;
    }
    if(imageurl==""){
    const userRef = db.doc(`users/${uid}/templates/${templateid}/menudata/${uuid}`);
      const imageref = ref(storage,`menuimagess/${templateid + uuidv4()}`)
      uploadBytes(imageref,image).then(  (snapshot )=>{
        getDownloadURL(snapshot.ref).then( async (url)=>{
          console.log("image_uploaded")
          try {
            await userRef.set({
              menu_name: menu_name,
              templateid:templateid,
              description:description,
              categorie:categorie,
              price:price,
              imageurl: url,
              createdAt: new Date(),
            });
          } catch (error) {
            console.log('Error in creating user', error);
          }
        })
      }) }else{
        try {
          const userRef = db.doc(`users/${uid}/templates/${templateid}/menudata/${uuid}`);
          await userRef.update({
            menu_name: menu_name,
            templateid:templateid,
            description:description,
            categorie:categorie,
            price:price,
            imageurl: imageurl,
           
          });
        } catch (error) {
          console.log('Error in creating user', error);
        }
      }
    
  }
  
  export const createtemplatecategorie = async (data) => {
    if(!data) return
    const uuid =uuidv4()
    const {categorie_name, description, templateid, uid} =data
    console.log(uid)
    const userRef = db.doc(`users/${uid}/templates/${templateid}/catedata/${uuid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
      try {
        await userRef.set({
          templateid:templateid,
          categorie_name: categorie_name,
          description: description, 
          createdAt: new Date(),
        });
      } catch (error) {
        console.log('Error in creating user', error);
      }
}
  }

  export const createtemplate = async (data,uuid) => {
    if(!data) return
    const {id ,uid} =data
    const userRef = db.doc(`users/${uid}/templates/${uuid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
          try {
            await userRef.set({
              themeselectedid:id,
              publishstatus:"unpublished",
              createdAt: new Date(),
            });
          } catch (error) {
            console.log('Error in creating user', error);
          }
    }
  }
  export const updateurl = async (data) => {
    if(!data) return
    const {url ,uid,templateid,qrurl} =data
    const userRef = db.doc(`users/${uid}/templates/${templateid}`);
          try {
            await userRef.update({
              url:url,
              fullurl: qrurl,
              publishstatus:"published",
              createdAt: new Date(),
            });
          } catch (error) {
            console.log('Error in creating user', error);
          }
    
  }