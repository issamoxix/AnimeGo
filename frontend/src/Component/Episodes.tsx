import React from 'react'
import "./Episodes.css"

type info= {
    ep:Element[],
}
const eps = [<li>ep</li>,<li>ep</li>,<li>ep</li>]
function Episodes({ ep }: info) {
    return (
        <div className="Episodes">
            <ul>
                {ep.map((d)=>{
                    return d
                })}
            </ul>
        </div>
    )
}
export default Episodes