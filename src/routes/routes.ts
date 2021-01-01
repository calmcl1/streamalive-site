import { Router } from 'express'
import axios from 'axios'
const r = Router()

r.get('/',
    (req, res, next) => {
        res.render("index")
    })

r.post('/',
    (req, res, next) => {
        axios.post("https://api.sendgrid.com/v3/contactdb/recipients",
            { email: req.body.email_address },
            {
                headers: { "Authorization": "Bearer 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" }
            })
            .then(() => { res.render("index", { has_signed_up: true }) })
            .catch(e => {
                if (e.response) { console.warn(`Email signup failed with code: ${e.response.status}`) }
                else { console.error(e) }
            })

    })
export default r