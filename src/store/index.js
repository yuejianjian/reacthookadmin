import { createStore,applyMiddleware ,compose,combineReducers} from 'redux';
// import thunk from 'redux-thunk';
// import reducer from './reducer';

// const composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
// const enhancer = composeEnhancers(
//   applyMiddleware(thunk)
// );

//const store = createStore(reducer, enhancer);





//全局配置
import departmentReducer from './reducer/department'
import JobReducer from './reducer/job'
import configReducer from './reducer/config'

//创建reducer对象
const allReducer ={
  department:departmentReducer,
  job:JobReducer,
  config:configReducer
}
const rootReducer = combineReducers(allReducer)
const store = createStore(rootReducer);
export default store;