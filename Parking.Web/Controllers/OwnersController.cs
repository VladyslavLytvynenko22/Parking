using Microsoft.AspNetCore.Mvc;
using Parking.Core.Services;
using Parking.Domain.Models;
using System.Threading.Tasks;

namespace Parking.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnersController : ControllerBase
    {
        private readonly OwnerService _ownerService;

        public OwnersController(OwnerService ownerService)
        {
            _ownerService = ownerService;
        }

        [HttpGet]
        public IActionResult GetOwners()
        {
            return Ok(_ownerService.GetOwners());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOwners([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _ownerService.GetOwner(id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutOwners([FromRoute] int id, [FromBody] Owner owner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != owner.Id)
            {
                return BadRequest();
            }

            return Ok(await _ownerService.UpdateOwner(id, owner));
        }

        [HttpPost]
        public async Task<IActionResult> PostOwners([FromBody] Owner owner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(_ownerService.CreateOwner(owner));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOwners([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _ownerService.DeleteOwner(id);

            return Ok();
        }
    }
}