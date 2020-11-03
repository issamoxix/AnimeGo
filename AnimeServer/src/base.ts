import superagent from 'superagent'
import beautifuldom from 'beautiful-dom';
import { Dictionary } from "lodash";

export class base {
    site:any;
    search_url:any;
    term:string;
    constructor(site:any){
        this.site = site
        this.term = "naruto"
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
        var sugg:Dictionary<any> = {}
        for(var i =0;i<=a_s.length-1;i++){
            if(a_s[i].outerHTML.includes(this.term)){
                    if(a_s[i].innerText){
                    sugg[a_s[i].innerText] = a_s[i].getAttribute('href')
                    
                }
            }
        }
        console.log(sugg)
    }   
}
const site = new base("https://animetak.net/")
site.get_search_bar()
