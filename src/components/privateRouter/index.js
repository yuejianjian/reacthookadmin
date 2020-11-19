import React from "react"
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../../utils/cookies'

const privateRouter =({component:Component, ...rest}) =>{
    return(
        <Route
            {...rest}
            render ={routePorps =>(
                getToken()?<Component {...routePorps} />:<Redirect to="./" />              
            )} 
        />
    )
}

export default privateRouter;