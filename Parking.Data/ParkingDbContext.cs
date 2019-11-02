using Microsoft.EntityFrameworkCore;
using Parking.Domain.Models;

namespace Parking.Data
{
    public class ParkingDbContext : DbContext
    {
        public ParkingDbContext()
        {
        }

        public ParkingDbContext(DbContextOptions<ParkingDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<Garage> Garages { get; set; }
        public virtual DbSet<Owner> Owners { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>(entity =>
            {
                entity.HasOne(d => d.Owner)
                    .WithMany(p => p.Cars)
                    .HasForeignKey(d => d.OwnerId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Garage>(entity =>
            {
                entity.HasOne(d => d.Car)
                    .WithMany(p => p.Garages)
                    .HasForeignKey(d => d.CarId)
                    .OnDelete(DeleteBehavior.SetNull);
            });
        }
    }
}