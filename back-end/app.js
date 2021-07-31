const express = require('express')
//const cors = require('cors')
const app = express()
const port = 3000
const todoRoute = require("./routes/todo")

app.use(express.json()) // middleware vai permitir que o servidor receba arquivo json

/* pp.use((req, res, next) =>{
    
}) */

// Este app.use funciona como um middleware que direciona para a pasta routes
app.use("/todo", todoRoute)


app.listen(port, () => {
  console.log(`conectado com sucesso em http://localhost:${port}`)
})