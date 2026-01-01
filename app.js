import { api } from './routes/apiRoute.js'
import express from 'express'
import 'dotenv/config'
import { createMongo } from './DB/mongoCon.js'

createMongo({
  url: process.env.mongo_URL,
  dbname: 'users'
})


const app = express()
app.use(express.json())
app.use('/api', api)


app.listen(process.env.PORT, () => {

    console.log(`server running successfully at - http://www.localhost:${process.env.PORT}`);
    
})