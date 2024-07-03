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
    }
}
