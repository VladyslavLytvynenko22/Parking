using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Parking.Domain.Dto
{
    public class GarageDto
    {
        public int Id { get; set; }

        [Required]
        public double Area { get; set; }

        public string Color { get; set; }

        public int? CarId { get; set; }
    }
}
