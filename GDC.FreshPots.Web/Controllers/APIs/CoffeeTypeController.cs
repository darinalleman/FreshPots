using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GDC.FreshPots.Entities;
using GDC.FreshPots.Data;
using GDC.FreshPots.Business;


namespace GDC.FreshPots.Web.Controllers.APIs
{
    //This cotroller class defines Get actions to retireve 
    //information from the CoffeeType table and return it 
    //in JSON format for use when the coffeetype collections calls fetch.
    public class CoffeeTypeController : ApiController
    {
        // GET api/coffeetype
        public List<CoffeeType> Get()
        {
            using (var repo = new CoffeeTypeRepo())
            {
                return (repo.All().ToList());
            }
        }

        // GET api/coffeetype/{id}
        public List<CoffeeType> Get(string Id)
        {
            using (var repo = new CoffeeTypeRepo())
            {
                return (repo.ById(Id).ToList());
            }
        }
    }
}