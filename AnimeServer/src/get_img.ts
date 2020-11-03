import superagent from 'superagent'
import beautifuldom from 'beautiful-dom';


export class get_img{
    term:string;
    constructor(term:string)
    {
        this.term = term;
       
    }
    //from egyAnime
    async get_src()
    {
        const req = await superagent.get(`https://www.egyanime.com/a.php?term=${this.term}`)
        const doc = new beautifuldom(req.text)
        const a_s = doc.getElementsByTagName('a')
        const arr  = []
        
        for(let i in a_s){
            
            const reqq = await superagent.get(`https://www.egyanime.com/${a_s[i].getAttribute('href')}`)
            const dom = new beautifuldom(reqq.text)
            const src = dom.getElementsByTagName('img')[0].getAttribute('src')
            const ep = dom.getElementsByClassName('tag is-dark is-medium m-5')
            const url = `${a_s[i].innerText}https://www.egyanime.com/${src}EPISODES${ep.length}`
            
            arr.push(url)
        }       
        
        return arr
    }


}
