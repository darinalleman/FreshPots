using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GDC.FreshPots.Entities;

namespace GDC.FreshPots.Data
{
    public class PotStatusRepo : SqlRepo<PotStatus>
    {
        public IEnumerable<PotStatus> ById(string StatusId)
        {
            int StatusIdnumber = int.Parse(StatusId);
            return base.FindAll(x => x.Id == StatusIdnumber);
        }
    }
}
