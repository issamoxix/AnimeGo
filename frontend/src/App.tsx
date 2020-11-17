import React  from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
// Pages 
import Show from './pages/Show';
import Landing from './pages/Landing';
import Page404 from './pages/404';
import Work from './pages/Work'
// Styles
import './styles/index.css'

const App: React.FC = ()=> {
     return (<>
        <Router>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path='/search' exact component={Work} />
                <Route path='/Anime' exact component={Show} />
                <Route component={Page404} />
                
           </Switch>
        </Router>
      </>)
}
export default App;