using HomeworkApr15_ReactPeopleCars.Data;
using HomeworkApr15_ReactPeopleCars.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeworkApr15_ReactPeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _conStr;

        public PeopleController(IConfiguration configuration)
        {
            _conStr = configuration.GetConnectionString("ConStr");
        }
        [HttpGet("GetPeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleRepository(_conStr);
            return repo.GetAll();
        }
        [HttpPost("AddPerson")]
        public void AddPerson(Person p)
        {
            var repo = new PeopleRepository(_conStr);
            repo.AddPerson(p);
        }
        [HttpGet("GetPersonById")]
        public Person GetPersonById(int id)
        {
            var repo = new PeopleRepository(_conStr);
            return repo.GetById(id);
        }
        [HttpPost("AddCar")]
        public void AddCar(Car c)
        {
            var repo = new PeopleRepository(_conStr);
            repo.AddCar(c);
        }
        [HttpGet("GetCarsForPerson")]
        public List<Car> GetCarsForPerson(int id)
        {
            var repo = new PeopleRepository(_conStr);
            return repo.GetCarsForPerson(id);
        }
        [HttpPost("DeleteCarsForPerson")]
        public void DeleteCarsForPerson(DeleteCarsModel m)
        {
            var repo = new PeopleRepository(_conStr);
            repo.DeleteCarsForPerson(m.Id);
        }
    }
}
