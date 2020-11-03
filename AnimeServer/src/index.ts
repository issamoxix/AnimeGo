import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express"
import {ApolloServer} from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {AnimeResolver} from "./AnimeResolver"


(async ()=>{
    const app = express();
    app.get('/',(_req,res)=>{
        res.send('Hello')
    })

    await createConnection();

    const apolloServer = new ApolloServer({
        schema:await buildSchema({
            resolvers:[AnimeResolver]})
    });

    
    apolloServer.applyMiddleware({app})
    app.listen(4000,()=>{
        console.log('the server started')
    })
})()
// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new EgyAnime();
//     user.AnimeName = "Timber";
//     user.AnimeHref = "Saw";
//     user.AnimeEpisodeHref = ['fsdfds','sfsdf'];
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.AnimeName);
//     console.log();
    
//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(EgyAnime);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
