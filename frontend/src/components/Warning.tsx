import React from 'react'
import "./Warn.css"
const Warning:React.FC = ()=>{
    return (
        <div className="Cau">
            <div className="container">
                <div className="warn">
                    <div className="warn-title">
                        <h1>Searching ...</h1>
                    </div>
                    <div className="warn-body">
                        <img src="./pic/lod.gif" alt="loading" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Warning