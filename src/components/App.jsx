import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from "./header";
import Schedule from "./schedule/schedule"
import Todo from "./toDoist/todo"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Schedule} />
          <Route path="/todo" component={Todo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
 