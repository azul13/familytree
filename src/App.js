import React, { useState } from 'react';
import Header from './container/Header.js';
import HomePage from './container/HomePage.js';
import EditPage from './container/EditPage.js';
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";
import './App.css';
import { AppContext } from "./libs/contextLib";


function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  
  // componentDidMount(){
  //   axios.get('http://localhost:8080/helloworld').then((Response) => {
  //     console.log(Response);
  //     this.setState({helloWorld: Response.data})
  //   }); 
  // }

    return (
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Router>
        <div>
        <Header/>
            <Switch>
              <Route path="/homePage">
                <HomePage />
              </Route>
              <Route path="/editPage">
                <EditPage />
              </Route>
            </Switch>
        </div>
        </Router>
      </AppContext.Provider>
    );
  }

export default App;
