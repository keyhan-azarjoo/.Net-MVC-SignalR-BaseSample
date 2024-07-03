// JS in Client Side

// training video : https://www.youtube.com/watch?v=pl0OobPmWTk


// Create connection
// For connecting Client to server you need to create a connection like here
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build();
// the transport type is WebSockets by defult
// you can change the connection protecol here

// Web Sockets
// web Sockets is a 2 way connection.meanning that they create a connection and have it and use it when ever they want.
// Client can send message to server and server can send message to client any time it want.

// Server Sent Events
// In this connection, client open a connection to server and server doesn't response to that and start intracting by client by events and send az much as event it want
// it is not by directional. client use http request but the server use events to comunicate to clients

// Long Polling
// in this protecol, client send a request and server doesn't response to that and client wait to responce to the time out and after time out the client send another request and wait for the response again.
// so client has a chanel which always is open.
// when the server response to the client, client send another request so they are connected all the time.

// you can check these protecols in the network tab in f12 in wevsite. 
// you will see how connections open and close in different protecols







// connect to methods that hub invoke aka receive notifications from hub
// Here we create a method that can be called by server and passe a value.
// Server can send a message to updateTotalViews and passes a value and client shows that value in our case.
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
})   // receive a message from server


// We can have multiople connection and methods to invoke a function in client Side.
connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})   // receive a message from server




// send hub methods aka send notification to hub
// in the case that we want to send a message to server we can use this method to call the NewWindowLoaded function.
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded"); // in the send, you won't wait for a responce

}


// in the invoke, you are expected to get a return
function newWindowLoadedOnClientinvoke() {

    connectionUserCount.invoke("NewWindowLoadedByInvoke", "keyhan").then((value) => console.log(value)); // but in the invoke, you are expected to get a return
    // in this example, we are logging the result in console
    // you can send a parameter like keyhan az well. you can send more parameters
}


// start connection
function fulfilled() {
    // do something on start
    console.log("Connection to user Hub successful");
    //newWindowLoadedOnClient();
    newWindowLoadedOnClientinvoke();
}

function rejected() {
    // do some thing in reject case. Log it
    console.log("Connection to user Hub Unsuccessful");
}

// At the end, we start the connection. in the case we successfully connected, fulfilled will be called and in the rejection situation, rejected will be called.
connectionUserCount.start().then(fulfilled, rejected);