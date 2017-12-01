const ws = require('nodejs-websocket')
console.log("Running ")

var messages = [];

const server = ws.createServer((newConnection) => {

    console.log("Yeah ! New connection !")
    newConnection.on('error', function (err) {
        if (err.code !== 'ECONNRESET') {
            // Ignore ECONNRESET and re throw anything else
            console.log('CATCH ERROR : ', err)
            //throw err
        }
    })
    if (messages.length > 0) {
        messages.forEach(msg => {
            newConnection.sendText(msg)
        })
    }
    newConnection.on("text", (msg) => {

        console.log("Message received", msg)
        var newMsg = JSON.parse(msg)
        newMsg.date = new Date()
        newMsgStrg = JSON.stringify(newMsg)
        messages.push(newMsgStrg)
        server.connections.forEach((savedConnection) => {
            // if(connexion != conn) {

            savedConnection.sendText(newMsgStrg);
            //}
        })
    })

    newConnection.on("close", (code, reason) => {
        console.log("Bye bye ! Connection closed", "code =", code, "reason =", reason)
    })

}).listen(8080)
