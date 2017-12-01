const ws = require('nodejs-websocket')
console.log("Running ")

const server = ws.createServer((newConnection) => {

    console.log("Yeah ! New connection !")
    newConnection.on('error', function (err) {
        if (err.code !== 'ECONNRESET') {
            // Ignore ECONNRESET and re throw anything else
            throw err
        }
    })
    newConnection.on("text", (msg) => {

        console.log("Message received", msg)

        server.connections.forEach((savedConnection) => {
            // if(connexion != conn) {
            savedConnection.sendText(msg);
            //}
        })
    })

    newConnection.on("close", (code, reason) => {
        console.log("Bye bye ! Connection closed", "code =", code, "reason =", reason)
    })

}).listen(8080)
