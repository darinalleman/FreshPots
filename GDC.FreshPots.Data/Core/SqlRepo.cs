using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GDC.FreshPots.Data
{
    public class SqlRepo<T> : Repository<T>
         where T : class
    {
        public SqlRepo() : base() { }
    }
}
