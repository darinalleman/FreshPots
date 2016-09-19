using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Text;
using System.Data.Linq.Mapping;
//using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;

namespace GDC.FreshPots.Entities
{
    //This class represents a CoffeePotInfo record
    [Serializable]
    [DataContract]
    [Table(Name = "CoffeePotInfo")]
    public class CoffeePotView  //: Microsoft.AspNet.SignalR.Hub --> not needed
    {
        [JsonProperty("Id")]
        [Column]
        [DataMember]
        public byte Id { get; set; }
        [Column]
        [DataMember]
        [JsonProperty("TypeTextValue")]
        public string TypeTextValue { get; set; }
        [Column]
        [DataMember]
        [JsonProperty("LocationId")]
        public Int16 LocationId { get; set; }
        [Column]
        [DataMember]
        [JsonProperty("StatusId")]
        public Int16 StatusId { get; set; }
        [Column]
        [DataMember]
        [JsonProperty("AuditModifiedDate")]
        public DateTime AuditModifiedDate { get; set; }
        [Column]
        [DataMember]
        [JsonProperty("SiteId")]
        public Int16 SiteId { get; set; }
        [DataMember]
        [JsonProperty("UpdateTime")]
        public Boolean UpdateTime { get; set; }
    }
}
