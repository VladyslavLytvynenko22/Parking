using System.Collections.Generic;

namespace Parking.Domain.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string CarPlate { get; set; }
        public int OwnerId { get; set; }
        public string Photo { get; set; }

        public Owner Owner { get; set; }
        public List<Garage> Garages { get; set; } = new List<Garage>();
    }
}
