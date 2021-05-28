// Loads app server using express.
const express = require('express')
const morgan = require('morgan')
const app = express()
const mysql = require('mysql')

app.use(morgan('short'))

const connection = mysql.createConnection({
        host: 'database-2.cnxqeypeorsf.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'Sknf6q1sCsTAaQ3j8sYw',
        database: 'cryptoraunt'
    })

app.get('/', async (req,res)=> {
    console.log('Fetching users: ')

    let locations = await new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users`, (err,results) => {
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
    res.json(locations)

    // res.end()
})

// app.get("/", (req,res) => {
//     console.log("responding to root route")
//     res.send("Hello from root")
// })

app.get("/users", (req,res) => {
})

//localhost:6969
app.listen(6969, () => {
    console.log("Server is up and listening on 3306...")
})