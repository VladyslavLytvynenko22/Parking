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
            return _mapper.Map<List<CarDto>>(_dbContext.Cars.ToList() as List<Car>);
        }

        public async Task<CarDto> GetCar(int id)
        {
            return _mapper.Map<CarDto>(await _dbContext.Cars.FindAsync(id));
        }

        public async Task<CarDto> CreateCar(CarDto carDto)
        {
            _dbContext.Cars.Add(_mapper.Map<Car>(carDto));

            await _dbContext.SaveChangesAsync();

            return carDto;
        }

        public async Task<CarDto> UpdateCar(int id, CarDto cardto)
        {
            carFromDb.Brand = car.Brand;
            carFromDb.CarPlate = car.CarPlate;
            carFromDb.OwnerId = car.OwnerId;
            carFromDb.Photo = car.Photo;

            _dbContext.Cars.Update(carFromDb);

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<CarDto>(carFromDb);
        }

        public async Task DeleteCar(int id)
        {
            var car = await _dbContext.Cars.FindAsync(id);
            if (car == null)
            {
                throw new Exception($"Unable to delete. Car id: {id} not found.");
            }

            _dbContext.Cars.Remove(car);

            await _dbContext.SaveChangesAsync();
        }
    }
}
