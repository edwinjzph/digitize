import React, { useCallback, useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./all.css"
import ImageUploading from 'react-images-uploading';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import {  useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectUser } from '../features/userSlice';
import  db, { createtemplatecategorie, createusertemplatemenu, updateurl } from '../firebase';
import { useHistory, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Addemnu({setTemplate,menuitems,categories}) {
    const user = useSelector(selectUser);
    const shortid = require('shortid');
    const address = useParams()
    const history = useHistory()
    const [value, setValue] = React.useState('one');
    const [open, setOpen] = React.useState(false)
    const [addcate, setAddcate] = React.useState(false);
    const [addMenu, setAddmenu] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [url, setUrl] = React.useState({
      url: shortid.generate(),
      qrurl:'',
      uid:'',
      resname:'',
      templateid:""
    });
    const [images, setImages] = React.useState([]);
  
    const maxNumber = 1;
   
    const [menu, setMenu] = React.useState({
      menu_name: "",
      description: "",
      image: "",
      imageurl:"",
      categorie:"",
      price:"",
      templateid:"",
      menuid:"",
      uid: user? user.uid: ""
    });


    const [categorie, setCatgorie] = React.useState({
      categorie_name: "",
      description: "",
      templateid:"",
      uid: user? user.uid: ""
    });
console.log(url,categorie,menu)
    const handleChange3 = useCallback((e) => {
      const { name, value } = e.target; 
      
      setMenu({ ...menu, [name]: value });
    }
      ,[menu])
      const handleChange2 = useCallback((e) => {
        const { name, value } = e.target; 
        console.log(name,value)
        setCatgorie({ ...categorie, [name]: value });
      }
        ,[categorie])
        const handleChange4 = useCallback( async (e) => {
          
          if(address==null) return;
          
          const {  name,value } = e.target; 
        url.url=value
  
          const checkurl ={
            url: value,
            uid: menu.uid
        }
      
        const data = await fetch('http://localhost:3001/customurl',{method: 'POST',headers: {
            'Content-Type': 'application/json'
          }, body: JSON.stringify(checkurl)}).then((t) =>
            t.json()
        ).catch((error) => {
          console.log("Please try again after some time")
         return
        }
       
        )
        setError(!data?.exist)
        if(data?.exist){
          setUrl({...url,url:value})
          setUrl({...url,qrurl:`http://localhost:3001/${url.resname}/${url.url}`})
        }
        }
      
          ,[])

      useEffect(() =>{
        if(user==null) return
        if(address==null) return
        setTemplate(address.id)
          menu.uid = user.uid
         categorie.uid = user.uid
         url.uid = user.uid
          setMenu({ ...menu, "templateid": address.id });
         setCatgorie({ ...categorie, "templateid": address.id });
        url.templateid = address.id
         db.collection('users').doc(user.uid).get().then((querysnapshop) =>{
         url.resname =querysnapshop.data().resname
          url.qrurl = `http://localhost:3001/${url.resname}/${url.url}`
         })
          },[user,address])

const deletecate = ((id) =>{ 
  if(user==null ) return
  if(addcate==null ) return
  db.collection("users").doc(user.uid).collection('templates').doc(address.id).collection('catedata').doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
})
})

const deletemenu = ((id) =>{
  if(user==null ) return
  if(addcate==null ) return
  db.collection("users").doc(user.uid).collection('templates').doc(address.id).collection('menudata').doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
})
})

const uploadData = ((e) =>{
  e.preventDefault();
  if(menu.image!="" || menu.imageurl!=""){
    if(menu.categorie!=""){
  createusertemplatemenu(menu).then(()=>{
    console.log("uploaded")
    setAddmenu(false)
    setMenu({
      menu_name: "",
      description: "",
      image: "",
      menuid:"",
      imageurl:"",
      categorie:"",
      price:"",
      templateid: address?.id,
      uid: user? user.uid: ""
    })
    setImages([])

  })}else{
console.log("Add Categories")
  }}else{
    console.log("add images")
  }
    
})
const editmenu = ((data) =>{
  if(data ==null) return
  console.log(data)
  setAddmenu(true)
  setMenu({
    menu_name: data[1].menu_name,
    description: data[1].description,
    imageurl: data[1].imageurl,
    image:"",
    categorie: data[1].categorie,
    price: data[1].price,
    menuid: data[0],
    templateid: address?.id,
    uid: user? user.uid: ""
  })

})

const uploadcate = ((e) =>{

  e.preventDefault();
  if(user ==null) return
  if(address ==null) return
  createtemplatecategorie(categorie).then(()=>{
    console.log("uploaded")
    setAddcate(false)
    setCatgorie({
      categorie_name: "",
      description: "",
      templateid: address?.id,
      uid: user? user.uid: ""
    })
  })
    
})
const updatecustomurl = ((e) =>{
  e.preventDefault();
  if(user ==null) return
  if(address ==null) return
 updateurl(url).then(()=>{
  setUrl({
    uid: user? user.uid: "",
    templateid:address?.id,
    url: shortid.generate(),
    qrurl:'',
    resname:'',
  })
  history.push(`/${address.id}/qr`)
 })
    
})
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setMenu({...menu,image:imageList.length>0? imageList[0].file:""})
      };
     
     

function onDismiss() {
  setOpen(false)
}
  return (
 
    <div>
   
        <div className="addmenu_sub">
          <div style={{display:"flex",width:"100%",justifyContent:"end",gap:"10px"}}>
          
            <>
       
      <BottomSheet   onDismiss={onDismiss}
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 0.6]}
    
           open={open}> <div className="publish">
            <h3>Your Menu is ready to be published</h3>
            <h4>Choose a custom URL for your Page</h4>
            <form onSubmit={updatecustomurl} style={{display:"flex",gap:"20px",flexDirection:"column"}}>
            <div  className="publish_url"><span>menuqr/bbq/</span>
            <ThemeProvider theme={darkTheme}>
            <TextField error={error}    value={url.url} onChange={handleChange4}  inputProps={{ maxLength: 20,minLength:1 }} name='url' required fullWidth id="outlined-basic" label={error?"url not available":""} variant="outlined" size='small'  />
            </ThemeProvider>
           </div>
            <button type='submit' disabled={error} >PUBLISH</button>
            </form>
            </div></BottomSheet>
         
           
    </>
         
        
            <button onClick={() =>{history.push(`/${address.id}/basic`)}} style={{padding:"7px",borderRadius:"5px",backgroundColor:"white",width:"100px",cursor:"pointer"}}>Preview</button>
            <button onClick={() => setOpen(true)} style={{padding:"7px",borderRadius:"5px",backgroundColor:"#6d2bdc",color:"white",border:"none",width:"100px"}}>Publish</button>
          </div>
        <h2>Add your restaurant menu</h2>
        <Box sx={{ width: '100%'  ,}}>
        <TabContext value={value}>

 
      <Tabs
        value={value}
onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Menu Items" />
        <Tab value="two" label="Categories" />
  
      </Tabs>
     
      <TabPanel sx={{padding : '0px'}} value="one">
    <Box sx={{ width: '100%',marginTop: '10px' , marginBottom : '20px'}}>
<div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
{(menuitems && Object.entries(menuitems).length>0) &&
  <>
  
 { !addMenu ?  <div  style={{width:"100%",display:"flex",justifyContent:"end",marginTop:"10px"}}>



  <IconButton onClick={()=>{setAddmenu(true);    setMenu({
      menu_name: "",
      description: "",
      image: "",
      menuid:"",
      imageurl:"",
      categorie:"",
      price:"",
      templateid: address?.id,
      uid: user? user.uid: ""
    })}} style={{color:"#9c27b0",}} disableRipple={true}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
    <h5 style={{margin:"0px"}}>Create New</h5>
<AddIcon  aria-hidden="true"></AddIcon>
</IconButton>
</div>:
<div style={{width:"100%",display:"flex",justifyContent:"start"}}>
  <IconButton onClick={()=>{setAddmenu(false)}} style={{color:"#9c27b0",margin:"0",padding:"0"}}   className='flair-badge-wrapper' aria-label="remove"    size="large" >

<ArrowBackIcon  aria-hidden="true"></ArrowBackIcon>
</IconButton>
</div>}
</>}

{(menuitems && Object.entries(menuitems).length>0) && !addMenu?
Object.entries(menuitems).map((value,index) =>{
  return ( 
  <div className='menuitems_dis' style={{display:"flex",justifyContent:"space-between",height:"80px",alignItems:"center",borderRadius:"7px"}}>
    <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"7px"}}>
    <img style={{height:"80px",objectFit:"cover",borderRadius:"7px  0 0 7px",width:"80px"}} src={value[1]?.imageurl}></img>
    <div  style={{display:"flex",flexDirection:"column",height:"60px",alignItems:"start",justifyContent:"center"}}>
      <span  style={{color:"#6d2bdc"}}>{value[1]?.menu_name}</span>
      <span style={{color:"#6d2bdc"}}>{value[1]?.price}/-</span>
    </div>
    </div>
    <div style={{display:"flex",gap:"10px"}}>
    <IconButton onClick={()=>{editmenu(value)}} className='flair-badge-wrapper' aria-label="remove"    size="small" >
 <EditIcon  aria-hidden="true"></EditIcon>
 </IconButton>
    <IconButton  onClick={() => {deletemenu(value[0])}} className='flair-badge-wrapper' aria-label="remove"    size="small" >
 <DeleteIcon  aria-hidden="true"></DeleteIcon>
 </IconButton>
    </div>

  </div>
  )
})
: <form onSubmit={uploadData}>
<div className="details">
    <h4>Details</h4>
<TextField value={menu.menu_name}    inputProps={{ maxLength: 20,minLength:1 }} name='menu_name' onChange={handleChange3} required fullWidth id="outlined-basic" label="Menu Item Name" variant="outlined" sx={{marginTop: '10px'}} />
<TextField
      id="outlined-multiline-static"
      fullWidth
      required
      inputProps={{ maxLength: 60,minLength:30 }}
      name='description'
      value={menu.description}
      onChange={handleChange3}
      label="Description"
      sx={ { marginTop : '10px'}
      }
      multiline
      rows={2}
   
    />

</div>
<div className="flex_details">
<div className="details">
<h3>Image</h3>
<ImageUploading
    multiple
    value={images}
    onChange={onChange}
    maxNumber={maxNumber}
    dataURLKey="data_url"
  >
    {({
      imageList,
      onImageUpload,
      onImageRemoveAll,
      onImageUpdate,
      onImageRemove,
      isDragging,
      dragProps,
    }) => (
        
        <div className="upload__image-wrapper">

        <div
        className='image_view'
          style={isDragging ? { color: 'red' } : undefined}
         
          {...dragProps}
        >{(imageList.length===0 && menu.imageurl=="")  && <div className='click_on' onClick={onImageUpload}> <h5> Click or Drop here</h5></div>   }
   { menu.imageurl!=""  &&      <div  className="image-item">
             <img src={ menu.imageurl} alt="" />
         
       <IconButton onClick={() =>{setMenu({...menu,imageurl:""})}}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
<ClearIcon  aria-hidden="true"></ClearIcon>
</IconButton>
  
        </div> }
        {imageList.map((image, index) => (
          <div key={index} className="image-item">
             <img src={ image['data_url']} alt="" />
         
       <IconButton onClick={() => onImageRemove(index)} className='flair-badge-wrapper' aria-label="remove"    size="small" >
<ClearIcon  aria-hidden="true"></ClearIcon>
</IconButton>
  
        </div> 
        ))} 
        </div>
      </div>
  
    
    )}
  </ImageUploading>

  </div>
  <div className=" details_sub">
  <div className="details">
<h4>Categorie</h4>
{categories && Object.entries(categories).length>0 ?     <FormControl required fullWidth sx={{marginTop : '10px'}}>
    <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"  
      label="categorie"
      name='categorie'
      value={menu.categorie}
      onChange={handleChange3}
    >
   
      {Object.entries(categories).map((value,index) =>{
        return (
      
             <MenuItem key={index} value={value[0]}>{value[1].categorie_name}</MenuItem>
      
        )
     
      })}
    </Select>
  </FormControl>: <div className='add_cate' ><span onClick={() =>{setValue("two")}} className='cate_route'>Add Categorie</span></div> }

     
</div>


<div className="details">
<h4>Price</h4>

<FormControl required fullWidth sx={{ marginTop : "10px"}} >
      <InputLabel variant='outlined' htmlFor="outlined-adornment-price">Price</InputLabel>
      <OutlinedInput
      onChange={handleChange3}
      name='price'
      value={menu.price}
      type='number'
      InputProps={{ inputProps: { min: 1, max: 10000 } }}
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
        label="Price"
      />
    </FormControl>
</div>
  </div>


</div>
<button type='submit'  className="save_changes">
    <h4>Save Changes</h4></button>




    </form>}
</div>

</Box>
    </TabPanel>
  <TabPanel sx={{padding : '0px'}} value="two"><Box sx={{ width: '100%',marginTop: '10px' , marginBottom : '20px'}}>
<div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
  {(categories && Object.entries(categories).length>0) &&
  <>
  
 { !addcate ?  <div  style={{width:"100%",display:"flex",justifyContent:"end",marginTop:"10px"}}>



  <IconButton onClick={()=>{setAddcate(true)}} style={{color:"#9c27b0",}} disableRipple={true}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
    <h5 style={{margin:"0"}}>Create New</h5>
<AddIcon  aria-hidden="true"></AddIcon>
</IconButton>
</div>:
<div style={{width:"100%",display:"flex",justifyContent:"start"}}>



  <IconButton onClick={()=>{setAddcate(false)}} style={{color:"#9c27b0",margin:"0",padding:"0"}}   className='flair-badge-wrapper' aria-label="remove"    size="large" >

<ArrowBackIcon  aria-hidden="true"></ArrowBackIcon>
</IconButton>
</div>}
</>}



    {(categories && Object.entries(categories).length>0) && !addcate?
    Object.entries(categories).map((value,index) =>{
      return (
        
        <div key={index} className='cate_box' style={{display:"flex",justifyContent:"space-between",height:"60px",padding:"10px",boxShadow:"rgba(255, 255, 255, 0.2) 0px 2px 8px 0px",alignItems:"center",cursor:"pointer"}}>
        <span style={{color:"#6d2bdc"}}>{value[1].categorie_name.toUpperCase()}</span>
        <IconButton onClick={()=>{deletecate(value[0])}}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
 <DeleteIcon  aria-hidden="true"></DeleteIcon>
 </IconButton>
      </div>
      )
    
    }):  <form onSubmit={uploadcate} className="details">
    <h4>Details</h4>
    
<TextField required onChange={handleChange2}     value={categorie.categorie_name} name='categorie_name' fullWidth id="outlined-basic" label="Categorie" variant="outlined" sx={{marginTop: '10px'}} />
<TextField
      id="outlined-multiline-static"
      fullWidth
      name='description'
      label="Description"
      value={categorie.description}
      onChange={handleChange2}
      sx={ { marginTop : '10px'}
      }
      multiline
      rows={2}
    />
        <button type='submit'  className="save_changes">
    <h4>Save Changes</h4></button>

</form> }
    </div>
  
    

  
   
   

</Box></TabPanel>


</TabContext>
    </Box>
        </div>
       
      </div>
    
  )
}

export default Addemnu;