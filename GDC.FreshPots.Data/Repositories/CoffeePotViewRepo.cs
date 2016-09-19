using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GDC.FreshPots.Entities;

namespace GDC.FreshPots.Data
{
    public class CoffeePotViewRepo : SqlRepo<CoffeePotView>
    {
        public IEnumerable<CoffeePotView> ById(string PotId)
        {
            int PotIdnumber = int.Parse(PotId);
            return base.FindAll(x => x.Id == PotIdnumber);
        }
    }
}
