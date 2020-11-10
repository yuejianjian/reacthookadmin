import React from 'react';
import { Switch } from 'react-router-dom'
//组件
import User from '../../view/user/index'
import UserAdd from '../../view/user/add'

//私有组件

import PrivateRouter from '../privateRouter/index'
class ContainerMain extends React.Component{
  constructor(props){
    super(props)
    this.state={
      msg:'内容怒放'
    }
  }
  
  render(){
    return(
      <Switch>
          <PrivateRouter exact path="/index/user/list" component ={User} />
          <PrivateRouter exact path="/index/user/add" component ={UserAdd} />
      </Switch>
    )
  }
}


export default ContainerMain;