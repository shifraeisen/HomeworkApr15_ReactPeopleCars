using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeworkApr15_ReactPeopleCars.Data
{
    public class Car
    {
        public int Id {  get; set; }
        public int PersonId { get; set; }
        public string Make {  get; set; }
        public string Model { get; set; }
        public int Year {  get; set; }

        [JsonIgnore]
        public Person Person { get; set; }
    }
}
