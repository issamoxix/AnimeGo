import React, { useState  } from 'react'
import { useLocation } from 'react-router-dom'
import "../Anime.css"
const Anime:React.FC = ()=>{
    const [btn,setbtn] = useState(false)

    
    let query = new URLSearchParams(useLocation().search)
  
 
   
    return (
        <div className="Anime-container">
            <div className="desc">
                
                <div className="card" id="Anime Card" style={{width:"18rem"}}>
                    <img alt="Anime " src={String(query.get('src'))} className="card-img-top" />
                    <div className="card-body">
                        <h4 className="card-title">{query.get('name')}</h4>
                        <p className="card-text">
                            Episodes: {query.get('ep')}
                        </p>
                    </div>
                </div>
            </div>
            <div className="show" >
                <div className="ch">
                <button className="dropdown1" onClick={()=>setbtn(!btn)} >Episodes </button>
                    <div className="dropdown-content" style={btn?{display:"block"}:{display:"none"}}>
                        <ul>
                            <li>Issam</li>
                            <li>Issam</li>
                            <li>Issam</li>
                            <li>Issam</li>
                            <li>Issam</li>
                      
                        </ul>
                    </div>
                </div>
               <div className="screen">
                   <iframe title="anime" style={{width:"40rem",height:"25rem"}} src="..." />
               </div>
            </div>
        </div>
    )
}
export default Anime

