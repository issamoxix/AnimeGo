import React from 'react'
interface Cards {
    src:string;
    name:string;
    eps:number
}
function Card({ src, name, eps }: Cards) {

    return (
        <div className="card" style={{width:"18rem", margin:"auto"}}>

            <img className="card-img-top" src={src} alt="Anime" />

            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Episodes:{eps===0?1:eps}<br></br>
                Sub:arabic</p>
            </div>
        </div>

    )
}
export default Card