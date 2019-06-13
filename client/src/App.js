import React from 'react';
import SignUp from './containers/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import Board from './containers/BoardLayout/BoardLayout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div>
          <Switch>
            <Route path="/login" exact component={SignUp} />
            <Route path="/boards/userdata" component={Board} />
            <Route component={SignUp} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
