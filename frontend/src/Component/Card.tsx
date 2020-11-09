import React from 'react'
interface Cards {
    src:string;
    name:string;
    eps:number;
    lang:string
}
function Card({ src, name, eps, lang }: Cards) {

    return (
        <div className="card" style={{width:"18rem", margin:"auto"}}>

            <img className="card-img-top" src={src} alt="Anime" />

            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                
                <p className="card-text">Episodes:{eps===0?"---":eps}<br></br>
                Sub:{lang==='arb'?"Arabic":"English"}</p>
            </div>
        </div>

    )
}
export default Card