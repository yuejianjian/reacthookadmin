import React from 'react';


class User extends React.Component{
  constructor(props){
    super(props)
    this.state={
      msg:'内容怒放'
    }
  }
  
  render(){
    return(
      <div >
       <h1>用户列表</h1>
       
      </div>
    )
  }
}


export default User;