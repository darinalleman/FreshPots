using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GDC.FreshPots.Entities;
using GDC.FreshPots.Data;

namespace GDC.FreshPots.Business
{
    public class PotTypeBL
    {
        //Holds the logic to get the specific Coffee Status based on it's id
        //Params: statusId string
        //Returns: PotType object
        public static List<CoffeeType> GetTypeById(string typeId)
        {
            using (var repo = new CoffeeTypeRepo())
            {
                return repo.ById(typeId).ToList();
            }
        }
        /*
         * Add the input coffee type to the database
         * */
        public static void PostCoffeeType(string type)
        {
            try
            {
                using (var repo = new CoffeeTypeRepo())
                {
                    DateTime dt = DateTime.Now;
                    CoffeeType newType = repo.CreateInstance();
                    newType.TextValue = type;
                    newType.AuditModifiedDate = dt;
                    newType.Id = getNextID();
                    repo.Save();
                }
            }
            //an exception will be thrown if there is already a coffee type with that name
            catch (Exception e)
            {
                e.ToString();
            }
        }
        /*
         * Returns the next available number that can be used for an ID
         * */
        private static short getNextID()
        {
            short lastID = 0;
            using (var pots = new CoffeeTypeRepo())
            {
                var coffeeTypeRecords = pots.All().ToList();
                foreach (var record in coffeeTypeRecords)
                {

                    if (record.Id > lastID + 1)
                    {
                        return (short)(lastID + 1);
                    }
                    else
                    {
                        lastID = record.Id;
                    }
                }
            }
            return (short) (lastID+1);
        }
        /*
         * Removes the input coffee type from the DB
         * */
        public static List<CoffeeType> DeleteCoffeeType(string type)
        {
            using (var repo = new CoffeeTypeRepo())
            {
                repo.Delete(repo.ByText(type).ToList());
                repo.Save();
                return repo.All().ToList();
            }

        }
        /*
         * Returns all coffee types as a list
         * */
        public static List<CoffeeType> GetAllCoffeeTypes()
        {
            using (var repo = new CoffeeTypeRepo())
            {
                return repo.GetAll().ToList();
            }
        }

    }
}
