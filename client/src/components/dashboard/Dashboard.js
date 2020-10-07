import React,{useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner.js'
import { deleteMsg, getReceivedMsg, getSentMsg } from '../../actions/message.js'
import ReceivedMsg from './ReceivedMsg.js'
import SentMsg from './SentMsg.js'
const Dashboard= ({getSentMsg,getReceivedMsg,auth:{user},message:{sentMessages,receivedMessages,loading}})=> {
    useEffect(() => {
        getSentMsg()
    }, [getSentMsg])
    useEffect(() => {
        getReceivedMsg()
    }, [getReceivedMsg])
    return loading ? <Spinner/>:<Fragment>
        <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      { receivedMessages.length!==0 && receivedMessages!==null?
      (<ReceivedMsg messages={receivedMessages}/>)
        :<div>No messages received</div>
      }
      { sentMessages.length!==0 && sentMessages!==null?
      (<SentMsg messages={sentMessages}/>)
        :<div>No messages sent</div>
      }
    </Fragment>
   
}


const mapStateToProps=state=>({
    auth: state.auth,
    message: state.message
    
})
export default connect(mapStateToProps,{getSentMsg,getReceivedMsg,deleteMsg})(Dashboard)
