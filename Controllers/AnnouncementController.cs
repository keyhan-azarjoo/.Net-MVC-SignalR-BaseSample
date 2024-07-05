using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRSample.Hubs;

namespace SignalRSample.Controllers
{
    public class AnnouncementController : Controller
    {
        private IHubContext<MessagingServiceHub> _hubContext;
        public AnnouncementController(IHubContext<MessagingServiceHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet("/announcement")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("/announcement")]
        public async Task<IActionResult> Post([FromForm] string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
            return RedirectToAction("Index");

        }
    }
}
