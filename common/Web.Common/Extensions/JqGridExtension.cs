
namespace Web.Common.Extensions
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.ComponentModel;
    using System.Data;
    using System.Linq.Dynamic;
    using System.Web;
    using System.Web.Mvc;
    using System.Linq;

    public class JqGridExtension<T>
    {
        private IEnumerable<T> _datasource;

        public JsonResult DataBind(IEnumerable<T> datasource, int total)
        {
            _datasource = datasource;

            var request = HttpContext.Current.Request;
            var parameters = new ParameterGridDefault();

            if (request.RequestType == "POST"){
                parameters.page = Convert.ToInt32(request.Form["page"]);
                parameters.rows = Convert.ToInt32(request.Form["rows"]);
                parameters.sidx = request.Form["sidx"];
                parameters.sord = request.Form["sord"];
            }
            else {
                parameters.page = Convert.ToInt32(request.QueryString["page"]);
                parameters.rows = Convert.ToInt32(request.QueryString["rows"]);
                parameters.sidx = request.QueryString["sidx"];
                parameters.sord = request.QueryString["sord"];
            }

            return this.FilterDataSource(total, parameters);
        }

        private JsonResult FilterDataSource(int total, ParameterGridDefault parameters)
        {
            //var orderGrid = true;
            //var iqueryable = _datasource; //as IEnumerable; //IQueryable;
    
            var num3 = total;
            parameters.total = total;
            var totalPageCount = (int)Math.Ceiling((float)num3 / (float)parameters.rows);


            IQueryable iqueryable = _datasource.AsQueryable(); //(_datasource as IQueryable);
            //.Skip(parameters.rows * (parameters.page - 1))
            //.Take(parameters.rows); 

            if (!string.IsNullOrEmpty(parameters.sidx))
            {
                var text5 = string.Empty;
                if (parameters.sidx != null && parameters.sidx == " ")
                {
                    parameters.sidx = string.Empty;
                }
                if (!string.IsNullOrEmpty(parameters.sidx))
                {
                    //if (!text5.EndsWith(","))
                    //{
                    //   // text5 += ",";
                    //}
                    text5 = text5 + parameters.sidx + " " + parameters.sord;
                }
               iqueryable = iqueryable.OrderBy(text5, new object[0]);
               
            }
            var iqueryablepaging = iqueryable.Skip(parameters.rows * (parameters.page - 1)).Take(parameters.rows);

            var dataTable = iqueryablepaging.ToDataTable<T>();
            var response2 = new JsonResponse(parameters.page, totalPageCount, num3, parameters.rows, dataTable.Rows.Count, null);
            var res = Util.ConvertToJson(response2, dataTable);
            return res;

        }

    }

    public class ParameterGridDefault
    {
        public int page { get; set; }
        public int rows { get; set; }
        public string sidx { get; set; }
        public string sord { get; set; }
        public int total { get; set; }
    }

    internal static class Util
    {
        internal static JsonResult ConvertToJson(JsonResponse response, DataTable dt)
        {
            var jsonResult = new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet};
            //if (response.records == 0) jsonResult.Data = new object[0];
            //else jsonResult.Data = PrepareJsonResponse(response, dt);
            var response_data = response.records == 0 ? response : PrepareJsonResponse(response, dt); 

            var jsonData = new
            {
                total = response_data.total,
                page = response_data.page,
                records = response_data.records,
                rows = response_data.rows 
            };

            jsonResult.Data = jsonData;
            return   jsonResult;
        }

        private static JsonResponse PrepareJsonResponse(JsonResponse response, DataTable dt)
        {
            
            for (var i = 0; i < dt.Rows.Count; i++)
            {
                var array = new Dictionary<string, object>(); 
                for (var j = 0; j < dt.Columns.Count; j++)
                {
                    var ordinal = dt.Columns[j].Ordinal;
                    array.Add(dt.Columns[j].ColumnName, dt.Rows[i].ItemArray[ordinal].ToString());

                }
                response.rows[i] = array;

            }
            return response;
        }
    }


    internal class JsonResponse
    {
        public int page { get; set; }

        public int total { get; set; }

        public int records { get; set; }

        public object[] rows { get; set; } //JsonRow[] rows { get; set; }

       // public Hashtable userdata { get; set; }

        public JsonResponse(
            int currentPage,
            int totalPageCount,
            int totalRowCount,
            int pageSize,
            int actualRows,
            Hashtable userData)
        {
            page = currentPage;
            total = totalPageCount;
            records = totalRowCount;
            rows = new object[actualRows]; //new Dictionary<string, object>(); //new JsonRow[actualRows];
            //userdata = userData;
        }


    }

    ////internal class JsonRow
    ////{
    ////    public string id;
    ////    public object[] cell { get; set; }
    ////}
    
    internal static class IEnumerableExtensions
    {
        public static DataTable ToDataTable<T>(this IEnumerable data)
        {
            PropertyDescriptorCollection props = TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();

            for (int i = 0; i < props.Count; i++)
            {
                PropertyDescriptor prop = props[i];
                //table.Columns.Add(prop.Name, prop.PropertyType);
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            }
            object[] values = new object[props.Count];
            foreach (T item in data)
            {
                for (int i = 0; i < values.Length; i++)
                {
                    values[i] = props[i].GetValue(item);
                }
                table.Rows.Add(values);

            }
            return table;
        }
    }
}
