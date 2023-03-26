const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const routes=require('./routes/api/items.js')
const app=express()
const cors=require('cors')
app.use(cors({
    origin:'*'
}))
app.use(bodyParser.json())

const db=require('./config/keys').mongoURI;
console.log(db)
//Connect to MonoDB
mongoose.set('strictQuery',false)
mongoose.connect(db,{useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(()=>console.log('MongoDB Connected..'))
    .catch((err)=>console.log(err))

app.use(routes)
const port=process.env.PORT||3300
app.listen(port,()=>{
        console.log(`Server started on port ${port}`)
})
