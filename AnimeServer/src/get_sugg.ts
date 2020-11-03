import superagent from 'superagent';
import beautifuldom from 'beautiful-dom'
import { Dictionary } from "lodash";



export class link_sugg {
    
    term:string;
    ep:number;
    max_ep:number;
    constructor(term:string,ep:number){
        this.term = term;
        this.ep = ep-1
    }
    async get_sugg(){
        const response = await superagent.get(`https://www.egyanime.com/a.php?term=${this.term}`)
        const dom = new beautifuldom(response.text);
        var data:Dictionary<any> = {}
        const a_s = dom.getElementsByTagName('a')
        
        for(var  i=0;i<=a_s.length-1;i++ ){
            const url = await superagent.get(`https://www.egyanime.com/${a_s[i].getAttribute('href')}`)
            const doc = new beautifuldom(url.text)
            const eps = []
            const ep = doc.getElementsByClassName('tag is-dark is-medium m-5')
            const issam:string | null | undefined = a_s[i].getAttribute('href')
    
            if(a_s[i].getAttribute('href') != null && issam!.split("?")[0] == "movie") return data 
            // number of episodes for ill keep it 3
            for(var r=this.ep;r<= this.ep;r++){
                this.max_ep = ep.length
                console.log(this.max_ep)
                const urly = await superagent.get(`https://www.egyanime.com/${ep[this.ep].getAttribute('href')}`)
                const doc = new beautifuldom(urly.text)

                const get_iframe = `${this.ep}${doc.getElementsByClassName('server-watch')[0].getElementsByTagName('a')[0].getAttribute('data-link')}`
                 
                
                eps.push(get_iframe)

            }


            data[`sugg ${i}`] = {"name":a_s[i].innerText,"href":a_s[i].getAttribute('href'),"EpisodeIf":eps}
    
        }
        return data

    }
    async get_eps(href:string){
        const url = await superagent.get(`https://www.egyanime.com/${href}`)
        const doc = new beautifuldom(url.text)
        const eps = []
        const ep = doc.getElementsByClassName('tag is-dark is-medium m-5')
        for(var i=this.ep;i<= this.ep;i++){
            const urly = await superagent.get(`https://www.egyanime.com/${ep[i].getAttribute('href')}`)
            const doc = new beautifuldom(urly.text)
            const get_iframe = doc.getElementsByClassName('server-watch')[0].getElementsByTagName('a')[0].getAttribute('data-link')

            eps.push(get_iframe)
        }
        return eps
    }
    async get_watch(urlx:string){
        const url = await superagent.get(`https://www.egyanime.com/${urlx}`)
        const doc = new beautifuldom(url.text)
        const get_iframe = doc.getElementsByClassName('server-watch')[0].getElementsByTagName('a')[0].getAttribute('data-link')
        return get_iframe
    }

}