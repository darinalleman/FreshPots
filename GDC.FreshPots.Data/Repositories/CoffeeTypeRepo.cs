using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GDC.FreshPots.Entities;

namespace GDC.FreshPots.Data
{
    public class CoffeeTypeRepo : SqlRepo<CoffeeType>
    {
        public IEnumerable<CoffeeType> ById(string TypeId)
        {
            int TypeIdnumber = int.Parse(TypeId);
            return base.FindAll(x => x.Id == TypeIdnumber);
        }
        public IEnumerable<CoffeeType> ByText(string TypeText)
        {
            return base.FindAll(x => x.TextValue == TypeText);
        }


        public IEnumerable<CoffeeType> GetAll()
        {
            return base.All().ToList();
        }
    }
}
