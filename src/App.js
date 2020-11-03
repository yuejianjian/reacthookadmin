import React from 'react';
import './style/home.scss'
import { Button } from 'antd';
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      msg:'乐坚坚'
    }
  }
  
  render(){
    return(
      <div id="app">
        <Button type="primary">Primary Button</Button>
        <p>{this.state.msg}</p>
       
      </div>
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
