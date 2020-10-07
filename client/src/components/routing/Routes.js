import React from 'react'
import {Route,Switch} from 'react-router-dom';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import PrivateRouting from '../routing/PrivateRouting';
import ComposeMessage from '../dashboard/ComposeMessage';

const Routes = props => {
    return (
        <section className='container'>
        <Alert/>
          <Switch>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRouting exact  path='/dashboard' component={Dashboard}/>
            <PrivateRouting exact  path='/compose-mail' component={ComposeMessage}/>
          </Switch>
        </section>

    )
}

export default Routes
