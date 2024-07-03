using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRSample.Hubs;
using SignalRSample.Models;
using System.Diagnostics;

namespace SignalRSample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowsHub> _deathlyHub; // injecting the DeathlyHallows Hub to the controller to use it and send message to clients.
        public HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowsHub> deathlyhub)
        {
            _logger = logger;
            _deathlyHub = deathlyhub;

        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }









        // this is the controller for voting
        public async Task<IActionResult> DeathlyHallows(string type)
        {
            // here we find the type and increase it by one whene someone call the link
            if (SD.DealthyHallowRace.ContainsKey(type))
            {
                SD.DealthyHallowRace[type]++;
            }

            // in this part, we call the client and update their status
            // we injected the _deathlyHub and use it here.
            await _deathlyHub.Clients.All.SendAsync("updateDeathlyHallowsCount"
                , SD.DealthyHallowRace[SD.Cloak]
                , SD.DealthyHallowRace[SD.Stone]
                , SD.DealthyHallowRace[SD.Wand]);



            return Accepted();
        }



    }
}
