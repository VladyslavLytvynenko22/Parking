using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Parking.Domain.Models
{
    public class Owner
    {
        public int? Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public List<Car> Cars { get; set; } = new List<Car>();
    }
}