using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using GDC.FreshPots.Entities;
using GDC.FreshPots.Data;
using GDC.FreshPots.Business;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using System.Net.Http;
using System.Threading;

[HubName("FreshPotHub")]
    public class FreshPotHub : Microsoft.AspNet.SignalR.Hub
    {
        [HubMethodName("FindSiteID")]
        public int FindSiteID(String site, int floorId)
        {
           return CoffeeSiteBL.findSiteID(site, floorId);
        }
        [HubMethodName("FindSiteTextValue")]
        public string FindSiteTextValue(int siteId)
        {
            return CoffeeSiteBL.findSiteTextValue(siteId);
        }

        [HubMethodName("JoinSite")]
        public Task JoinSite(int siteId)
        {
            return this.Groups.Add(this.Context.ConnectionId, siteId.ToString());
        }

        [HubMethodName("GetListOfTypeBrewed")]
        public List<Site> GetListOfTypeBrewed(string type)
        {
            List<CoffeePotView> allPots = CoffeePotBL.GetAllCoffeeInfo();
            List<Site> sitesWithType = new List<Site>();
            foreach (CoffeePotView pot in allPots)
            {
                if (pot.TypeTextValue.Trim().Equals(type.Trim()))
                {
                    sitesWithType.Add(CoffeeSiteBL.GetAllCoffeeSites().Find(x => x.Id == pot.SiteId));
                }
            }
            return sitesWithType;
        }
        
        /**
         * All methods that deal with pots
         * */
        private void Broadcast(int siteId)
        {
            Clients.Group(siteId.ToString()).ReceivePots(CoffeePotBL.GetInfoBySite(siteId));
        }
        [HubMethodName("UpdatePot")]
        public void UpdatePot(CoffeePotView pot, int siteId)
        {
            CoffeePotBL.PostCoffeeInfoById(pot);
            Broadcast(siteId);
        }
        /*
         * All methods that deal with coffeetypes
         * */
        private void BroadcastType()
        {
            Clients.All.ReceiveTypes(PotTypeBL.GetAllCoffeeTypes());
        }
        [HubMethodName("AddCoffeeType")]
        public void AddCoffeeType(string newType)
        {
            PotTypeBL.PostCoffeeType(newType);
            BroadcastType();
        }
        [HubMethodName("DeleteCoffeeType")]
        public void DeleteCoffeeType(string type)
        {
            PotTypeBL.DeleteCoffeeType(type);
            BroadcastType();
        }

        /*
         * All methods that deal with sites
         * */
        [HubMethodName("AddSite")]
        public void AddSite(Site site)
        {
            CoffeeSiteBL.PostCoffeeSite(site);
            BroadcastSite();
        }

        [HubMethodName("DeleteSite")]
        public void DeleteSite(string abbr, int floorId)
        {
            CoffeeSiteBL.DeleteCoffeeSite(FindSiteID(abbr, floorId));
            BroadcastSite();
        }
        private void BroadcastSite()
        {
            Clients.All.ReceiveSites();
        }
    }




