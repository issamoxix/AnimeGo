import { Arg, Mutation, Query, Resolver} from 'type-graphql';
import { Like } from 'typeorm';
import {EgyAnime} from './entity/EgyAnime'
import {link_sugg} from "./get_sugg"
import {test} from './test'
import {get_img} from './get_img'
import { base } from './base';
@Resolver()
export class AnimeResolver{
    @Query(()=> String)
    hello(){
        return 'hi';
    }
    @Query(()=> [EgyAnime])
    Anime(){
        return EgyAnime.find();
    }
    @Mutation(()=> [String])
    async get_img(
        @Arg('anime') anime:string,
        @Arg('lang') lang:string
    ){
        if(lang==="arb") {
        const ani = new get_img(anime)
        return await ani.get_src()
        }else {
            const site = new  base("https://gogoanime.so/",anime)
            return await site.main()

        }
        

    }
    @Mutation(()=> Boolean)
    async check(
        @Arg('Name') Name:string,
    ){
        const check_f =  await EgyAnime.count({AnimeName:Name.toLowerCase()})
        if(check_f == 0) return false
        return true
    }
    @Mutation(()=> [EgyAnime] || String || Boolean)
    async find_anime(
        @Arg('AnimeName') AnimeName:string,
    ){
        console.log(`You Searched ${AnimeName}`)
        const check_f = await EgyAnime.findOne({AnimeName:AnimeName.toLowerCase()})

        if(check_f) return EgyAnime.find({AnimeName:AnimeName.toLowerCase()})

        const check_s = await EgyAnime.findOne({AnimeName:Like(`%${AnimeName.toLowerCase()}%`)})
        console.log(check_s)
        if(!check_s || check_s === undefined) return false
        console.log("dd")
        return EgyAnime.find({AnimeName:Like(`%${AnimeName.toLowerCase()}%`)})
    }
    @Mutation(()=> [String])
    async test(
        @Arg('name') name:string,
    ){
        const x =  new test(name)
        return await x.giveback()
    }
    @Mutation(()=> Boolean)
    async Sugg(
        @Arg('term') term:string,
        @Arg('ep') ep:number ,
    ){
        //check if the in the dbs if not continue the code
        console.log(`You have sended ${term} ep ${ep}`)
        const check = await EgyAnime.findOne({AnimeName:term.toLowerCase()})
        
        
        
        const ep_saved:number | any  = check?.AnimeEpisodeHref[0].split('htt')[0]
        if(parseInt(ep_saved) == ep){
            return true
        }else if(!check) {
            console.log('Enter new Data ...')
        }else if (parseInt(ep_saved) !== ep){
            const anime = new link_sugg(term,ep)
            const sugg = await anime.get_sugg()
            for(var i in sugg){
                
                if(term.toLowerCase() == sugg[`${i}`]['name'].toLowerCase() ||sugg[`${i}`]['name'].toLowerCase().includes(term.toLowerCase()) ){
                    console.log(sugg[`${i}`]['name'].toLowerCase())
                    EgyAnime.update({AnimeName:term.toLowerCase()},{AnimeEpisodeHref:sugg[`${i}`]['EpisodeIf']})
                    
                    break
                }
            }
            
            return true
        }
        

        //if the data not in the dbs
       
        const anime = new link_sugg(term,ep)
        const sugg = await anime.get_sugg()
        const newAnime = new EgyAnime()
        let found = false
        
        for(var i in sugg){
            console.log(sugg[`${i}`]['name'].toLowerCase())
            if(term.toLowerCase() == sugg[`${i}`]['name'].toLowerCase() ||sugg[`${i}`]['name'].toLowerCase().includes(term.toLowerCase()) ){
                newAnime.AnimeName = sugg[`${i}`]["name"].toLowerCase();
                newAnime.AnimeHref = sugg[`${i}`]["href"]
                newAnime.AnimeEpisodeHref = sugg[`${i}`]['EpisodeIf']
                found = true
                
                break
            }
        }
        
        if(!found) return false
        
        const save = await EgyAnime.save(newAnime)
        
        if(save) return true
        return false
    }
}