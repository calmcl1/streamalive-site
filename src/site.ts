import cors from 'cors';
import express from "express";
import path from 'path';
// import { Server } from 'http';
import indexRouter from './routes/routes';
import body_parser from 'body-parser'

const app = express();

console.debug("Using cors")
app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', 'public')))

app.set('views', './public/html')
app.set('view engine', 'pug')

app.use('/', indexRouter)

const port = process.env.PORT || 3000
const svr = app.listen(port)
svr.on('listening', () => {
    console.log(`Listening on ${port}`)
})