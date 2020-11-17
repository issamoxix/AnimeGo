import React from 'react'
import { Link } from 'react-router-dom';

import "../styles/Landing.css"


const Landing:React.FC = ()=>{
    
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
    
    setTimeout(()=>document.getElementsByTagName('body')[0].style.height = "100%"
  ,2400)
   
    
    
    return (
<div className="container-L" style={{height:"100%"}}>  
  <div className="left">
  <Link to="/search?lang=arb">
    <div className="body">
      
      <div className="sub-body">
      <img src="./pic/hat.png" alt="side bar" />
    <h5>Arabic sub</h5>
      </div>
    </div>
    </Link>
  </div>
  <div className="right">
  <Link to="/search?lang=eng">
    <div className="body">
      
      <div className="sub-body">
      <img src="./pic/english.png" alt="side bar" />
      <h5>English sub</h5>
      </div>  
    </div>
    </Link>
  </div>
</div>
  
    )
}
export default Landing