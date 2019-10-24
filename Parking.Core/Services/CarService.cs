﻿using Microsoft.EntityFrameworkCore;
using Parking.Data;
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

        public CarService(ParkingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Car> GetCars()
        {
            return _dbContext.Cars.ToList();
        }

        public async Task<Car> GetCar(int id)
        {
            return await _dbContext.Cars.FindAsync(id);
        }

        public async Task<Car> CreateCar(Car car)
        {
            _dbContext.Cars.Add(car);
            _dbContext.Entry(car).State = EntityState.Added;
            await _dbContext.SaveChangesAsync();

            return car;
        }

        public async Task<Car> UpdateCar(int id, Car car)
        {
            var carFromDb = await _dbContext.Cars.FindAsync(id);

            carFromDb.Brand = car.Brand;
            carFromDb.CarPlate = car.CarPlate;
            carFromDb.OwnerId = car.OwnerId;

            _dbContext.Cars.Update(carFromDb);
            _dbContext.Entry(carFromDb).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return carFromDb;
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
