import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import "./all.css"
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Admintemplate = ({categories,menu,setTemplate}) => {
    const user = useSelector(selectUser);
    const address = useParams()
    const [queues,setQueues] = useState()
    const [orders,setOrders] = useState()
    useEffect(()=>{
        if(user==null) return;
        if(address==null) return;
        setTemplate(address.id)
        try{
            const queue ={}
            const order= {}
            db.collection('users').doc(user.uid).collection('templates').doc(address.id).collection('queue').get().then((querySnapshot)=>{
                querySnapshot.forEach((doc) =>{
                    queue[doc.id] = doc.data()
                })
                setQueues(queue)
            })
            db.collection('users').doc(user.uid).collection('templates').doc(address.id).collection('orders').get().then((querySnapshot)=>{
                querySnapshot.forEach((doc) =>{
                    order[doc.id] = doc.data()
                })
                setOrders(order)
            })

        }catch(error){

        }
    },[user,address])

    const confirm = async (value) =>{

        const orderobject ={
            orderid:value[0],
            orderdetails: queues[value[0]],
            uid:user?.uid,
            address:address.id,
        }
        console.log(orderobject);
        const data = await fetch('http://localhost:3001/confirmorder',{method: 'POST',headers: {
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
    console.log(categories,menu,queues,address)
  return (
    <Box sx={{ flexGrow: 1 }}  width="100%">
    <div className='main_adv_div' style={{display:"flex",flexDirection:"row",width:"97%",margin:"auto",justifyContent:"center",gap:"10px",marginTop:"60px"}}>
      <div style={{height:"100%",width:"90%",maxHeight:"500px"}}>
      <h3 style={{marginBottom:"10px",textAlign:"start"}} >In request</h3>  
<div className='order_div' style={{display:"flex",flexDirection:"column",Maxwidth:"500px",overflowY:"scroll",margin:"auto",height:"500px",marginTop:"10px",gap:"10px",paddingBottom:"10px",paddingTop:"10px"}}>

    {queues && Object.entries(queues).map((value,index )=>{
        return(
            <div className='admin_queue'  style={{display:"flex",alignItems:"start",width:"90%",justifyContent:"center",  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",padding:"12px",borderRadius:"10px",marginLeft:"auto",marginRight:"auto",gap:"10px",flexDirection:"column",textAlign:"start"}} >
            <span style={{borderBottom:"1px solid #9c27b0",width:"100%",paddingBottom:"5px"}}>orderid-{value[0]}</span>
        <div  key={index} style={{display:"flex",alignItems:"center",width:"95%",justifyContent:"space-between", }}>
     
            <div style={{display:"flex",flexDirection:"column",gap:"10px",textAlign:"start",width:"150px"}}>
            
            {Object.entries(value[1].orderitems).map((value2,index2) =>{
return(
    <div style={{display:"flex",width:"100%",gap:"10px"}}>
        <img style={{height:"50px",width:"50px",objectFit: "cover",borderRadius:"10px"}} src={menu[value2[0]].imageurl}></img>
        <div style={{display:"flex",flexDirection:"column",width:"30px",textAlign:"start",}}>
        <span>{menu[value2[0]].menu_name}</span>
        <span>{parseInt(menu[value2[0]].price)*value2[1]}/-</span>
        <span>QTY-{value2[1]}</span>
        </div>
    
    </div>
)
      })}
           
            </div>
            <div style={{display:"flex",flexDirection:"column",textAlign:"start",width:"100px",gap:"10px"}}>
    
            <span>Total price-{value[1].totalprice}/-</span>
            <span>Total Quantiy-{value[1].quantity}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"30px",height:"100%",justifyContent:"center"}}>
            <IconButton  onClick={()=>{confirm(value)}} style={{color:"#9c27b0",margin:"0",padding:"0"}}   className='flair-badge-wrapper' aria-label="remove"    size="large" >
<DoneIcon  aria-hidden="true"></DoneIcon>
</IconButton>
<IconButton style={{color:"#9c27b0",margin:"0",padding:"0"}}   className='flair-badge-wrapper' aria-label="remove"    size="large" >
<CloseIcon aria-hidden="true"></CloseIcon>
</IconButton>
            </div>

        </div>
        </div>)
    })}
</div>
      </div>
      <div style={{height:"100%",width:"90%",maxHeight:"500px"}}>
      <h3 style={{marginBottom:"10px",textAlign:"start"}} >Orders</h3>  
<div className='order_div' style={{display:"flex",flexDirection:"column",Maxwidth:"500px",overflowY:"scroll",margin:"auto",marginTop:"10px",gap:"10px",paddingBottom:"10px",maxHeight:"500px",paddingTop:"10px"}}>

    {orders && Object.entries(orders).map((value,index )=>{
        return(
            <div className='admin_queue'  style={{display:"flex",alignItems:"start",width:"90%",justifyContent:"center",  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",padding:"12px",borderRadius:"10px",marginLeft:"auto",marginRight:"auto",gap:"10px",flexDirection:"column",textAlign:"start"}} >
            <span style={{borderBottom:"1px solid #9c27b0",width:"100%",paddingBottom:"5px"}}>orderid-{value[0]}</span>
        <div  key={index} style={{display:"flex",alignItems:"center",width:"95%",justifyContent:"space-between", }}>
     
            <div style={{display:"flex",flexDirection:"column",gap:"10px",textAlign:"start",width:"150px"}}>
            
            {Object.entries(value[1].orderitems).map((value2,index2) =>{
return(
    <div style={{display:"flex",width:"100%",gap:"10px"}}>
        <img style={{height:"50px",width:"50px",objectFit: "cover",borderRadius:"10px"}} src={menu[value2[0]].imageurl}></img>
        <div style={{display:"flex",flexDirection:"column",width:"30px",textAlign:"start",}}>
        <span>{menu[value2[0]].menu_name}</span>
        <span>{parseInt(menu[value2[0]].price)*value2[1]}/-</span>
        <span>QTY-{value2[1]}</span>
        </div>
    
    </div>
)
      })}
           
            </div>
            <div style={{display:"flex",flexDirection:"column",textAlign:"start",width:"100px",gap:"10px",}}>
    
            <span>Total price-{value[1].totalprice}/-</span>
            <span>Total Quantiy-{value[1].quantity}</span>
            </div>
      

        </div>
        </div>)
    })}
</div>
      </div>
    
    </div>
  </Box>
  )
}

export default Admintemplate