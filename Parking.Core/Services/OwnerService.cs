using AutoMapper;
using Parking.Data;
using Parking.Domain.Dto;
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
        private readonly IMapper _mapper;

        public OwnerService(ParkingDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            this._mapper = mapper;
        }

        public List<OwnerDto> GetOwners()
        {
            return _mapper.Map<List<OwnerDto>>(_dbContext.Owners.ToList());
        }

        public async Task<OwnerDto> GetOwner(int id)
        {
            return _mapper.Map<OwnerDto>(await _dbContext.Owners.FindAsync(id));
        }

        public async Task<OwnerDto> CreateOwner(OwnerDto ownerDto)
        {
            Owner owner = _dbContext.Owners.Add(_mapper.Map<Owner>(ownerDto))?.Entity;

            OwnerDto ownerDtoFromDb = _mapper.Map<OwnerDto>(owner);

            await _dbContext.SaveChangesAsync();

            return ownerDtoFromDb;
        }

        public async Task<OwnerDto> UpdateOwner(int id, OwnerDto ownerDto)
        {
            var ownerFromDb = _dbContext.Owners.FirstOrDefault(o => o.Id == id);
            if (ownerFromDb == null)
            {
                throw new Exception($"Unable to update. Owner id: {id} not found.");
            }

            Owner ownerFromDto = _mapper.Map<Owner>(ownerDto);

            ownerFromDb.FirstName = ownerFromDb.FirstName != ownerFromDto.FirstName ? ownerFromDb.FirstName : ownerFromDto.FirstName;
            ownerFromDb.LastName = ownerFromDb.LastName != ownerFromDto.LastName ? ownerFromDb.LastName : ownerFromDto.LastName;
            ownerFromDb.DateOfBirth = ownerFromDb.DateOfBirth != ownerFromDto.DateOfBirth ? ownerFromDb.DateOfBirth : ownerFromDto.DateOfBirth;
            
            Owner owner = _dbContext.Owners.Update(ownerFromDb)?.Entity;

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<OwnerDto>(owner);
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