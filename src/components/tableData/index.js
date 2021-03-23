import React, { Component } from "react";

import { Table } from 'antd';

class TableComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        const { columns,datalist ,rowSelection} = this.props;
        return <Table
                rowSelection={rowSelection}
                style={{marginTop:'20px'}}
                rowKey="id"
                columns={columns}
                dataSource={datalist}
                pagination={ false }
                bordered
               ></Table>
    }
}

export default TableComponent;
