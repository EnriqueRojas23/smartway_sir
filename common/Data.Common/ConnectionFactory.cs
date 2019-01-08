

using Data.Common.DbConnectionFactories;
using System;
using System.Configuration;
using System.Data.SqlClient;
namespace Data.Common
{
    public class ConnectionFactory
    {
        ////public static SqlConnection CreateDefault()
        ////{
        ////    var connection = new SqlConnection(DefaultConnectionFactory.DefaultConnectionString);
        ////    try
        ////    {
        ////        connection.Open();
        ////        return connection;
        ////    }
        ////    catch (Exception)
        ////    {
        ////        connection.Close();
        ////        connection.Dispose();
        ////        throw;
        ////    }
        ////}

        public static SqlConnection CreateFromSecuriSmartwayession()
        {
            var connection = new SqlConnection(DefaultConnectionFactory.DefaultConnectionString);
            try
            {
                connection.Open();
                return connection;
            }
            catch (Exception)
            {
                connection.Close();
                connection.Dispose();
                throw;
            }


        }
        public static SqlConnection CreateFromUserSession()
        {
            var connection = new SqlConnection(UserSessionConnectionFactory.UserSessionConnectionString);
            try
            {
                connection.Open();
                return connection;
            }
            catch (Exception)
            {
                connection.Close();
                connection.Dispose();
                throw;
            }

        }

        public static SqlConnection CreateFromUserERPOfilogiSession()
        {
            var connection = new SqlConnection(UserSessionConnectionFactory.UserERPOfilogiSessionConnectionString);
            try
            {
                connection.Open();
                return connection;
            }
            catch (Exception)
            {
                connection.Close();
                connection.Dispose();
                throw;
            }
        }

        public static SqlConnection CreateFromUserERPOfiventSession()
        {
            var connection = new SqlConnection(UserSessionConnectionFactory.UserERPOfiventSessionConnectionString);
            try
            {
                connection.Open();
                return connection;
            }
            catch (Exception)
            {
                connection.Close();
                connection.Dispose();
                throw;
            }
        }
    }
}
