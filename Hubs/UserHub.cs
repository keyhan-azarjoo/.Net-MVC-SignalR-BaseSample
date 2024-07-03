using Microsoft.AspNetCore.SignalR;
// Server Side


namespace SignalRSample.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;

        // This functions can be called by clients
        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult(); // as this function is not async, we used GetAwaitor and GetResult to wait for the result.
            return base.OnDisconnectedAsync(exception);
        }


        public async Task NewWindowLoaded()
        {
            TotalViews++;
            //send update to all clients that total views have been updated
            await Clients.All.SendAsync("updateTotalViews", TotalViews); // this function send a message to all clients. it invoke the updateTotalViews in client side
        }


        public async Task<String> NewWindowLoadedByInvoke()
        {
            TotalViews++;
            //send update to all clients that total views have been updated
            await Clients.All.SendAsync("updateTotalViews", TotalViews); // this function send a message to all clients. it invoke the updateTotalViews in client side
            return $"total views -{TotalViews}"; // This function is called when client use invoke and it return a string to the sender.
        }


        // In the case client send a message and want the responce to all client inclouding it sellf
        // A <=====> Server
        // B <------ Server
        // C <------ Server
        // D <------ Server

        // await Client.All.SendAsync("RecriveMessage", user, message)


        // In  the case a client send a message, and want the response for just it self. Just it self
        // A         Server
        // B <=====> Server
        // C         Server
        // D         Server

        // await Clients.Caller.SendAsync("ReceiveMessage", user, mnessage)



        // in the case a client send a message and want the responce to anyone except it self. other client except the one that invoke the notification
        // A ------> Server
        // B <------ Server
        // C <------ Server
        // D <------ Server

        // await Clients.Others.SendAsync("ReceiveMessage", users, message)


        // In the case a client send a message and want the responce go to just anothe rclient. Like sending a message specifically to a user or browser. in here B send a message to A
        // A <------ Server
        // B ------> Server
        // C         Server
        // D         Server

        // await Clients.Client("Connection Id - A").SendAsync("ReceiveMessage", user, message)



        // In the case a user send a message to some other user. User B send a message and the responce goes to A and C
        // A <------ Server
        // B ------> Server
        // C <------ Server
        // D         Server

        // await Clients.Clients("Connection Id - A" , "Connection Id - C").SendAsync("ReceiveMessage", user, message)



        // In the case that user want to send a message to all users except user A and C.
        // A         Server
        // B <=====> Server
        // C         Server
        // D <------ Server
        // E <------ Server
        // F <------ Server

        // await Clients.AllExcept("Connection Id - A", "Connection Id - C").SendAsync("ReceiveMessage", user, message)



        // in the case the server wants to send a message to a client. send a notification for example. This client may have two open Tabs and we want to send messaage to all tabs. 
        // ben@gmail.com A <------ Server
        // ben@gmail.com B <------ Server
        // sam@gmail.com C         Server
        // sam@gmail.com D         Server
        // don@gmail.com E         Server
        // don@gmail.com F         Server

        // await Client.User("ben@gmail.com").SendAsync("ReceiveMessage", user, message) // You can send it to a username or a Connection Id


        // In the case we want to send notification to ben and don togater 
        // ben@gmail.com B <------ Server
        // sam@gmail.com C <------ Server
        // sam@gmail.com D         Server
        // don@gmail.com E <------ Server
        // don@gmail.com F <------ Server

        // await Clients.Users("ben@gmail.com","don@gmail.com").SendAsync("ReceiveMessage", user, message) // in this case server send a message to two users and all of their open tabs.// you can use userId(email) and connection Id


    }
}
