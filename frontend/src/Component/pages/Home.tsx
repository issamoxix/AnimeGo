import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Gql from '../Gql'
const Home: React.FC = ()=> {
    const [val, setValue] = useState('')
    
    const [search] = useMutation(Gql.find_anime)
    const [sugg] = useMutation(Gql.get_sugg)
    const [mutex] = useMutation(Gql.mute)
    const [check_an] = useMutation(Gql.check_mute)
    // const res = await sugg({variables:{term:"naruto"}})
    const show_data = (x:string, y:string)=>{
        let rms= ""
        if(x.includes('htt')){
            rms = "htt"
        }else {
            rms = "//"
        }
        const url = x.replace(x.split(rms)[0],'')
        let episode_watching:any |number = 1;
        if(x.split(rms)[0])  episode_watching = parseInt(x.split(rms)[0])+1
        setIfname('Anime')
        setValue(url)
        
        setTitle(`${y} Episode ${episode_watching}`)
    }
    const [test,setTest] = useState('')
    const [gif, setGif] = useState('./searching.gif')
    const [ifname, setIfname] = useState('')
    const [inpt,setInpt] = useState("1")
    const [gl,setgl] = useState([])
    
    // h2 title 
    const [title, setTitle] = useState('Search For An Anime or choose from our list !')

    const get_sugg_res = async (ter_m:string,e_p:any)=>{
        if(!parseInt(inpt)) return alert('Choose A number For the Episode !!') 
        const check = await check_an({variables:{Name:ter_m}})
        
        if(check.data['check']){
        const fa = await search({variables:{AnimeName:ter_m}})
        console.log(fa.data['find_anime'][0]['AnimeEpisodeHref'][0])
        let rms ;
        if(fa.data['find_anime'][0]['AnimeEpisodeHref'][0].includes('htt')){
            rms = "htt"
        }else {
            rms = "//"
        }
        
        const ep = fa.data['find_anime'][0]['AnimeEpisodeHref'][0].split(rms)[0]+1

        if(check.data['check'] && parseInt(ep)===parseInt(e_p)) return await (await search({ variables: { AnimeName: ter_m } })).data
    }
        // if(check.data['check']) return await (await search({ variables: { AnimeName: ter_m } })).data
        setGif('./loading.gif')
        //get anime from egyAnime with episode entered
        const res = await sugg({variables:{term:ter_m,ep:parseInt(e_p)}})
        
        if(await res){
            const rez = await search({variables:{AnimeName:test}})
            let data:string = rez.data['find_anime'][0]
            if(data !== undefined){
                
                console.log(rez.data['find_anime'][0]["AnimeEpisodeHref"][0])
                return rez.data
                }
            }
        }
    console.log(useParams())
    return(
        <>
        <div>
        <div>
            <img width="360px" alt="Cool" height="176px" src={gif} />
        </div>
        <form >
        Anime <input type="text" name="anime" placeholder="Search For Anime" value={test} onChange={e=>{setTest(e.currentTarget.value)}} onInput={async e => {
            if(e.currentTarget.value.length >= 4){

                const chk = await check_an({variables:{Name:e.currentTarget.value}})

                if(!chk.data['check']) return false
                const tit = await mutex({variables:{name:test}})
                setgl(tit.data['test'])
         
            }
            }} />
            <ul className={test?"Sugg":"hide"}>
                    {gl.map((d)=>{
                        
                        return <li onClick={e=>{
                            get_sugg_res(e.currentTarget.innerText,inpt)
                            setTest('')
                        }}>{d}</li>
                    })}
                </ul>
            
            Episode <input type="text" placeholder="Episode" onChange={e=>{
                setInpt(e.currentTarget.value)
            }} value={inpt} /> {"(Default Ep=> 1)"}
            <br></br>
            <button onClick={async e=>{
                e.preventDefault()
                
                if(!parseInt(inpt)) return alert('Choose A number For the Episode !!') 
                setGif('./loading.gif')
                
                // const res = await sugg({variables:{term:test,ep:parseInt(inpt)}})
                const res = await get_sugg_res(test,inpt)
                if(!res) return alert('There is No anime with that name !!')
                show_data(res['find_anime'][0]["AnimeEpisodeHref"][0], res['find_anime'][0]['AnimeName'])
                console.log(res['find_anime'][0]["AnimeEpisodeHref"][0])
                setGif('./searching.gif')
                setTest('')
              

                
            }}>Search/Watch</button>
            </form>
            <div>
                <h2>{title}</h2>
                <iframe title="DisplayAnime" src={val?val:undefined} data-name={ifname?ifname:null}  ></ iframe>
            </div>
            </div>
        </>
    )
}

export default Home