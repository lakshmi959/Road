const mongoose = require('mongoose');

const notificationSchema=new mongoose.Schema({
    //Receiver
    receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
    },
    receiverType:{
        type:String,
        enum:['user', 'provider','admin'],
        required:true
    },

    //Notification Info
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:[
            'request_created',
            'request_accepted', 
            'request_ongoing',
            'request_completed',
            'request_cancelled',
            'payment_received',
            'review_received',
            'account_verified',
            'general'
        ],
        default:'general'
    },

    //Reference
    referenceId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },
    referenceType:{
        type:String,
        enum:['ServiceRequest', 'Payment','Review', null],
        default:null
    },

    
    //Status
    isRead:{type:Boolean, default:false},
    readAt:{type:Date, default:null}

}, {timestamp:true});
module.exports=mongoose.model('Notification',notificationSchema);