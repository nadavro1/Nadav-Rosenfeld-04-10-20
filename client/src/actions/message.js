import {GET_SENT_MESSAGES, GET_RECEIVED_MESSAGES,SEND_MESSAGE,DELETE_MESSAGE,SENT_MESSAGE_CLEAR,RECEIVED_MESSAGE_CLEAR} from './types'
import {setAlert} from './alert'
import axios from 'axios'

//get sent emails
export const getSentMsg= ()=>async (dispatch)=>{
    try {
      const res = await axios.get('/api/messages/sent');
      dispatch({
          type:GET_SENT_MESSAGES,
          payload:res.data
      })
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
        dispatch({
            type:SENT_MESSAGE_CLEAR,
        })
    }

}

//get received emails
export const getReceivedMsg= ()=>async (dispatch)=>{
    try {
      const res = await axios.get('/api/messages/received');
      
      dispatch({
          type:GET_RECEIVED_MESSAGES,
          payload:res.data
      })
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
        dispatch({
            type:RECEIVED_MESSAGE_CLEAR,
        })
    }

}

//delete email
export const deleteMsg= (id)=>async (dispatch)=>{
    try {
      await axios.delete(`/api/messages/${id}`);
      
      dispatch({
          type:DELETE_MESSAGE,
          payload: id
      })
      dispatch(getReceivedMsg());
      dispatch(setAlert('this email has been deleted', 'success'));
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
    }

}

//send email
export const sendMsg= (formData)=>async (dispatch)=>{
    try {
        const config={
            header:{
                'Content-Type':'application/json'
            }
        }
     
      const res= await axios.post(`/api/messages/`,formData,config);

      dispatch({
          type:SEND_MESSAGE,
          payload: res.data
      })
      dispatch(getSentMsg());
      dispatch(setAlert('Your email has been sent', 'success'));
    } catch (error) {
        const errors= error.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',6000)));
        }
    }

}