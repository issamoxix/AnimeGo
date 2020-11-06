import React  from 'react';
import Home from './Component/pages/Home'
import Work from './Component/pages/Work'
import Anime from './Component/pages/Anime'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './index.css'
const App: React.FC = ()=> {
    // const {data} = useQuery(gql`
    //     {
    //       Anime {
    //           AnimeName
    //           AnimeEpisodeHref
    //       }
    //     }
    // `)

  

    return (<>
        <Router>
            <Switch>
                {/* <Route path='/' exact component={Home} /> */}
                <Route path='/' exact component={Work} />
                <Route path='/Anime' exact component={Anime} />
           </Switch>
        </Router>
      </>)
}
export default App;