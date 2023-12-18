import { useState, useEffect  } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Home from "./Component/Home/Home";


function App() {

  
  return (
    <div className="container">
    <Router>
     <Switch>
        <Route exact path="/">
          <Home />
        </Route>
     </Switch>
     </Router>
    </div>
  )
}

export default App