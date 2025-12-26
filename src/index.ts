import express, { Request, Response } from 'express'
import { pool } from './util/db'
import { PORT } from './config'

const app = express()
app.use(express.json())

app.get('/users', async (req: Request ,res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM public.lolik_info_db')
        res.json(result.rows)
    } catch(error) { 
        console.error(error);
        res.status(500).json({ error: "Error server" })
    }
})

app.post('/users', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        if( !name || !email || !password) {
            return res.status(400).json({ error: "Missing fields" })
        }

          const result = await pool.query(
			`INSERT INTO public.lolik_info_db (lolik_name, lolik_email, lolik_password)
            VALUES ($1, $2, $3) RETURNING id, lolik_name, lolik_email`,
			[name, email, password]
			)
        res.status(201).json(result.rows[0])
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Error server' })        
    }
})



app.listen(PORT, () => {
    console.log('Work')
})

//Hello