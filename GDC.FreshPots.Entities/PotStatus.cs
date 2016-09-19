using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Text;
using System.Data.Linq.Mapping;

namespace GDC.FreshPots.Entities
{
    //This class represents a PotStatus record
    [Serializable]
    [DataContract]
    [Table(Name = "PotStatus")]
    public class PotStatus
    {
        [Column(IsPrimaryKey = true)]
        [DataMember]
        public Int16 Id { get; set; }
        [Column]
        [DataMember]
        public string TextValue { get; set; }
        [Column]
        [DataMember]
        public DateTime AuditModifiedDate { get; set; }
    }
}
