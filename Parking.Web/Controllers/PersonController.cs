using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Parking.Core.Services;
using Parking.Domain.Dto;
using System.Threading.Tasks;

namespace Parking.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PersonController : ControllerBase
    {
        private readonly PersonService _personService;

        public PersonController(PersonService personService)
        {
            this._personService = personService;
        }

        [Route("getpersons")]
        public IActionResult GetPersons()
        {
            return Ok(_personService.GetPersons());
        }

        [Route("getperson")]
        public async Task<IActionResult> GetPerson(PersonDto personDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = _personService.GetPerson(personDto);

            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        [Route("getperson/{id}")]
        public async Task<IActionResult> GetPerson([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = await _personService.GetPerson(id);

            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        [Route("updateperson/{id}")]
        public async Task<IActionResult> PutPerson([FromRoute] int id, [FromBody] PersonDto persondto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != persondto.Id)
            {
                return BadRequest();
            }

            return Ok(await _personService.UpdatePerson(id, persondto));
        }

        [AllowAnonymous]
        [Route("createperson")]
        public async Task<IActionResult> PostPerson([FromBody] PersonDto persondto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _personService.CreatePerson(persondto));
        }

        [Route("deleteperson/{id}")]
        public async Task<IActionResult> DeletePerson([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _personService.DeletePerson(id);

            return Ok();
        }
    }
}