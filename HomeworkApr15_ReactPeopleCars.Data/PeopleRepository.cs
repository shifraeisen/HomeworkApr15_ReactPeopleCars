using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeworkApr15_ReactPeopleCars.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }
        public void AddPerson(Person p)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(p);
            context.SaveChanges();
        }
        public Person GetById(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
        public void AddCar(Car c)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Cars.Add(c);
            context.SaveChanges();
        }
        public List<Car> GetCarsForPerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == id).Include(c => c.Person).ToList();
        }
        public void DeleteCarsForPerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Cars.RemoveRange(context.Cars.Where(c => c.PersonId == id));
            context.SaveChanges();
        }
    }
}
