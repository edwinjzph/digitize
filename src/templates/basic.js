import React, { useCallback, useEffect, useState } from 'react'
import { Box, Container, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import menuimage from "./menu.png"
import InputAdornment from '@mui/material/InputAdornment';
import {useDispatch, useSelector} from "react-redux"
import "./basic.css"
import {
    IconButton,
    Badge,
  } from "@mui/material";

import { login, logout, selecttemplate } from '../features/templateSlice';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Link,useLocation, useParams } from "react-router-dom";




function Menuitems({menu,categories,setTemplate,setCatgories,setMenuitems}) {
    const dispatch = useDispatch();
    const user = useSelector(selecttemplate);
const address  = useParams()
const location  = useLocation()
    const [menu2,setMenu] = useState([])
    const [search,setSearch] = useState("")
    const [categorieid,setCategorieid] = useState(100)



    useEffect( ()=>{
        async function fetchdata(){
        if(location.pathname.split('/').length<3) return;
        const fetchdata={
            resname: location.pathname.split('/')[1],
            url:  location.pathname.split('/')[2]
        }
         const data = await fetch('http://localhost:3001/fetchtemplate',{method: 'POST',headers: {
           'Content-Type': 'application/json'
         }, body: JSON.stringify(fetchdata)}).then((t) =>
           t.json()
       ).catch((error) => {
           console.log("error")
       }
       )
       console.log(data)
       if(data){
setCatgories(data.catedata)
setMenuitems(data.menudata)
       }}
 fetchdata()
       },[])

       console.log(categories,menu)
    useEffect(() => {
        if(address==null) return;
        console.log(address.id.length)
        if(address.id.length>10){
        setTemplate(address.id)}
       setMenu(menu)
    
      
     
      }, [menu,address])

    
function filtercategorie(id){
  setCategorieid(id)
  console.log(id)
  if(id===100){
setMenu(menu)
  }else{
    const filtered = Object.values(menu).filter(innerfilter)
    function innerfilter(value){
      console.log(value.categorie,id)
      if(value?.categorie ===id){
        console.log(true)
        return value
      }
    }
    
  setMenu(filtered)
  }

}






 const addtocart = (id,quantity) =>{
    console.log(id,quantity)
    dispatch(login({
       id:id,
       quantity:quantity,
      }));
 }
 function getSum(total, num) {
    return total + num;
  }
 
  const handleChange = useCallback((e,menu) => {
    if(e.target.value===""){
      setCategorieid(100)
    }
    if(e.target){

      const {value } = e.target;
      setSearch( value );
   
     
      function  searchfilterfun(value2){
        console.log(value2?.menu_name.toString().toLowerCase().includes(value.toLowerCase()))
    
        if(value2?.menu_name.toString().toLowerCase().includes(value.toLowerCase()) || value2?.description.toString().toLowerCase().includes(value.toLowerCase())){
          console.log(true)
          return value2
        }
      }
      console.log(menu)
      const searchfilter= Object.values(menu)?.filter(searchfilterfun)
      setCategorieid(100)
      setMenu(searchfilter)
    }
    
  },[search]);
  useEffect(() => {
    if(search===""){
      filtercategorie(100)
    }
  
  }, [search])
  
  console.log(search)
  return (
    
<div className='menuitems menumain'>
    <div className="div_top">
    <img src={menuimage}></img>


<IconButton
                       component={Link}  
                    to={`/${location.pathname.split('/')[1]}/${location.pathname.split('/')[2]}/basket`}
                    aria-label="Show basket contents"
                    color="inherit"
                  >
                    <Badge badgeContent={Object.values(user).reduce(getSum,0)} color="primary">
                    <i className="fas fa-shopping-bag"></i>
                  
                    </Badge>
                  </IconButton>
                  
    </div>
    <div className="search">

          <TextField color='action' value={search} onChange={e => {handleChange(e,menu)}} fullWidth label="SEARCH" id="fullWidth"    InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>

          ),
          endAdornment: (
            search!=="" ?
            <IconButton disabled={search===""} onClick={() => setSearch("")} >
              <ClearIcon />
            </IconButton>:""
          )
        }}/>



    <div className='categorie_list'>
    <div onClick={() => {filtercategorie(100)}} className={`categorie_select ${100===categorieid?"selected":""}`}>
  <p>ALL</p>
</div>
{categories&& Object.entries(categories).map(value => {
  return(

<div onClick={() => {filtercategorie(value[0])}} className={`categorie_select ${value[0]===categorieid?"selected":""}`}>
  <p>{value[1].categorie_name.toUpperCase()}</p>
</div>

  )
})}
    </div>
 
    </div>

    <Container style={{marginBottom:"30px"}} >
 
        <Grid container spacing={1}>

{menu2 && Object.entries(menu2).map(value=> {
        return( <Grid  item xs={6} sm={6} md={4}><div className='menu_items'> <img src={value[1]?.imageurl}/>
        <div className='menu_items_sub'>
        <p>{value[1]?.menu_name}</p> 
        <span className='rate'>{value[1]?.rating}.0</span>
        </div>
        <p>{value[1]?.price}/-</p>
        <span className='light_discription'>{value[1]?.description}</span>
      
        <div  className='div_buttons'>
   
        <Button fullWidth={true} className='order_button' onClick={() => addtocart(value[0],1)}>ADD TO CART</Button>
        </div>
      </div>
    
      </Grid>)
    })}
   

        </Grid>
    </Container>
    </div>
  )
}

export default Menuitems