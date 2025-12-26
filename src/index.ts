import express from 'express'
import { pool } from './util/db'
import { PORT } from './tsconfig'

const app = express()



app.listen(PORT, () => {
    console.log('Work')
})