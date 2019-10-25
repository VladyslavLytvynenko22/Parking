using Parking.Data;
using Parking.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Parking.Core.Services
{
    public class GarageService
    {
        private readonly ParkingDbContext _dbContext;

        public GarageService(ParkingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Garage> GetGarages()
        {
            return _dbContext.Garages.ToList();
        }

        public async Task<Garage> GetGarage(int id)
        {
            return await _dbContext.Garages.FindAsync(id);
        } 

        public async Task<Garage> CreateGarage(Garage garage)
        {
            _dbContext.Garages.Add(garage);
            await _dbContext.SaveChangesAsync();

            return garage;
        }

        public async Task<Garage> UpdateGarage(int id, Garage garage)
        {
            var garageFromDb = _dbContext.Garages.FirstOrDefault(g => g.Id == id);
            if (garageFromDb == null)
            {
                throw new Exception($"Unable to update. Garage id: {id} not found.");
            }

            garageFromDb.Area = garage.Area;
            garageFromDb.CarId = garage.CarId;
            garageFromDb.Color = garage.Color;

            _dbContext.Garages.Update(garageFromDb);

            await _dbContext.SaveChangesAsync();

            return garageFromDb;
        }

        public async Task DeleteGarage(int id)
        {
            var garageFromDb = _dbContext.Garages.FirstOrDefault(g => g.Id == id);
            if (garageFromDb == null)
            {
                throw new Exception($"Unable to delete. Garage id: {id} no found.");
            }

            _dbContext.Garages.Remove(garageFromDb);

            await _dbContext.SaveChangesAsync();
        }
    }
}
