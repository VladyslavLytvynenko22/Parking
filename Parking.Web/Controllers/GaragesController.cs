using Microsoft.AspNetCore.Mvc;
using Parking.Core.Services;
using Parking.Domain.Dto;
using System.Threading.Tasks;

namespace Parking.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GaragesController : ControllerBase
    {
        private readonly GarageService _garageService;

        public GaragesController(GarageService garageService)
        {
            _garageService = garageService;
        }

        [HttpGet]
        public IActionResult GetGarages()
        {
            return Ok(_garageService.GetGarages());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGarages([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var garages = await _garageService.GetGarage(id);

            if (garages == null)
            {
                return NotFound();
            }

            return Ok(garages);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutGarages([FromRoute] int id, [FromBody] GarageDto garageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != garageDto.Id)
            {
                return BadRequest();
            }

            return Ok(await _garageService.UpdateGarage(id, garageDto));
        }

        [HttpPost]
        public async Task<IActionResult> PostGarages([FromBody] GarageDto garageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _garageService.CreateGarage(garageDto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGarages([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _garageService.DeleteGarage(id);

            return Ok();
        }
    }
}