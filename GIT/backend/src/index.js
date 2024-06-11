const express = require('express')
const cors = require('cors')
const { connectDb } = require('./connectDb/connectDb')
const Userrouter = require('./route/auth')
const Reciperouter = require('./route/recipe')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/auth', Userrouter)
app.use('/recipe',  Reciperouter)

connectDb().then(()=>{
    try{
        app.listen(4000, ()=>{
            console.log("Server connected successfully")
        })
    } catch(err){
        console.log("Server connection error", err)
    }
})