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
    //This cotroller class defines Get and Post actions to
    //send and retireve information from the CoffeePots table 
    //and return it in JSON format for use when the potlist collection calls fetch.
    public class PotInformationController : ApiController
    {
        // GET api/potinformation
        public List<CoffeePotView> Get()
        {
            return CoffeePotBL.GetAllCoffeeInfo();
        }

        // GET api/potinformation/{id}
        public List<CoffeePotView> Get(int site)
        {
            return CoffeePotBL.GetInfoBySite(site); 
        }

        // POST api/potinformation
        public void Post([FromBody]CoffeePotView PotInfo)
        {
            CoffeePotBL.PostCoffeeInfoById(PotInfo);
        }
    }
}
