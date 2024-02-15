import React from 'react'
import { Container, Grid, SvgIcon } from '@mui/material';
import menuimage from "./menu.png"
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux"
import "./basic.css"
import {
    IconButton,
    Badge,
  } from "@mui/material";
  import RemoveIcon from '@mui/icons-material/Remove';
  import DeleteIcon from '@mui/icons-material/Delete';
  import AddIcon from '@mui/icons-material/Add';
import { login, logout,remove, decrement, selecttemplate } from '../features/templateSlice';
import { Link, useLocation, useParams } from "react-router-dom";
function Basket({menu}) {
    const dispatch = useDispatch();
    const address   = useLocation();
    const user = useSelector(selecttemplate);
function subtotal(menu,user){
    if(menu==null) return;
    if(user==null) return;  
      var sum =0;
Object.entries(menu).map(value => {
  console.log(value)
  console.log(user)
    if(Object.keys(user).includes(value[0])){
        sum =sum+  value[1]?.price * user[value[0]]
    }

})
return sum;
}
 function getSum(total, num) {
    return total + num;
  }

const order= async () =>{
  const orderobject ={ 
    table:  1,
    orderitems : {
      user
    },
    quantity: Object.values(user).reduce(getSum,0),
    totalprice: subtotal(menu,user),
    resname: address.pathname.split('/')[1],
    templateurl: address.pathname.split('/')[2]
  }
  console.log(orderobject)
  const data = await fetch('http://localhost:3001/queue',{method: 'POST',headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(orderobject)}).then((t) =>
    t.json()
).catch((error) => {
   
    console.log("error")
}

)
if(data?.status==="ok"){
console.log("success")
}
}

  return (
<div className='menuitems' id='bas2'>
    <div className="div_top bastop">
    <img src={menuimage}></img>


<IconButton
                       component={Link}  
                    to="/basket"
                    aria-label="Show basket contents"
                    color="inherit"
                  >
                   
                  
                    <Badge badgeContent={Object.values(user).reduce(getSum,0)} color="primary">
                    <i className="fas fa-shopping-bag"></i>
                  
                    </Badge>
                   
                  </IconButton>
    </div>
<div className="container_div">
<Container >
        <Grid container spacing={1}>

{menu && Object.entries(menu).map(value=> {

    if(Object.keys(user).includes(value[0]))
   
        return( <Grid  item xs={12} sm={12} md={12}><div className='menu_items bas' >
            <div className='cart_div'>
            <img src={value[1]?.imageurl}/>
        <div className='cart_div_2'>
           
        <p className='product_name_cart'>{value[1]?.menu_name}</p>
        <p className='product_name_price'>{value[1]?.price * user[value[0]]}/-</p>
        <div className='product_name_qty'>


    <IconButton aria-label="delete"    size="small">
    <RemoveIcon  className='plus'  onClick={() => {   dispatch(decrement({
       id:value[0],
       quantity:1,
      }));}}/>
</IconButton>


      
   
        <span className='qty'>QTY-{user[value[0]]}</span>

     
          <IconButton aria-label="delete"    size="small">
<AddIcon className='plus' onClick={() => {   dispatch(login({
       id:value[0],
       quantity:1,
      }));}}/>


</IconButton>
        </div>
      
        <div>
      
            </div>
    
    
       
        </div>
        </div>
 <IconButton aria-label="remove"    size="small" >
 <DeleteIcon  onClick={()=> {    dispatch(remove({
       id:value[0]
       
      }));}}  aria-hidden="true"></DeleteIcon>
 </IconButton>
       

      </div>
    
      </Grid>)
    })}
   

        </Grid>
    </Container>

</div>
  
    <div className="total_div">
               <div className="total_sub">
                <div className="total_inner">
                <p>SUBTOTAL:</p>
                <p>{subtotal(menu,user)}/-</p>
                </div>
                <div className="total_inner">
                <p>GST(5%):</p>
                <p>{(5*subtotal(menu,user))/100}/-</p>
                </div>
                <hr ></hr>
                <div className="total_inner grand">
                <p >GRAND TOTAL:</p>
                <p>{subtotal(menu,user) +((5*subtotal(menu,user))/100)}/-</p>
                </div>
             <Link to='/prepareing' className='order_now'>
            <Button onClick={()=>{order()}} fullWidth={true} className='order_button bas6'>
            ORDER NOW
            </Button>
          
             </Link>
               
            
             
           
          
               </div>
            </div>
    
    </div>
  )
}

export default Basket