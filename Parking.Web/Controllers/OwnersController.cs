using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parking.Core.Services;
using Parking.Domain.Dto;
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

        [Route("getowners")]
        public IActionResult GetOwners()
        {
            return Ok(_ownerService.GetOwners());
        }

        [Route("getowner/{id}")]
        public async Task<IActionResult> GetOwner([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            OwnerDto owner = await _ownerService.GetOwner(id);

            if (owner == null)
            {
                return NotFound();
            }

            return Ok(owner);
        }

        [Route("updateowner/{id}")]
        public async Task<IActionResult> PutOwner([FromRoute] int id, [FromBody] OwnerDto ownerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ownerDto.Id)
            {
                return BadRequest();
            }

            return Ok(await _ownerService.UpdateOwner(id, ownerDto));
        }

        [Route("createowner")]
        public async Task<IActionResult> PostOwner([FromBody] OwnerDto ownerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _ownerService.CreateOwner(ownerDto));
        }

        [Route("deleteowner/{id}")]
        public async Task<IActionResult> DeleteOwner([FromRoute] int id)
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