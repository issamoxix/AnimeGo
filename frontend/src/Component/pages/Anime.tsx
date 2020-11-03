import { useMutation } from '@apollo/react-hooks'
import React, { useState  } from 'react'
import { useLocation } from 'react-router-dom'
import "../Anime.css"
import Gql from '../Gql'
const Anime:React.FC = ()=>{
    
    const [ep,setep] = useState('ep')
    const [ep_n,setep_n] = useState('')
    const [int,setint] = useState(false)
    const [iframe,setiframe] = useState('')
    // Mutations 
    const [check] = useMutation(Gql.get_sugg)
    const [get_episode] = useMutation(Gql.find_anime)
    // ------------------

    let query = new URLSearchParams(useLocation().search)
    const pross = async (name:any,ep:number) => {  
        setiframe('./pic/loading.gif')
        const f = await check({variables:{term:name,ep:ep}})

        if(!f.data['Sugg']) return "You have entered the wrong Episode !!"
        const rez = await get_episode({variables:{AnimeName:name}})
        const ep_url = rez.data['find_anime'][0]['AnimeEpisodeHref'][0]
        if(!ep_url.includes('http')) return setiframe(ep_url.replace(ep_url.split('//')[0],''))
        return setiframe(ep_url.replace(ep_url.split('http')[0],''))
    }
    const episode:any = query.get('ep')
    const x:number = parseInt(episode)
 
   
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
                    <form onSubmit={async (e)=>{
                        e.preventDefault()
                            if(!int) return alert('Entere An Episode Number in the Episodes Box !!')
                            await pross(query.get('name'),parseInt(ep_n))
                            }
                        }>
                        <input type="text" id={ep} placeholder="Episode"  onChange={(e)=>{
                            if(e.currentTarget.value === '') return setep('ep'), setint(false)
                            if(!parseInt(e.currentTarget.value) || parseInt(e.currentTarget.value) == 0 || parseInt(e.currentTarget.value) >x ) return setep('ep_r'), setint(false)
                            setint(true)
                            return setep('ep')
                        }} value={ep_n} onInput={(e)=>setep_n(e.currentTarget.value)} /> <span>/{query.get('ep')}</span>
                    </form>
                </div>
               <div className="screen">
                   <iframe title="anime" style={{width:"40rem",height:"25rem"}} src={iframe} />
                    <h3 className="AnimeTitle">{`${query.get('name')} Episode ${int?ep_n:NaN}`}</h3>
               </div>
            </div>
        </div>
    )
}
export default Anime
