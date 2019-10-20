using AutoMapper;
using Parking.Domain.Dto;
using Parking.Domain.Models;

namespace Parking.Core
{
    class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Car, CarDto>();
            CreateMap<CarDto, Car>();
        }
    }
}
