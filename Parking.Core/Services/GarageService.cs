﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Parking.Data;
using Parking.Domain.Dto;
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
        private readonly IMapper _mapper;

        public GarageService(ParkingDbContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
        }

        public List<GarageDto> GetGarages()
        {
            return _mapper.Map<List<GarageDto>>(_dbContext.Garages.ToList());
        }

        public async Task<GarageDto> GetGarage(int id)
        {
            return _mapper.Map<GarageDto>(await _dbContext.Garages.FindAsync(id));
        }

        public async Task<GarageDto> CreateGarage(GarageDto garageDto)
        {
            Garage garage = _dbContext.Garages.Add(_mapper.Map<Garage>(garageDto))?.Entity;
            GarageDto garageDtoFromDb = _mapper.Map<GarageDto>(garage);
            _dbContext.Entry(garage).State = EntityState.Added;

            await _dbContext.SaveChangesAsync();

            return garageDtoFromDb;
        }

        public async Task<GarageDto> UpdateGarage(int id, GarageDto garageDto)
        {
            var garageFromDb = _dbContext.Garages.FirstOrDefault(g => g.Id == id);
            if (garageFromDb == null)
            {
                throw new Exception($"Unable to update. Garage id: {id} not found.");
            }

            Garage garageFromDto = _mapper.Map<Garage>(garageDto);

            garageFromDb.Area = garageFromDb.Area != garageFromDto.Area ? garageFromDto.Area : garageFromDb.Area;
            garageFromDb.Color = garageFromDb.Color != garageFromDto.Color ? garageFromDto.Color : garageFromDb.Color;
            garageFromDb.CarId = garageFromDb.CarId != garageFromDto.CarId ? garageFromDto.CarId : garageFromDb.CarId;

            Garage garage = _dbContext.Garages.Update(garageFromDb)?.Entity;

            _dbContext.Entry(garage).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<GarageDto>(garage);
        }

        public async Task DeleteGarage(int id)
        {
            var garageFromDb = _dbContext.Garages.FirstOrDefault(g => g.Id == id);
            if (garageFromDb == null)
            {
                throw new Exception($"Unable to delete. Garage id: {id} no found.");
            }

            _dbContext.Garages.Remove(garageFromDb);

            _dbContext.Entry(garageFromDb).State = EntityState.Deleted;

            await _dbContext.SaveChangesAsync();
        }
    }
}