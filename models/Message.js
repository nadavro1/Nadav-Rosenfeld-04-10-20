const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    
    subject:{
        type:String,
        required:true
    },
    text: {
      type: String,
      required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  
  
  module.exports = Message = mongoose.model('Message', MessageSchema);