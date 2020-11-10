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
      msg:'乐坚坚'
    }
  }
  
  render(){
    return(
      <Layout className="layout-wrap">
        <Header className="layout-header">
          <LayoutHeader />
        </Header>
        <Layout>
          <Sider width="200px">
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
