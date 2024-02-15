import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Addemnu from './components/addmenu';
import Menutemplate from './components/menutemplate';
import Signin from './components/signin';
import { login, logout, selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import { BrowserRouter, useLocation, useParams } from 'react-router-dom';
import { Switch,Route } from 'react-router-dom';
import Menuitems from './templates/basic';
import Basket from './templates/basicbasket';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import Example from './components/Example.';
import QR from './components/qr';
import Prepare from './templates/prepare';
import Admintemplate from './components/admintemplate';
import Templates from './components/templates';
function App() {
  const user = useSelector(selectUser);
  const [template,setTemplate] = useState()
  const [categories, setCatgories] = useState();
  const [templates, setTemplates] = useState();
  const [menuitems, setMenuitems] = useState();

    const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
        
      }else{
        dispatch(logout());
      }
    });

    return () =>{
      unsubscribe();
    }
  },[dispatch])
  useEffect(() =>{
    console.log(template)
    if(user==null) return
    const unsubscribe3 =  db.collection('users')
.doc(user.uid).collection('templates').onSnapshot((querySnapshot) => {
  console.log(querySnapshot)
  const template  = {};
  querySnapshot.forEach((doc) => {
      template[doc.id] = doc.data()
  });
  console.log(template)
  setTemplates(template)
});

    if(template==null) return

 const unsubscribe =  db.collection('users')
    .doc(user.uid).collection('templates').doc(template).collection('catedata').onSnapshot((querySnapshot) => {
      const catereal  = {};
      querySnapshot.forEach((doc) => {
          catereal[doc.id] = doc.data()
      });
      setCatgories(catereal)
  });
  const unsubscribe2 =  db.collection('users')
  .doc(user.uid).collection('templates').doc(template).collection('menudata').onSnapshot((querySnapshot) => {
    const menureal  = {};
    querySnapshot.forEach((doc) => {
        menureal[doc.id] = doc.data()
    });
    setMenuitems(menureal)
});

  return () =>{
    unsubscribe();
    unsubscribe2();
    unsubscribe3();
  }
  
      },[user,template])





  return (
    <div className="App">
         
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
        <Menutemplate/>
        </Route>
        <Route exact path="/example">
        <Example/>
        </Route>
        <Route exact path="/:id/addmenu">
        <Addemnu setTemplate={setTemplate} menuitems={menuitems} categories={categories}/>
        </Route>
        <Route exact path="/:id/qr">
        <QR />
        </Route>
        <Route exact path="/signin">
        <Signin/>
        </Route>
        <Route exact path="/templates">
          <Templates templates={templates} setTemplate={setTemplate}/>
          </Route>
        <Route exact path="/:id/basic" >
        <Menuitems menu={menuitems} categories={categories} setTemplate={setTemplate} setCatgories={setCatgories} setMenuitems={setMenuitems}/>
        </Route>
        <Route exact path="/:id/admin" >
        <Admintemplate menu={menuitems} categories={categories} setTemplate={setTemplate} />
        </Route>
        <Route exact path="/:id/:id" >
        <Menuitems menu={menuitems} categories={categories} setTemplate={setTemplate} setCatgories={setCatgories} setMenuitems={setMenuitems}/>
        </Route>
        <Route exact path="/:id/:id/basket" >
        <Basket menu={menuitems} categories={categories} setTemplate={setTemplate}/>
        </Route>
        <Route exact path="/prepareing">
          <Prepare/>
          </Route>
        

  
  
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
