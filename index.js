
// PARA INSTALAR EXPRESS EN NUESTRA TERMINAL REALIZAMOS EL SIGUIENTE COMANDO
// npm install express

const express = require("express")
const cors = require("cors")

// SE CREA UNA INSTANCIA (aplicacion que express) DEL SERVIDOR QUE SE VA A ESTAR USANDO
const app = express()

// SERVIR ARCHIVOS ESTATICOS
app.use(express.static('public'))

app.use(cors())

// HABILITAMOS LA OPCION DE USAR JSON PARA RECIBIR FORMATOS CON ESTE TIPO
app.use(express.json())



// LISTA DE JUGADORES
const jugadores = []



// CREAMOS UNA CLASE QUE ME CREARA A CADA UNO DE MIS JUGADORES

class Jugador {
    constructor(id){
        this.id = id;
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }


    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

// EL METODO GET ME SOLICITA 2 COSAS 
// * LA URL QUE ESTARA ESCUCHANDO
// * COMO SE VA A TRABAJAR ES PETICION PARA RESPONDERLA
app.get("/unirse", (req,res) =>{
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})


app.post("/mokepon/:jugadorId",(req,res) =>{
    // HAY QUE EXTRAR EL VALOR DE LA URL
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    // findIndex busca los elementos en una lista, si lo encuentra nos devuelve 1. De lo contrario 0
   const jugadorIndex =  jugadores.findIndex((jugador) => jugadorId === jugador.id)

   if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
   }
    console.log(jugadores);
    console.log(jugadorId);

    res.end()
    
    
})

app.post("/mokepon/:jugadorId/position", (req,res) =>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex =  jugadores.findIndex((jugador) => jugadorId === jugador.id)

   if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
   }
   const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)
//    EN EXPRESS.JS SOLO PUEDES DEVOLVER JSON. NO LISTAS
   res.send({
    enemigos
   })
})


app.post("/mokepon/:jugadorId/ataques",(req,res) =>{
    // HAY QUE EXTRAR EL VALOR DE LA URL
    const jugadorId = req.params.jugadorId || ""
    const ataques= req.body.ataques || []
    
    // findIndex busca los elementos en una lista, si lo encuentra nos devuelve 1. De lo contrario 0
   const jugadorIndex =  jugadores.findIndex((jugador) => jugadorId === jugador.id)

   if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
   }

    res.end()
    
    
})

app.get("/mokepon/:jugadorId/ataques",(req,res) =>{
    const jugadorId = req.params.jugadorId || ""

    const jugador = jugadores.find((jugador)=> jugador.id === jugadorId)
    res.send({
        ataques:jugador.ataques || []
    })
})

app.listen(8080, ()=>{
    console.log('Servidor funcionando');
    
})

