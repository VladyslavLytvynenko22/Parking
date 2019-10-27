using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Parking.Domain.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required]
        public string Brand { get; set; }

        [Required]
        public string CarPlate { get; set; }

        [Required]
        public int OwnerId { get; set; }

        public string Photo { get; set; }

        public Owner Owner { get; set; }

        public List<Garage> Garages { get; set; } = new List<Garage>();
    }
}