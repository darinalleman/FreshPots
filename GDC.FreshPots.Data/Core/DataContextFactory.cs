using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using System.Configuration;

namespace GDC.FreshPots.Data
{
    public class DataContextFactory
    {
        // connection string used for a SQL data store if a configuration file is not available.
        //const string DEFAULT_SQL_CONNECTION = "Data Source=10.5.83.130;Initial Catalog=A2;Persist Security Info=True;User ID=a2_web;Password=***********";
        //String Just used as a placeholder until Database is created.
        

       
        // key to locate configurable SQL connection string.
        const string SQL_CONNECTION_KEY = "FreshPotsKey";

      
        /// Returns connection string for the SQL data store.
          
        public static string GetSqlConnString()
        {
            var cs = ConfigurationManager.ConnectionStrings[SQL_CONNECTION_KEY];
            // if connection string isn't found, return the default.

            return (cs != null) ? cs.ToString() : "";
        }

        /// <summary>
        /// Returns context for querying an SQL data store.
        /// </summary>
        /// <returns>DataContext</returns>
        public static DataContext GetSqlContext()
        {
            var cs = DataContextFactory.GetSqlConnString();
            return new DataContext(cs);
        }

        /// <summary>
        /// Returns context for querying a mySql data store.
        /// </summary>
        /// <returns>DataContext</returns>
        public static DataContext GetMySqlContext()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Returns context for querying an XML data store.
        /// </summary>
        /// <returns>DataContext</returns>
        public static DataContext GetXmlContext()
        {
            throw new NotImplementedException();
        }
    }
}
