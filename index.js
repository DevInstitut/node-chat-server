const ws = require('nodejs-websocket')

const server = ws.createServer( (newConnection) => {
    
    console.log("Yeah ! New connection !")
    
    newConnection.on("text", (msg) => {

        console.log("Message received" , msg)

        server.connections.forEach( (savedConnection) => {
            // if(connexion != conn) {
                savedConnection.sendText(msg);
            //}
        })
    })

    newConnection.on("close", (code, reason) => {
        console.log("Bye bye ! Connection closed", "code =", code, "reason =", reason)
    })

}).listen(8080)
