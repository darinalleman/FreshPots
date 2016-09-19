using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Data;

namespace GDC.FreshPots.Data
{
    public class Sql
    {
        public class Sproc
        {
            public static void ExecuteScalar(String sprocName, List<SqlParameter> parms) 
            {
                var cs = DataContextFactory.GetSqlConnString();
                 using (SqlConnection conn = new SqlConnection(cs))
                {                    
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sprocName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        foreach (var parm in parms)
                        {
                            cmd.Parameters.Add(parm);
                        }

                        cmd.ExecuteScalar();
                    }
                }
            }

            public static void ExecuteScalar(String sprocName, SqlParameter parm) 
            {
                var cs = DataContextFactory.GetSqlConnString();
                using (SqlConnection conn = new SqlConnection(cs))
                {                    
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sprocName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(parm);                        
                        cmd.ExecuteScalar();
                    }
                }
            }

            public static int Execute(String sprocName, List<SqlParameter> parms)
            {
                var cs = DataContextFactory.GetSqlConnString();
                using (SqlConnection conn = new SqlConnection(cs))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(sprocName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        foreach (var parm in parms)
                        {
                            cmd.Parameters.Add(parm);
                        }

                        return (int)cmd.ExecuteScalar();
                    }
                }
            }

        }

    }
}
