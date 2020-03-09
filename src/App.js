import React from 'react';
import Header from './container/Header.js';
import HomePage from './container/HomePage.js';
import EditPage from './container/EditPage.js';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom"
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  // componentDidMount(){
  //   axios.get('http://localhost:8080/helloworld').then((Response) => {
  //     console.log(Response);
  //     this.setState({helloWorld: Response.data})
  //   }); 
  // }

  render() {
    return (
      <Router>
      <div>
        <Header />
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
    );
  }
}

export default App;
