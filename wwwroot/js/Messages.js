//const { group } = require("console");

var connectionMessagingService = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Trace) // you can use different logging system to debug
    .withUrl("/hubs/MessagingService", signalR.HttpTransportType.WebSockets).build();

connectionMessagingService.on("ReceiveMessage", function (message) {
    var div = document.createElement("div");
    div.innerHTML = message + "<hr />";
    document.getElementById("messages").appendChild(div);
});

connectionMessagingService.on("UserConnected", function (ConnectionId) {
    var groupElement = document.getElementById("group");
    var option = document.createElement("option");
    option.text = ConnectionId;
    option.value = ConnectionId;
    groupElement.add(option);
});
connectionMessagingService.on("UserDisconnected", function (ConnectionId) {
    var groupElement = document.getElementById("group");

    for (var i = 0; i < groupElement.length; i++) {
        if (groupElement.options[i].value == ConnectionId) {
            groupElement.remove(i);
        }
    }


});




// start connection
function fulfilled() {
    // do something on start
    console.log("Connection to user Hub successful");
}

function rejected() {
    // do some thing in reject case. Log it
    console.log("Connection to user Hub Unsuccessful");
}

// At the end, we start the connection. in the case we successfully connected, fulfilled will be called and in the rejection situation, rejected will be called.
connectionMessagingService.start().then(fulfilled, rejected);

document.getElementById("sendbutton").addEventListener("click", function (event) {
    var message = document.getElementById("message").value;
    var groupElement = document.getElementById("group");
    var groupvalue = groupElement.options[groupElement.selectedIndex].value;

    if (groupvalue === "All" || groupvalue === "MySelf") {
        var method = groupvalue === "All" ? "SendMessageToAll" : "SendMessageToCaller";
        connectionMessagingService.invoke(method, message).catch(function (err) {
            return console.error(err.message.tostring());
        });

    } else {
        connection.invoke("SendMessageToUser", groupvalue, message).catch(function (err) {
            return console.error(err.message.tostring());
        });
    }
    
    event.preventDefault();
})

