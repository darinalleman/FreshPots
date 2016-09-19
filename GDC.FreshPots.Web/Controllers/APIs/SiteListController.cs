using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GDC.FreshPots.Entities;
using GDC.FreshPots.Data;
using GDC.FreshPots.Business;
using GDC.FreshPots.Data.Repositories;

namespace GDC.FreshPots.Web.Controllers.APIs
{
    //This cotroller class defines Get actions to retireve 
    //information from the CoffeeType table and return it 
    //in JSON format for use in the FreshPots application.
    public class SiteListController : ApiController
    {
        // GET api/sitelist
        public List<Site> Get()
        {
            using (var repo = new SiteRepo())
            {
                return (repo.All().ToList());
            }
        }

    }
}