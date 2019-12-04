using Microsoft.AspNetCore.Authorization;
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

        [Route("getgarages")]
        public IActionResult GetGarages()
        {
            return Ok(_garageService.GetGarages());
        }

        [Route("getgarage/{id}")]
        public async Task<IActionResult> GetGarage([FromRoute] int id)
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

        [Route("updategarage/{id}")]
        public async Task<IActionResult> PutGarage([FromRoute] int id, [FromBody] GarageDto garageDto)
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

        [Route("creategarage")]
        public async Task<IActionResult> PostGarage([FromBody] GarageDto garageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _garageService.CreateGarage(garageDto));
        }

        [Route("deletegarage/{id}")]
        public async Task<IActionResult> DeleteGarage([FromRoute] int id)
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