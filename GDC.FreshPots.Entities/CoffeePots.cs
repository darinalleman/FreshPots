using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Text;
using System.Data.Linq.Mapping;

namespace GDC.FreshPots.Entities
{
    //This class represents a CoffeePot record
    [Serializable]
    [DataContract]
    [Table(Name = "CoffeePot")]
    public class CoffeePots
    {
        [Column(IsPrimaryKey = true)]
        [DataMember]
        public byte Id { get; set; }
        [Column]
        [DataMember]
        public Int16 PotLocationId { get; set; }
        [Column]
        [DataMember]
        public Int16 PotStatusId { get; set; }
        [Column]
        [DataMember]
        public Int16 CoffeeTypeId { get; set; }
        [Column]
        [DataMember]
        public Int16 SiteId { get; set; }
        [Column]
        [DataMember]
        public DateTime AuditModifiedDate { get; set; }
    }
}
