import React, { useEffect, useState, version } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./all.css"
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import img5 from "../assets/img5.png"
import { createtemplate } from '../firebase';

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }
function Menutemplate() {
  let history = useHistory();
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [slides, setSlides] = useState(5);
    const [selected, setSelected] = useState(6);
    const imgs = [{id:400,img:img1,theme:"light"},{id:401,img:img2,theme:"dark"},{id:402,img:img3,theme:"light"},{id:403,img:img4,theme:"dark"},{id:404,img:img5,theme:"light"}]
    const user = useSelector(selectUser);

    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
      }
   
  
      window.addEventListener('resize', handleWindowResize);

      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);

    useEffect(() =>{
        function setwidth(){
            if( windowSize.innerWidth>1100){
                setSelected(6)
                setSlides(4)
            }
            if( windowSize.innerWidth<1200){
                setSelected(6)
                setSlides(4)
            }
            if( windowSize.innerWidth<1100){
                setSelected(6)
                setSlides(3)
            }
       
            if( windowSize.innerWidth<700){
                setSelected(6)
                setSlides(2)
            }
            if( windowSize.innerWidth<550){
                setSelected(7)
                setSlides(1)
            }
                }
                setwidth()
    },[windowSize])
   console.log(selected)
   const createtemplateid =(data)=>{
    const uuid = uuidv4()
    createtemplate(data,uuid).then(()=>{
      console.log("completed")
      history.push(`/${uuid}/addmenu`)
    })
   }
  
    var settings = {
        dots: true,
        autoplay:true,
        arrows: true,
        speed: 500,
        Infinity:true,
        slidesToShow: slides,
        slidesToScroll: slides
      }
  return (
    <div >
        <div className="select">
            <h2>Select Template</h2>
            <h3>You can change at any time</h3>
        </div>
           <Slider {...settings}>
            {imgs.map((value,index) =>{
                return(
    <div key={index}>
    <div onClick={() => {windowSize.innerWidth>550&&   setSelected(index)}} className={selected===index ||selected===7?"menutemp selected2":"menutemp"}>
     <img src={value.img}></img>
     {(selected===index ||selected===7) && <div key={index} onClick={() =>{createtemplateid({id:value.id,uid:user.uid})}} className={selected===7?"proceed gradient":"proceed"}>
        <h4 >Select & Proceed</h4></div>}
    </div>
 
     </div>)
            })}
 
    
     
    </Slider>
    </div>
  )
}

export default Menutemplate