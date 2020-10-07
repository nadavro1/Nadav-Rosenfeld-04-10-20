import React,{useState} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { sendMsg } from '../../actions/message'
// sending the email with subject, to email and text
const ComposeMessage = ({sendMsg,isSent}) => {
    const [text, setText] = useState('');
    const [subject, setSubject] = useState('');
    const [to, setTo] = useState('');
    if(isSent){//if message sent we redirect to dashboard
        return <Redirect to="/dashboard"/>
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Send Email</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>{
                e.preventDefault();
                sendMsg({subject,to,text});
            }}>
                <input type="text" placeholder="Subject..." required value={subject} onChange={(e)=>{setSubject(e.target.value); }}/>
                <input type="text" placeholder="To..." required value={to} onChange={(e)=>{setTo(e.target.value); }}/>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Write text..."
                    required
                    value = {text}
                    onChange={(e)=>{
                        setText(e.target.value);
                    }}
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit"  />
            </form>
        </div>
    )
}

const mapStateToProps = state =>({ //to check if message is sent and redirect
    isSent:state.message.isSent
})


export default connect(mapStateToProps,{sendMsg})(ComposeMessage)
