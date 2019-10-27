using System;
using System.ComponentModel.DataAnnotations;

namespace Parking.Domain.Dto
{
    public class OwnerDto
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }
    }
}
