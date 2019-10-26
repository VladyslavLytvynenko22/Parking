using Parking.Data;
using Parking.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Parking.Core.Services
{
    public class OwnerService
    {
        private readonly ParkingDbContext _dbContext;

        public OwnerService(ParkingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Owner> GetOwners()
        {
            return _dbContext.Owners.ToList();
        }

        public async Task<Owner> GetOwner(int id)
        {
            return await _dbContext.Owners.FindAsync(id);
        }

        public async Task<Owner> CreateOwner(Owner owner)
        {
            _dbContext.Add(owner);
            await _dbContext.SaveChangesAsync();

            return owner;
        }

        public async Task<Owner> UpdateOwner(int id, Owner owner)
        {
            var ownerFromDb = _dbContext.Owners.FirstOrDefault(o => o.Id == id);
            if (ownerFromDb == null)
            {
                throw new Exception($"Unable to update. Owner id: {id} not found.");
            }

            ownerFromDb.FirstName = owner.FirstName;
            ownerFromDb.LastName = owner.LastName;
            ownerFromDb.Dob = owner.Dob;

            _dbContext.Owners.Update(ownerFromDb);

            await _dbContext.SaveChangesAsync();

            return ownerFromDb;
        }

        public async Task DeleteOwner(int id)
        {
            var ownerFromDb = _dbContext.Owners.FirstOrDefault(o => o.Id == id);
            if (ownerFromDb == null)
            {
                throw new Exception($"Unable to delete. Owner id: {id} not found.");
            }

            _dbContext.Owners.Remove(ownerFromDb);

            await _dbContext.SaveChangesAsync();
        }
    }
}