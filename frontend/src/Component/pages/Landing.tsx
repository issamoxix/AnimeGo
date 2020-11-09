import React from 'react'
import { Link } from 'react-router-dom';

import "../Landing.css"


const Landing:React.FC = ()=>{
    
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
    
   
    
    
    return (
<div className="container-L">  
  <div className="left">
    <div className="body">
      <Link to="/search?lang=arb">
      <div className="sub-body">
      <img src="./pic/hat.png" />
    <h5>Arabic sub</h5>
      </div>
      </Link>
    </div>
  </div>
  <div className="right">
    <div className="body">
      <Link to="/search?lang=eng">
      <div className="sub-body">
      <img src="./pic/english.png" />
      <h5>English sub</h5>
      </div>
      </Link>
    </div>
  </div>
</div>
  
    )
}
export default Landing