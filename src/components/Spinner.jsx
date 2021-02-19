import React from 'react'
import ReactLoading from 'react-loading';

 function Spinner() {
     return (
        <div className="spinner">
        <ReactLoading type="spinningBubbles" color="#755f3d" height={75} width={75} />
 </div>     
     )
 }
 
 export default Spinner
 