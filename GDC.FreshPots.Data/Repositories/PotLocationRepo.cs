using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GDC.FreshPots.Entities;

namespace GDC.FreshPots.Data
{
    public class PotLocationRepo : SqlRepo<PotLocation>
    {
        public IEnumerable<PotLocation> ById(string LocationId)
        {
            int LocationIdnumber = int.Parse(LocationId);
            return base.FindAll(x => x.Id == LocationIdnumber);
        }
    }
}
