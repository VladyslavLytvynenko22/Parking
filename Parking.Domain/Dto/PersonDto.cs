using System.ComponentModel.DataAnnotations;

namespace Parking.Domain.Dto
{
    public class PersonDto
    {
        public int? Id { get; set; }

        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }

        public string Role { get; set; }
    }
}