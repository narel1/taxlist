const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const TaskSchema=new Schema({
    id:{
        type:Number,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    period:{
        type:String,
        required:true
    },
    periodtype:{
        type:String,
        required:true
    }
});
module.exports=Task=mongoose.model('task',TaskSchema)
