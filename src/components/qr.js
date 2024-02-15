import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import db from '../firebase'
import img from "../assets/menu.png"
import { BottomSheet } from 'react-spring-bottom-sheet'
import QRCode from "react-qr-code";
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
  } from "react-share";
import { WhatsappIcon,FacebookIcon,TwitterIcon,TelegramIcon } from "react-share";


function QR() {
    const user = useSelector(selectUser);
    const confetti = require('canvas-confetti');
    const [open, setOpen] = React.useState(true)
  const address = useParams()
  const history = useHistory()
const [qrdata,setQrdata] = useState()
useEffect(() =>{
if(address==null) return;
if(user==null) return;
    db.collection('users').doc(user.uid).collection("templates").doc(address.id).get().then((querSnapshot) =>{
        setQrdata(querSnapshot.data())
    })
},[user,address])
console.log(qrdata)
function onDismiss() {
    setOpen(false)
  }

  return (
    <div style={{height:"100%",width:"100%",position:"relative"}}>
      
          <div className='div_top' style={{display:"flex",width:"88%",justifyContent:"end",gap:"10px",margin:"auto",marginTop:'30px'}}>
                <>
          
       <BottomSheet   onDismiss={onDismiss}
         snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 0.6]}
            open={open}> <div className="publish">
             <h3>PUBLISHED!</h3>
             <h4>Your Menu page is live!</h4>
             <h5>Now you can share your link</h5>
             <div style={{display:"flex",gap:"20px"}}>
                      <WhatsappShareButton  round><WhatsappIcon size={32} round></WhatsappIcon></WhatsappShareButton>
                      <FacebookShareButton    round><FacebookIcon size={32} round></FacebookIcon></FacebookShareButton>
                      <TelegramShareButton  round><TelegramIcon size={32} round></TelegramIcon></TelegramShareButton>
                      <TwitterShareButton     round><TwitterIcon size={32} round></TwitterIcon></TwitterShareButton>
                      </div>

                      <button style={{paddong:"10px"}}>GO BACK TO HOME</button>
             </div></BottomSheet>         
     </> 
     <button onClick={() =>{history.push(`/${address.id}/basic`)}} style={{padding:"7px",borderRadius:"5px",backgroundColor:"white",width:"100px",cursor:"pointer"}}>Preview</button>
            <button onClick={() => setOpen(true)} style={{padding:"7px",borderRadius:"5px",backgroundColor:"#6d2bdc",color:"white",border:"none",width:"100px"}}>Share</button>
          </div>
        <div style={{position:"relative", height:"550px",width:"300px",display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"center",margin:"auto",border:"1px solid black" ,borderRadius:"10px",marginTop:"30px",gap:"70px"}} className="qr_div">
            <img src={img} style={{height:"100px",}}></img>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <QRCode size={150} style={{border:"1px solid black",padding:"10px",borderRadius:"8px"}}   value={qrdata? qrdata.fullurl:""}/>
            <span>Scan this QR to view menu</span>
          
            </div>
            <span>Made with love by edwin</span>
        
        </div>
       

    </div>
  )
}

export default QR