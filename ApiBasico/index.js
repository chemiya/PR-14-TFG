require('./config/conexion');
const express = require('express')
const cors = require('cors')
const port = ( 3000)

// express
const app = express()


app.use(express.json())
app.use(cors())

//configurar pongo el puerto
app.set('port',port)

//rutas basicas
app.use('/api', require('./rutas'))//acceder a localhost:3000/api


//inicializar express y escuchan en el puerto
app.listen(app.get('port'),(error)=>{
    if(error)
    {console.log('error al iniciar el servidor: '+error)}
    else{
        console.log('servidor iniciado en el prueto: '+port)
    }
})