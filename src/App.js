import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import Main from "./Main/Main";
import BFS from "./Main/BFS";

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         modalShow: false
      };
   }

   render() {
      return (
         <React.Fragment>
            <BrowserRouter>
               <div className="App">
                  <Switch>
                     <Route path="/bfs" exact component={BFS} />
                     <Route path="/" component={Main} />
                     <Redirect to="/" />
                  </Switch>
               </div>
            </BrowserRouter>
         </React.Fragment>
      );
   }
}

export default App;
