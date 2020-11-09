//Page That Display the Anime Episodes
import React, { useEffect, useState } from 'react'
import '../Show.css'
import EpisodeBox from '../EpisodeBox'
import { Link, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import Gql from '../Gql'
const Show:React.FC = ()=>{

    const [iframe,setiframe] = useState('')
    const [curr, setcurr] = useState(1)
        // Mutations 
        const [check] = useMutation(Gql.get_sugg)
        const [get_episode] = useMutation(Gql.find_anime)
        // ------------------
    let query = new URLSearchParams(useLocation().search)
    const pross = async (name:any,ep:number) => {  
        setiframe('./pic/loading.gif')
        setcurr(ep)
        const f = await check({variables:{term:name,ep:ep}})

        if(!f.data['Sugg']) return "You have entered the wrong Episode !!"
        const rez = await get_episode({variables:{AnimeName:name}})
        const ep_url = rez.data['find_anime'][0]['AnimeEpisodeHref'][0]
        if(!ep_url.includes('http')) return setiframe(ep_url.replace(ep_url.split('//')[0],''))
        
        
        return setiframe(ep_url.replace(ep_url.split('http')[0],''))
    }
    
    const episode:any = query.get('ep')
    const src:string | any = query.get('src')
    const name:string | any = query.get('name')
    const x:number = parseInt(episode)
    let arr = []
    for(var i=1;i<x+1;i++){
       arr.push(<EpisodeBox n={i} img={src} name={name} pross={pross} />)
    }
    useEffect(()=>{
        if(curr === 1){
            pross(name,1)
        }   
    },[])
    return (
        <div className="main-container">
            <Link to="/" >
                <img src="./pic/dojo.png" alt="Home" className="Back" />
                </Link>
            <div className="Show-container">
                <div className="Screen-container">
                    <iframe src={iframe} title="Show" className="Screen" />
                    <div className="under-screen">
                        <h4>{query.get('name')} Episode {curr}</h4>
                        {/* <h4 className="Next" onClick={()=>pross('Naruto Shippuden',1)} >Next episode </h4> */}
                        <button className="Next" onClick={()=>{
                            if(curr ===x) return alert('There is no more Episodes !!!')
                                pross(name,curr+1)
                            }
                        } >Next Episode</button>
                    </div>
                </div>
                <div className="Episode-container">
                    {
                        arr.map((d)=>{
                            return d
                        })
                    }
             
                </div>
            </div>
        </div>
    )
}
export default Show