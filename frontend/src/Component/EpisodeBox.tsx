import { url } from 'inspector';
import React from 'react';
interface data {
    n:number,
    img:string,
    pross:any,
    name:string
}
function EpisodeBox({ n ,img, pross,name }: data) {
    const stye = {
        background:`url('${img}')`,
        backgroundSize:"contain",
        backgroundRepeat:"no-repeat"
    }
    return (
        <div className="Episode-box" style={stye} onClick={()=>pross(name,n)}>
            <h5>Episode {n}</h5>
        </div>
    );
}
export default EpisodeBox