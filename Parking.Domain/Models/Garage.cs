namespace Parking.Domain.Models
{
    public class Garage
    {
        public int Id { get; set; }
        public double Area { get; set; }
        public string Color { get; set; }
        public int? CarId { get; set; }

        public Car Car { get; set; }
    }
}
