let ws = require('ws').Server;
let server = new ws({ port: 5001 }, function(){
    console.log('Websocket server started....');
});

server.on('connection', function(ws){
    ws.on('message', function(message){

        message = JSON.parse(message);

        if(message.type == 'name'){
            console.log('working...name');
            ws.personName = message.data;
            return;
        }

        console.log("Received :" + message);

        server.clients.forEach(function(client){
            if(ws != client)
            client.send(JSON.stringify({
                name: ws.personName,
                data: message.data
            }));
        });

        //ws.send(message);
    });

    ws.on('close', function(){
        console.log('I have lost a client');
    });

    // console.log('One more client is connected');

})