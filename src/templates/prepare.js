import React from 'react'
import "./basic.css"
import ClipLoader from "react-spinners/PuffLoader";
function Prepare() {
  return (
    <div className='prepare_div'>     <ClipLoader
color='red'
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p>YOUR ORDER IS BEING PREPAREING</p>
      </div>
  )
}

export default Prepare