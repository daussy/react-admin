import React from 'react';
import logo from './logo.svg';
import {Link,HashRouter,Switch,Route} from 'react-router-dom'
import './App.css';

//引入组件
import Login from './views/login/index'

 class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };

  }

  render(){
    return (
      <HashRouter>
        <Switch>
          <Route exact  component = {Login} path = '/'/>
        </Switch>

      </HashRouter>

    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
