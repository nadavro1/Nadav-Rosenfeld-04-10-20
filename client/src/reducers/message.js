import {GET_SENT_MESSAGES, GET_RECEIVED_MESSAGES,SEND_MESSAGE,DELETE_MESSAGE,MESSAGE_ERROR, SENT_MESSAGE_CLEAR, RECEIVED_MESSAGE_CLEAR} from '../actions/types';

const initialState= {
    sentMessages:[],
    receivedMessages:[],
    loading:true,
    isSent:false,
    error:{}
}

export default function(state = initialState,action){
    const {type,payload}=action;
    switch (type) {
        case GET_SENT_MESSAGES:
            return {
                ...state,
                sentMessages:payload,
                isSent:false,
                loading:false
            }
        case GET_RECEIVED_MESSAGES:
            return {
                ...state,
                receivedMessages:payload,
                isSent:false,
                loading:false
            }
        case SEND_MESSAGE:
            return{
                ...state,
                loading:false,
                isSent:true,
                sentMessages:[payload,...state.sentMessages]
            }
        case DELETE_MESSAGE:
            return{
                ...state,
                loading:false,
                receivedMessages: state.receivedMessages.filter(message => (
                    message._id !== payload.id 
                ))
            }
        case MESSAGE_ERROR:
            return{
                ...state,
                error:payload,
                isSent:false,
                loading:false
            }
        case SENT_MESSAGE_CLEAR:
            return{
                ...state,
                sentMessages:[],
                isSent:false,
                loading:false
            }
        case RECEIVED_MESSAGE_CLEAR:
            return{
                ...state,
                receivedMessages:[],
                isSent:false,
                loading:false
            }
        default:
            return state;
    }
}