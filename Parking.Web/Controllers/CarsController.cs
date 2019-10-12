using Microsoft.AspNetCore.Mvc;
using Parking.Core.Services;
using Parking.Domain.Models;
using System.Threading.Tasks;

namespace Parking.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarService _carService;

        public CarsController(CarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public IActionResult GetCars()
        {
            return Ok(_carService.GetCars());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCar([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var car = await _carService.GetCar(id);

            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar([FromRoute] int id, [FromBody] Car car)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != car.Id)
            {
                return BadRequest();
            }

            return Ok(await _carService.UpdateCar(id, car));
        }

        [HttpPost]
        public async Task<IActionResult> PostCar([FromBody] Car car)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _carService.CreateCar(car));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCars([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _carService.DeleteCar(id);

            return Ok();
        }
    }
}