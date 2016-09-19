using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GDC.FreshPots.Data;
using GDC.FreshPots.Entities;
using GDC.FreshPots.Business;
using GDC.FreshPots.Common;

namespace GDC.FreshPots.Business
{
    public class CoffeePotBL
    {
        //Holds the logic to get all of the Coffee information of all the coffee pots.
        //Pararms: 
        //Returns: CoffeePotView object(if found), NULL object(if not found)
        public static List<CoffeePotView> GetAllCoffeeInfo()
        {
            try
            {
                using (var repo = new CoffeePotViewRepo())
                {
                    return repo.All().ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /**
        * Returns a list of only pots that are in the input param site
        **/
        public static List<CoffeePotView> GetInfoBySite(int site)
        {
            try
            {
                using (var repo = new CoffeePotViewRepo())
                {
                    return repo.FindAll(x => x.SiteId == site).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Holds the logic to update all of the Coffee information in all coffee pots.
        //Pararms: 
        //Returns: CoffeePotView object(if found), NULL object(if not found)
        public static void PostCoffeeInfoById(CoffeePotView CoffeePot)
        {
            try
            {  
                using (var Potrepo = new SqlRepo<CoffeePots>())
                {
                    //Finds the CoffeePot record with the Id equal to the passed in CoffeePot Id value
                    var ModifyPotRepo = Potrepo.FindAll(x => x.Id == CoffeePot.Id);
                    using (var Typerepo = new SqlRepo<CoffeeType>())
                    {
                        //Finds the CoffeeType record where TextValue equals the user selected TypeTextValue
                        var repo = Typerepo.FindAll(x => x.TextValue == CoffeePot.TypeTextValue);
                        //Modifies the CoffeePots record to reassign a new value to CoffeeTypeId
                        ModifyPotRepo.First().CoffeeTypeId = repo.First().Id;
                        ModifyPotRepo.First().PotStatusId = CoffeePot.StatusId;
                    }
                    //checks if pot is new or old from updatetime and decides how to update time
                    //update time is true if the pot is new, but if the pot is just being moved around,
                    //it's false so that the auditmodified date that is passed in stays with the pot
                    if (CoffeePot.UpdateTime != true)
                    {
                        ModifyPotRepo.First().AuditModifiedDate = CoffeePot.AuditModifiedDate;
                    }
                    else
                    {
                        ModifyPotRepo.First().AuditModifiedDate = DateTime.Now;
                    }
                    //Attempts to save the modifications made
                    try
                    {
                        Potrepo.Save();
                    }
                    catch (Exception e)
                    {
                        //Writes the Exception to the log for users to see
                        Log.Write("Business.CoffeePotBL.PostCoffeeInfoById", e.ToString());
                    }
                }   
            }
            catch (InvalidOperationException e )
            {
                Log.Write("Error: CoffeePotBL Post" , e.ToString());
            }
        }
    }

}