// 部门 
const defaultState ={
    inputValue:'',
    list:[],
    dolist:[],
}
const todolistReducer =function(state=defaultState,action){
    
    if (action.type === 'input_change'){
        let newState = JSON.parse(JSON.stringify(state));
        console.log(newState);
        newState.inputValue = action.value;
        return newState;
    }
    if (action.type === 'add_item'){
        let newState = JSON.parse(JSON.stringify(state));
        console.log(newState);
        var obj={
            name:newState.inputValue
        }
        console.log(obj);
        newState.list.push(obj);
        newState.inputValue = '';
        console.log(newState);
        return newState;
    }
    if (action.type === 'delete_item'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1)
        return newState;
    }
    if (action.type === 'finish_item'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1)
        newState.dolist.push(action.arr);
        return newState;
    }
    if (action.type === 'finishdelete_item'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.dolist.splice(action.index, 1)
        return newState;
    }
    return state;
  
  }


  export default todolistReducer;