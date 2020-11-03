import superagent from 'superagent';
import beautifuldom from 'beautiful-dom'

export class test {
    
    name:string;
    m:string[]
    constructor(name:string){
        this.name = name;
        
    }
    async giveback(){
        const res = await superagent.get(`https://www.egyanime.com/a.php?term=${this.name}`)
        const dom = new beautifuldom(res.text)
        const aa = await dom.getElementsByTagName('a')
        
        const responde:any[] = []
        for(var i =0;i<=aa.length-1;i++){
            responde.push(aa[i].innerText)
        }
        
        return responde
    }
}