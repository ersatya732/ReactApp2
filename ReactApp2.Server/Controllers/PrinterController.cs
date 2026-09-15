
using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Models;
using ReactApp2.Server.Repository;
using System.Reflection;

namespace ReactApp2.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrinterController : ControllerBase
    {
        private readonly IPrinterRepository _repository;

        public PrinterController(IPrinterRepository repository)
        {
            _repository = repository;
        }


 
        [HttpGet("Get")]
        public async Task<IActionResult> GetPrinters()
        {
            var printers = await _repository.GetPrintersAsync();

            return Ok(printers);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetPrinterById(int id)
        {
            var printer = await _repository.GetPrinterByIdAsync(id);

            if (printer == null)
            {
                return NotFound(new
                {
                    message = "Printer not found."
                });
            }

            return Ok(printer);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreatePrinter([FromBody] Printer printer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _repository.CreatePrinterAsync(printer);

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Printer could not be created."
                });
            }

            return Ok(new
            {
                message = "Printer created successfully.",
                data = result
            });
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdatePrinter([FromBody] Printer printer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (printer.PrinterAutoId <= 0)
            {
                return BadRequest(new
                {
                    message = "Valid PrinterAutoId is required."
                });
            }

            var existingPrinter =
                await _repository.GetPrinterByIdAsync(printer.PrinterAutoId);

            if (existingPrinter == null)
            {
                return NotFound(new
                {
                    message = "Printer not found."
                });
            }

            var result = await _repository.UpdatePrinterAsync(printer);

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Printer could not be updated."
                });
            }

            return Ok(new
            {
                message = "Printer updated successfully.",
                data = result
            });
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeletePrinter(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    message = "Valid PrinterAutoId is required."
                });
            }

            var existingPrinter =
                await _repository.GetPrinterByIdAsync(id);

            if (existingPrinter == null)
            {
                return NotFound(new
                {
                    message = "Printer not found."
                });
            }

            var result = await _repository.DeletePrinterAsync(id);

            if (!result)
            {
                return BadRequest(new
                {
                    message = "Printer could not be deleted."
                });
            }

            return Ok(new
            {
                message = "Printer deleted successfully."
            });
        }
    }
}

