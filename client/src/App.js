import React from 'react';
import SignUp from './containers/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import Board from './components/Board/Board';
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

// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <Router>
//         <Switch>
//           <Route exact path="/" Component={SignUp} />
//           <Route path="/boards/" Component={Board} />
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;
