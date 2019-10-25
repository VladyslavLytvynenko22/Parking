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
    public class GaragesController : ControllerBase
    {
        private readonly ParkingDbContext _context;

        public GaragesController(ParkingDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetGarages()
        {
            return Ok(_context.Garages.ToList());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGarages([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var garages = await _context.Garages.FindAsync(id);

            if (garages == null)
            {
                return NotFound();
            }

            return Ok(garages);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutGarages([FromRoute] int id, [FromBody] Garage garages)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != garages.Id)
            {
                return BadRequest();
            }

            _context.Entry(garages).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GaragesExists(id))
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
        public async Task<IActionResult> PostGarages([FromBody] Garage garages)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Garages.Add(garages);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGarages", new { id = garages.Id }, garages);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGarages([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var garages = await _context.Garages.FindAsync(id);
            if (garages == null)
            {
                return NotFound();
            }

            _context.Garages.Remove(garages);
            await _context.SaveChangesAsync();

            return Ok(garages);
        }

        private bool GaragesExists(int id)
        {
            return _context.Garages.Any(e => e.Id == id);
        }
    }
}