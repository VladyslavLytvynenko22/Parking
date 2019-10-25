using System;
using System.Collections.Generic;

namespace Parking.Domain.Models
{
    public class Owner
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Dob { get; set; }

        public List<Car> Cars { get; set; } = new List<Car>();
    }
}
