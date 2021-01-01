import { Router } from 'express'
import axios from 'axios'
// const { Client } = require('sendgrid/client')
const r = Router()

// const sg = new Client()
// sg.setAPIKey(process.env.SENDGRID_KEY)

r.get('/',
    (req, res, next) => {
        res.render("index")
    })

r.post('/',
    (req, res, next) => {

        // sg.request({
        //     method:"POST",
        //     url:"/v3/contactdb/recipients",
        //     body:[{email:req.body.email_address}]
        // })

        axios.put("https://api.sendgrid.com/v3/marketing/contacts",
            {
                contacts: [{ email: req.body.email_address }],
                list_ids: [
                    "9463ee06-8004-4ed8-ba51-853cacc1344f"
                ],
            },
            {
                headers: { "Authorization": `Bearer ${process.env.SENDGRID_KEY}`, "Accept": "application/json", "Content-Type": "application/json" }
            })
            .then(() => { res.render("index", { has_signed_up: true }) })
            .catch(e => {
                console.log(`Bearer ${process.env.SENDGRID_KEY}`)
                if (e.response) {
                    console.warn(`Email signup failed with code: ${e.response.status}`)
                    console.log(e.response.data)
                }

                else { console.error(e) }
            })

    })
export default r