using System.ComponentModel.DataAnnotations;

namespace Parking.Domain.Models
{
    public class Person
    {
        public int? Id { get; set; }

        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}