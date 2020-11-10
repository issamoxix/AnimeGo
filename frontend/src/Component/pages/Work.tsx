//Anime Search Page
import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import '../Work.css'
import Card from '../Card'
import Gql from '../Gql'
import { Link, Redirect, useLocation } from 'react-router-dom'




const Work:React.FC = ()=>{
    const [val,setVal] = useState(true)
    const [x,setx] = useState([])
    const [srcx] = useMutation(Gql.get_img)
    const [lod,setlod] = useState(false)
    const[text,setText] = useState('')
    let query = new URLSearchParams(useLocation().search)
    let lang:string | any =query.get('lang')
    document.getElementsByTagName('body')[0].style.overflow = "auto";
    // redirect to english search if the query is not arab or not declared 
    if(lang != "arb") lang = "eng"
     
    return (
        <div className="All" style={lod?{cursor:"wait"}:{}}>
            
            <div className={val ?"container":"container2"}>
            {!val?<div className="res">
                    {x.map((d:string)=>{
                        return (<Link to={`/Anime?name=${d.split('http')[0]}&ep=${parseInt(d.split('EPISODES')[1])}&src=${d.split('EPISODES')[0].split(d.split('http')[0])[1]}&lang=${lang}&data=${lang=="eng"?d.split('DATA/category/')[1]:0}`} >
                            <Card name={d.split('http')[0]} eps={parseInt(d.split('EPISODES')[1])} src={d.split('EPISODES')[0].split(d.split('http')[0])[1]} lang={lang} /></Link>
                        )
                    })}
                </div>:null}
                <div className={val?"search":"search_fix"}>
                    <form onSubmit={(e)=>e.preventDefault()}>
                    <input type="text" className={val?"inpt":"dd"} onInput={async (e)=>{
                        if(e.currentTarget.value.length >=4){
                            setlod(true)
                            const y= await srcx({variables:{anime:e.currentTarget.value,lang:lang}})
                            
                            setx(y.data['get_img'])
                            setlod(false)
                            setVal(false)
                        }else if(e.currentTarget.value === ''){
                            setVal(true)
                        } else{
                            setVal(true)
                        }
                    }} onClick={(e)=>{e.preventDefault()}} value={text} onChange={(e)=>setText(e.currentTarget.value)} placeholder="Anime Name" />
                   {!val? <div className="X-mark" onClick={()=>{
                       setText('')
                       setVal(true)
                   }}>
                       
                        <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>:null}
                    
                    </form>
                    <img src="./pic/lod.gif" alt="loading" className={lod?"show":"hide"} />
                  
                </div>
               
              
                
                
            </div>
            <Link to="/">
                            <img className={val?"undo":"undo fixed"} src="./pic/undo.png" alt="Back" />
                        </Link>
        </div>
    )
}
export default Work