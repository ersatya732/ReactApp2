using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrinterController : ControllerBase
    {

        [HttpGet("GetPrinters")]
        public IActionResult GetPrinters()
        {
            var printers = new[]
            {
                new
                {
                    printerAutoId = 1,
                    printerName = "HP LaserJet",
                    model = "M404dn",
                    ipAddress = "192.168.1.100",
                    status = 1
                },
                new
                {
                    printerAutoId = 2,
                    printerName = "Canon Printer",
                    model = "LBP2900",
                    ipAddress = "192.168.1.101",
                    status = 0
                },
                new
                {
                    printerAutoId = 3,
                    printerName = "Epson Printer",
                    model = "L3150",
                    ipAddress = "192.168.1.102",
                    status = 0
                },
                new
                {
                    printerAutoId = 4,
                    printerName = "HP Printer",
                    model = "L3165",
                    ipAddress = "192.168.1.192",
                    status = 0
                }
             };
            return Ok(printers);
        }
    }
}


