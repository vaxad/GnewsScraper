const express = require ('express')
const cors = require ('cors')
const app = express()
app.use(cors())
const http = require('http')
const server = http.createServer(app)

app.get('/',(req,res)=>{
    res.send('server live')
})

app.use('/gnews',require('./routes/gnews'))

server.listen(4000,()=>{
    console.log('workin')
})