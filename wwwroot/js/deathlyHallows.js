// JS in Client Side

// training video : https://www.youtube.com/watch?v=pl0OobPmWTk


// Create connection
// For connecting Client to server you need to create a connection like here
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Trace) // you can use different logging system to debug
    .withUrl("/hubs/deathlyhallows").build();
// the transport type is WebSockets by defult
// you can change the connection protecol here


// getting access to the DIV to fill them in the server
var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");





// connect to methods that hub invoke aka receive notifications from hub
// Here we create a method that can be called by server and passe a value.
// Server can send a message to updateDeathlyHallowsCount and passes a value and client shows that value in our case.
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
    // in this case, the controller in the server call this function.
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();

})   // receive the numbers  from server





// start connection
function fulfilled() {

    // In this part we get the latest info for all data and shou them at the begining. this case happend when we work with the first page and after sending and getting some request we open the main page again. the data there is 0 but with this code we get the latest data at the beggining
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    })


    // do something on start
    console.log("Connection to user Hub successful");
}

function rejected() {
    // do some thing in reject case. Log it
    console.log("Connection to user Hub Unsuccessful");
}

// At the end, we start the connection. in the case we successfully connected, fulfilled will be called and in the rejection situation, rejected will be called.
connectionDeathlyHallows.start().then(fulfilled, rejected);