import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Grid,Container } from '@mui/material';
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import img5 from "../assets/img5.png"
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {  IconButton} from '@mui/material';



function Templates({templates}) {
    const history = useHistory()
    const imgs = [{id:400,img:img1,theme:"light"},{id:401,img:img2,theme:"dark"},{id:402,img:img3,theme:"light"},{id:403,img:img4,theme:"dark"},{id:404,img:img5,theme:"light"}]

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <h2 style={{margin:"0"}}>My templates</h2>
        <p>Start where you left off or <span>Create new</span></p>
        </div>
<div>
  
<Container style={{marginBottom:"30px"}} >
<Grid container spacing={1} columnSpacing={2} >
  {templates && Object.entries(templates).map((value,index)=>{
    return (
      
<Grid  item xs={12} sm={6} md={3} >
      <div key={value[0]} style={{display:"flex",position:"relative",flexDirection:"column",gap:"10px",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",paddingBottom:"0",borderRadius:"10px",width:"95%",margin:"auto"}}>
    
{imgs.map(value1 =>{
  if(value1.id=== value[1].themeselectedid )

  return(
    <>
<img style={{height:"300px",objectFit:"cover",margin:"7px 7px 0 7px"}} src={value1.img}></img>
    </>
  )

  })}

  <div className='icons' style={{display:"flex",position:"absolute",bottom:"0px",flexDirection:"column",width:"100%",justifyContent:"space-around",margin:"auto",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",paddingTop:"10px",paddingBottom:"10px",backgroundColor:"white",gap:"10px"}}>
    <div className='status_div' style={{display:"flex",justifyContent:"space-between",width:"90%",margin:"auto"}}> 
      <span>{value[1]?.publishstatus=== "published"?"Published":"Draft"}</span>
      <span>{value[1]?.publishstatus=== "published"?`Last published ${value[1]?.timestamp && value[1]?.timestamp.toDate().toDateString()}`:`Created ${value[1]?.createdAt.toDate().toDateString()}`} </span>
    </div>
   <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-around",margin:"auto"}}>
   <div  style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
  <IconButton onClick={()=>{history.push(`/${value[0]}/basic`)}}  className='flair-badge-wrapper' aria-label="remove"    size="small" >
<VisibilityIcon  aria-hidden="true"></VisibilityIcon>
</IconButton>
    <span>Perview</span>    
  </div>
  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
  <IconButton onClick={()=>{history.push(`/${value[0]}/admin`)}}    className='flair-badge-wrapper' aria-label="remove"    size="small" >
<AdminPanelSettingsIcon  aria-hidden="true"></AdminPanelSettingsIcon>
</IconButton>
    <span>Admin</span>
  </div>
  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
  <IconButton onClick={()=>{history.push(`/${value[0]}/addmenu`)}}   className='flair-badge-wrapper' aria-label="remove"    size="small" >
<EditIcon  aria-hidden="true"></EditIcon>
</IconButton>
    <span>Edit</span>
  </div>
  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
  <IconButton   className='flair-badge-wrapper' aria-label="remove"    size="small" >
<DeleteIcon  aria-hidden="true"></DeleteIcon>
</IconButton>
    <span>Delete</span>
  </div>
    </div> 

</div>
      </div>
      </Grid>
    )
  })}
  </Grid>
  </Container>
</div>

        
    </div>
  )
}

export default Templates