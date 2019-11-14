using AutoMapper;
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
    public class PersonService
    {
        private readonly ParkingDbContext _dbContext;
        private readonly IMapper _mapper;

        public PersonService(ParkingDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            this._mapper = mapper;
        }

        public List<PersonDto> GetPersons()
        {
            return _mapper.Map<List<PersonDto>>(_dbContext.Persons.ToList());
        }

        public async Task<PersonDto> GetPerson(int id)
        {
            return _mapper.Map<PersonDto>(await _dbContext.Persons.FindAsync(id));
        }

        public PersonDto GetPerson(string login, string password)
        {
            return _mapper.Map<PersonDto>(_dbContext.Persons.FirstOrDefault(x => x.Login == login && x.Password == password));
        }

        public async Task<PersonDto> CreatePerson(PersonDto personDto)
        {
            Person person = _dbContext.Persons.Add(_mapper.Map<Person>(personDto))?.Entity;

            PersonDto personDtoFromDb = _mapper.Map<PersonDto>(person);

            _dbContext.Entry(person).State = EntityState.Added;

            await _dbContext.SaveChangesAsync();

            return personDtoFromDb;
        }

        public async Task<PersonDto> UpdatePerson(int id, PersonDto personDto)
        {
            var personFromDb = _dbContext.Persons.FirstOrDefault(o => o.Id == id);
            if (personFromDb == null)
            {
                throw new Exception($"Unable to update. Person id: {id} not found.");
            }

            Person personFromDto = _mapper.Map<Person>(personDto);

            personFromDb.Login = personFromDb.Login != personFromDto.Login ? personFromDto.Login : personFromDb.Login;
            personFromDb.Password = personFromDb.Password != personFromDto.Password ? personFromDto.Password : personFromDb.Password;
            personFromDb.Role = personFromDb.Role != personFromDto.Role ? personFromDto.Role : personFromDb.Role;

            Person person = _dbContext.Persons.Update(personFromDb)?.Entity;

            _dbContext.Entry(person).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<PersonDto>(person);
        }

        public async Task DeletePerson(int id)
        {
            var personFromDb = _dbContext.Persons.FirstOrDefault(o => o.Id == id);
            if (personFromDb == null)
            {
                throw new Exception($"Unable to delete. Person id: {id} not found.");
            }

            _dbContext.Persons.Remove(personFromDb);

            _dbContext.Entry(personFromDb).State = EntityState.Deleted;

            await _dbContext.SaveChangesAsync();
        }
    }
}