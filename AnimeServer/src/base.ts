import superagent from 'superagent'
import beautifuldom from 'beautiful-dom';
// import { Dictionary } from "lodash";

export class base {
    site:any;
    search_url:any;
    term:string;
    constructor(site:any,term:string){
        this.site = site
        this.term = term
    }    
    async get_search_bar()
    {
        const res = await superagent.get(this.site)
        if(!res) return false
        const doc = new beautifuldom(res.text)
        const all_forms = doc.getElementsByTagName('form')
        const all_inputs = all_forms[0].getElementsByTagName('input')
        let name_att;
        for(var i =0;i<=all_inputs.length-1;i++){
            if(all_inputs[i].getAttribute('type')=="text"){
                name_att = all_inputs[i].getAttribute('name')
            }
        }
        
        if(!all_forms) return "We Found 0 form in this link"
        const search_url = doc.getElementsByTagName('form')[0].getAttribute('action')
        
        this.search_url = await search_url
        return await this.get_res(search_url,name_att)
    }
    async get_res(search_url:any,name:any){
        
        const responde = await superagent.get(`${search_url}?${name}=${this.term}`)
        const dom = new beautifuldom(responde.text)
        const a_s = dom.getElementsByTagName('a')
        const arr  = []
        
        for(var i =0;i<=a_s.length-1;i++){
            if(a_s[i].outerHTML.includes(this.term)){
                if(a_s[i].getAttribute('href')?.includes('page')){
                    continue
                }
                    if(a_s[i].innerText){
                    const res = await superagent.get(`${this.site}${a_s[i].getAttribute('href')}`)
                    const doc = new beautifuldom(res.text)
                    const img = doc.getElementsByTagName('img')[1].getAttribute('src')
                    const id = doc.getElementById('movie_id')?.getAttribute('value')
                    const res2 = await superagent.get(`https://ajax.gogocdn.net/ajax/load-list-episode?ep_start=1&ep_end=2000&id=${id}&default_ep=0&alias=${a_s[i].getAttribute('href')?.split('/category/')[1]}`)
                    const doc2 = new beautifuldom(res2.text)
                    const ln = doc2.getElementsByTagName('a').length
                    arr.push(`${a_s[i].innerText}${img}EPISODES${ln}`)
                }
            }
        }
        console.log(arr)
        return arr
        
    }async main(){
        
        const response = await superagent.get(`https://gogoanime.so//search.html?keyword=${this.term}`)
        const doc = new beautifuldom(response.text)
        const ul_text = doc.getElementsByClassName('items')[0]['outerHTML']
        const dom = new beautifuldom(ul_text)
        const arr = []
        const imgs = dom.getElementsByTagName('img')
        const a_s = dom.getElementsByTagName('a')
        for (var i in imgs ){
            
                // console.log(`n=${i} ${a_s[(parseInt(i))*2].getAttribute('href')} == ${imgs[i].getAttribute('alt')}`)
                
            
            arr.push(`${imgs[i].getAttribute('alt')}${imgs[i].getAttribute('src')}EPISODES${0}DATA${a_s[(parseInt(i))*2].getAttribute('href')}`)
        }
    
        return arr
    }
    async get_ep(data:string,ep:number){
        const url = `https://gogoanime.so/${data}-episode-${ep}` 
        
        const responde = await superagent.get(url)
        const dom = new beautifuldom(responde.text)
        if(dom.getElementsByClassName('entry-title')[0]) return 404
        const iframe = dom.getElementsByTagName('iframe')[0].getAttribute('src')
        
        
        return iframe
    }
}
