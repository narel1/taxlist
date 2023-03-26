const express=require('express')
const router=express.Router()

//Item Model
const Task=require('../../models/Task');

router.get('/',(req,res)=>{
    console.log("Dd")
    Task.find()
    .sort({id:1})
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/post',(req,res)=>{
    const newTask=new Task({
        id:req.body.id,
        name:req.body.name,
        description:req.body.description,
        periodtype:req.body.periodtype,
        period:req.body.period
    });
    console.log(newTask)
    newTask.save()
    .then(result=>{
        res.json(result)
        console.log('posted')
    })
    .catch(err=>console.log(err))
})

router.get('/:query',(req,res)=>{
    const query=req.params.query;
    console.log(query)
    Task.find({$or:[{name:{$regex:`${query}`}},{description:{$regex:`${query}`}}]})
    .then(result=>{
            res.json(result)
            console.log('searched')
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).json({success:false})
    }
    )
})
module.exports=router