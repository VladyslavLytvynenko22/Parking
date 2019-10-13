using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parking.Data;
using Parking.Domain.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Parking.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnersController : ControllerBase
    {
        private readonly ParkingDbContext _context;

        public OwnersController(ParkingDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetOwners()
        {
            return Ok(_context.Owners.ToList());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOwners([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Owners = await _context.Owners.FindAsync(id);

            if (Owners == null)
            {
                return NotFound();
            }

            return Ok(Owners);
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

            _context.Entry(owner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OwnersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> PostOwners([FromBody] Owner owner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Owners.Add(owner);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOwner", new { id = owner.Id }, owner);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOwners([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var owner = await _context.Owners.FindAsync(id);
            if (owner == null)
            {
                return NotFound();
            }

            _context.Owners.Remove(owner);
            await _context.SaveChangesAsync();

            return Ok(owner);
        }

        private bool OwnersExists(int id)
        {
            return _context.Owners.Any(e => e.Id == id);
        }
    }
}