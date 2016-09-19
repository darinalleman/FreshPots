using GDC.FreshPots.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDC.FreshPots.Data.Repositories
{
    public class SiteRepo : SqlRepo<Site>
    {
        public IEnumerable<Site> ById(string SiteId)
        {
            int SiteIdnumber = int.Parse(SiteId);
            return base.FindAll(x => x.Id == SiteIdnumber);
        }

        public IEnumerable<Site> GetAll()
        {
            return base.All().ToList();
        }
    }
}
