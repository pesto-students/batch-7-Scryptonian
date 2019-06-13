import React from 'react';
import SignUp from './containers/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import Board from '../src/containers/BoardView/BoardView';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div>
          <Route path="/" exact component={SignUp} />
          <Route path="/boards/userdata" component={Board} />
          <Route path="/login/" component={SignUp} />
        </div>
      </Router>
    </>
  );
}

export default App;
