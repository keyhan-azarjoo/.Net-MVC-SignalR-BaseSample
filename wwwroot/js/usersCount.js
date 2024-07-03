
// Create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();


// connect to methods that hub invoke aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {

    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
})   // receive a message from server
connectionUserCount.on("updateTotalUsers", (value) => {

    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})   // receive a message from server


// invoke hub methods aka send notification to hub
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


connectionUserCount.start().then(fulfilled, rejected);