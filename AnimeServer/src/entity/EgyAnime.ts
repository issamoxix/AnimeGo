import {Entity, PrimaryColumn, Column, BaseEntity} from "typeorm";
import { Field,  ObjectType } from "type-graphql";


@ObjectType()
@Entity('EgyAnime')
export class EgyAnime extends BaseEntity {
    
    @Field()
    @PrimaryColumn()
    AnimeName: string;

    @Field()
    @Column()
    AnimeHref: string;

    @Field(()=> [String])
    @Column("text",{array:true})
    AnimeEpisodeHref: string[];

}
