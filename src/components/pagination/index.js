import React, { Component } from "react";

import { Pagination } from 'antd';

class PaginationComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    // componentDidMount(){
    //     alert(this.props.total)
    // }
    onChange=(pageNumber) => {
        console.log(pageNumber)
        this.props.onChangePage(pageNumber);
        // this.setState({
        //     pageNumber:pageNumber,
        // },()=>{
        //     this.loadData()
        // })
            
    }
    render(){
        const { columns,datalist ,rowSelection} = this.props;
        return <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                total={this.props.total}
                style={{float:'right',marginTop:'10px'}}
                onChange={this.onChange}
                >
            
        </Pagination>
    }
}

export default PaginationComponent;
