using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GDC.FreshPots.Entities;
using GDC.FreshPots.Data;
using GDC.FreshPots.Data.Repositories;

namespace GDC.FreshPots.Business
{
    public class CoffeeSiteBL
    {
        /*
         * Returns a list of all Sites as site objects
         * */
        public static List<Site> GetAllCoffeeSites()
        {
            using (var repo = new SiteRepo())
            {
                return repo.All().ToList();
            }
        }
        /*
         * Finds the site ID where the input site abbreviation and floor id match.
         * */
        public static int findSiteID(string siteAbbr, int floorId)
        {
            using (var repo = new SiteRepo())
            {
                siteAbbr = siteAbbr.ToUpper();
                //find all sites where the abbreviation matches, save that
                var repoAbbr = repo.FindAll(x => x.Abbreviation.Trim() == siteAbbr).ToList();
                //find all sites (using the list of sites where the abbrev matches) where the floor matches
                var repoFloor = repoAbbr.FindAll(x => x.FloorId == floorId).ToList();
                //there can only be one, so return its Id
                return repoFloor.First().Id;                
            }            
        }
        /*
         * Add a new record to the Site table in the DB
         * The DB has a trigger to create 3 new pots per site, so you don't need to worry about that
         * */
        public static void PostCoffeeSite(Site s)
        {
           try
           {
               using (var repo = new SiteRepo())
               {
                   System.Diagnostics.Debug.WriteLine(s.SiteTextValue);
                   DateTime dt = DateTime.Now;
                   Site newSite = repo.CreateInstance();
                   newSite.Id = getNextID();
                   newSite.Abbreviation = s.Abbreviation;
                   newSite.AuditModifiedDate = dt;
                   newSite.SiteTextValue = s.SiteTextValue;
                   newSite.FloorId = s.FloorId;
                   repo.Save();
               }
           }
           //an exception will be thrown if there is already a coffee type with that name
           catch (Exception e)
           {
               e.ToString();
           }
        }
        /*
         * Delete a record given the ID to delete
         * Don't worry about deleting the related pots, there is also and SQL trigger that will take care of that
         * */
        public static List<Site> DeleteCoffeeSite(int Id)
        {
            using (var repo = new SiteRepo())
            {
                repo.Delete(repo.ById(Id.ToString()).ToList());
                repo.Save();
                return repo.All().ToList();
            }
        }
        /*
         * Returns the next available ID in the site table
         * */
        private static short getNextID()
        {
            short lastID = 0;
            using (var pots = new SiteRepo())
            {
                var siteList = pots.All().ToList();
                foreach (var site in siteList)
                {

                    if (site.Id > lastID + 1)
                    {
                        return (short)(lastID + 1);
                    }
                    else
                    {
                        lastID = site.Id;
                    }
                }
            }
            return (short)(lastID + 1);
        }

        public static string findSiteTextValue(int siteId)
        {
            using (var repo = new SiteRepo())
            {
                Site site = repo.FindAll(x => x.Id == siteId).ToList().First();
                string siteTextValue = site.SiteTextValue;
                int floorId = site.FloorId;

                return siteTextValue.Trim() + " Floor " + floorId;
            }
        }
    }
}