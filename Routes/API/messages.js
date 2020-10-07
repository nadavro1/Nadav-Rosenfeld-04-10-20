const express= require('express');
const route = express.Router();
const {check, validationResult}=require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Message = require('../../models/Message');

// send email message
//first validation of the form + check token
route.post('/', [auth,[
    check('text','Please add text').not().isEmpty(),
    check('subject','Please add subject').not().isEmpty(),
    check('to','Please add To email').not().isEmpty() 
    ]] ,async (req,res)=>{
        try {
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
            const {to}=req.body;
            let receiver= await User.findOne({email: { $regex : new RegExp(to, "i") }});//find the email with case insensitive
            if (!receiver) {
                return res.status(400).json({errors: [{msg: "Email receiver doesnt exist"}]})
            }
            const user = await User.findById(req.user.id).select('-password');//for getting the user details
            const newMessage = new Message({
                subject:req.body.subject,
                text:req.body.text,
                name:user.name,
                receiver:receiver.id,
                sender: req.user.id
            });
            const message = await newMessage.save();//saving the message on DB
            res.send(message);
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server error');
        }
    })

    //get all received messages

    route.get('/received',auth,async (req,res)=>{
        try {
            const messages = await Message.find({receiver:req.user.id}).populate('sender',['name']).sort({date:-1});//finding all the emails that the user received, -1 for descending order
            if(messages=== undefined || messages.length == 0){
                return res.status(404).json({msg:'Messages are not found'})
            }
            res.json(messages); 
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
        
    })

   //get all sent messages

   route.get('/sent',auth,async (req,res)=>{
    try {
        const messages = await Message.find({sender:req.user.id}).populate('receiver',['name']).sort({date:-1});//finding all the emails that the user received, -1 for descending order
        if(messages=== undefined || messages.length == 0){
            return res.status(404).json({msg:'Messages are not found'})
        }
        res.json(messages); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
    
    })

    // delete email
    route.delete('/:id',auth,async (req,res)=>{
        try {
            const message = await Message.findById(req.params.id);//find the message
            if(!message){
                return res.status(404).json({msg:'Message not found'})
            }
            await message.remove();
            res.send("Deleted message: "+ message);
        } catch (error) {
            console.log(error);
            if(error.name == "CastError"){
                return res.status(400).json({msg:"message not found"});
            }
            res.status(500).send('Server error');
        }
        
    })
    module.exports = route;