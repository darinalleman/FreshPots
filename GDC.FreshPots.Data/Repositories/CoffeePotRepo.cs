using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GDC.FreshPots.Entities;

namespace GDC.FreshPots.Data
{
    public class CoffeePotRepo : SqlRepo<CoffeePots>
    {
        public IEnumerable<CoffeePots> ById(string PotId)
        {
            int PotIdnumber = int.Parse(PotId);
            return base.FindAll(x => x.Id == PotIdnumber);
        }
    }
}
