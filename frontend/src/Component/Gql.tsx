import {gql} from 'apollo-boost'
const  Gql = {
    find_anime:gql`
    mutation AnimeName($AnimeName:String!){
        find_anime(AnimeName:$AnimeName){
            AnimeName
            AnimeEpisodeHref
        }
    }
    
    `,
    get_sugg:gql`
    mutation ($term: String!, $ep:Float!) {
      Sugg(term: $term ep: $ep) 
    }
  `,
  mute:gql`
  mutation ($name: String!) {
    test(name: $name) 
  }
  `,
  check_mute:gql`
  mutation ($Name: String!) {
    check(Name: $Name) 
  }
  `,
  get_img:gql`
  mutation ($anime: String!) {
    get_img(anime: $anime) 
  }
  `

}
export default Gql