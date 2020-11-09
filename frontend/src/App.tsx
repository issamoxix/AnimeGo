import React  from 'react';
import Work from './Component/pages/Work'

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './index.css'
import Show from './Component/pages/Show';
import Landing from './Component/pages/Landing';
import Page404 from './Component/pages/404';


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
                <Route path="/" exact component={Landing} />
                
                <Route path='/search' exact component={Work} />
                <Route path='/Anime' exact component={Show} />
                <Route component={Page404} />
                
           </Switch>
        </Router>
      </>)
}
export default App;