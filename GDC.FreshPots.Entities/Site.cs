using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Text;
using System.Data.Linq.Mapping;

namespace GDC.FreshPots.Entities
{
        //This class represents a Site record
        [Serializable]
        [DataContract]
        [Table(Name = "Site")]
        public class Site
        {
            [Column(IsPrimaryKey = true)]
            [DataMember]
            public Int16 Id { get; set; }
            [Column]
            [DataMember]
            public DateTime AuditModifiedDate { get; set; }
            [Column]
            [DataMember]
            public string SiteTextValue { get; set; }
            [Column]
            [DataMember]
            public Int16 FloorId { get; set; }
            [Column]
            [DataMember]
            public string Abbreviation { get; set; }


        }
}
