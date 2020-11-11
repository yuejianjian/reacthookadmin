import React from 'react';

import LayoutAside from './components/Aside'
import LayoutHeader from './components/Header'
import ContainerMain from '../../components/containerMain/index'
import { Layout } from 'antd';

import "./index.scss"
const { Header, Sider, Content } = Layout;
class Index extends React.Component{
  constructor(props){
    super(props)
    this.state={
      collapsed:false
    }
  }
  componentDidMount(){
    const getsessionStoragecollapsed =JSON.parse(sessionStorage.getItem("collapsed"));
    this.setState({
      collapsed:getsessionStoragecollapsed
    })
  }
  toggleCollapsed =()=>{
    const collapsed =!this.state.collapsed;
    this.setState({
      collapsed:collapsed
    })
    sessionStorage.setItem("collapsed", collapsed)

  }
  
  render(){
    return(
      <Layout className="layout-wrap">
        <Header className="layout-header" >
          <LayoutHeader toggle={this.toggleCollapsed}  collapsed={this.state.collapsed} />
        </Header>
        <Layout>
          <Sider width="200px" collapsed={this.state.collapsed}>
            <LayoutAside />
          </Sider>
          <Content className="layout-main">
            <ContainerMain />
          </Content>
        </Layout>
      </Layout>
    )
  }
}


export default Index;
