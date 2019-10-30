using AutoMapper;
using Parking.Data;
using Parking.Domain.Dto;
﻿using Microsoft.EntityFrameworkCore;
using Parking.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Parking.Core.Services
{
    public class CarService
    {
        private readonly ParkingDbContext _dbContext;
        private readonly IMapper _mapper;

        public CarService(ParkingDbContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
        }

        public List<CarDto> GetCars()
        {
            return _mapper.Map<List<CarDto>>(_dbContext.Cars.ToList());
        }

        public async Task<CarDto> GetCar(int id)
        {
            return _mapper.Map<CarDto>(await _dbContext.Cars.FindAsync(id));
        }

        public async Task<CarDto> CreateCar(CarDto carDto)
        {
            Car car = _dbContext.Cars.Add(_mapper.Map<Car>(carDto))?.Entity;
            CarDto carDtoFromDb = _mapper.Map<CarDto>(car);

            _dbContext.Entry(car).State = EntityState.Added;
            await _dbContext.SaveChangesAsync();

            return carDtoFromDb;
        }

        public async Task<CarDto> UpdateCar(int id, CarDto carDto)
        {
            Car carFromDb = _dbContext.Cars.FirstOrDefault(c => c.Id == id);
            if (carFromDb == null)
            {
                throw new Exception($"Unable to update. Garage id: {id} not found.");
            }
            Car carFromDto = _mapper.Map<Car>(carDto);

            carFromDb.Brand = carFromDb.Brand != carFromDto.Brand ? carFromDto.Brand : carFromDb.Brand;
            carFromDb.CarPlate = carFromDb.CarPlate != carFromDto.CarPlate ? carFromDto.CarPlate : carFromDb.CarPlate;
            carFromDb.OwnerId = carFromDb.OwnerId != carFromDto.OwnerId ? carFromDto.OwnerId : carFromDb.OwnerId;

            Car car = _dbContext.Cars.Update(carFromDb)?.Entity;

            _dbContext.Entry(car).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<CarDto>(car);
        }

        public async Task DeleteCar(int id)
        {
            var car = await _dbContext.Cars.FindAsync(id);
            if (car == null)
            {
                throw new Exception("Unable to delete. Car not found.");
            }

            _dbContext.Cars.Remove(car);
            _dbContext.Entry(car).State = EntityState.Deleted;

            await _dbContext.SaveChangesAsync();
        }
    }
}
