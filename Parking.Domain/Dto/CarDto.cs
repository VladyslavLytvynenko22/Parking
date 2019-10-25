using System.ComponentModel.DataAnnotations;

namespace Parking.Domain.Dto
{
    public class CarDto
    {
        public int Id { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string CarPlate { get; set; }
        [Required]
        public int OwnerId { get; set; }
        public string Photo { get; set; }
    }
}
