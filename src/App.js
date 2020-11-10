import React from 'react';
import {HashRouter ,Switch , Route} from 'react-router-dom'
import './style/home.scss'
import Login from './view/Login/login'
import index from './view/index/Index'
//私有化组件
import PrivateRouter from './components/privateRouter/index'
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      msg:'乐坚坚'
    }
  }
  
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route exact render={() =><Login/>} path="/" />
          <PrivateRouter component={index} path="/index" />
        </Switch>
      </HashRouter>  
      // <div id="app">
      //   <Button type="primary">Primary Button</Button>
      //   <p>{this.state.msg}</p>
       
      // </div>
    )
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
