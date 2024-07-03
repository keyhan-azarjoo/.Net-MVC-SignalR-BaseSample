// JS in Client Side

// Create connection
// For connecting Client to server you need to create a connection like here
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();





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




// invoke hub methods aka send notification to hub
// in the case that we want to send a message to server we can use this method to call the NewWindowLoaded function.
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded")
}



// start connection
function fulfilled() {
    // do something on start
    console.log("Connection to user Hub successful");
    newWindowLoadedOnClient();
}

function rejected() {
    // do some thing in reject case. Log it
    console.log("Connection to user Hub Unsuccessful");
}

// At the end, we start the connection. in the case we successfully connected, fulfilled will be called and in the rejection situation, rejected will be called.
connectionUserCount.start().then(fulfilled, rejected);