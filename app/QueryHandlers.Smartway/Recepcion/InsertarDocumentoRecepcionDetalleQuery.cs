
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Recepcion.Parameters;
using QueryContracts.TYS.Monitoreo.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
namespace QueryHandlers.TYS.Monitoreo
{
    public class InsertarDocumentoRecepcionDetalleQuery : IQueryHandler<InsertarDocumentoRecepcionDetalleParameter>
    {

        public QueryResult Handle(InsertarDocumentoRecepcionDetalleParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                DataTable dt = crear_DataTable("recepcion.documentorecepciondetalle");

                var objDetalles = parameters.Hits;
                foreach (var item in objDetalles)
                {
                    DataRow dr = dt.NewRow();
                    dr["caja"] = item.caja;
                    dr["cantidad"] = item.cantidad;
                    dr["fechahorapersonalizacion"] = item.fechahorapersonalizacion;
                    dr["fila"] = item.fila;
                    dr["iddocumentorecepcion"] = item.iddocumentorecepcion;
                    dr["idmodelo"] = item.idmodelo;
                    dr["idproducto"] = item.idproducto;
                    dr["idtipoproducto"] = item.idtipoproducto;
                    dr["idusuariopersonalizacion"] = item.idusuariopersonalizacion;
                    dr["imei"] = ( item.imei == null? "" : item.imei);
                    dr["mac"] = (item.mac == null ? "" : item.mac); 
                    dr["numeropallet"] = (item.numeropallet == null ? "" : item.numeropallet);  
                    dr["repuesto"] = item.repuesto;
                    dr["serie"] = (item.serie == null ? "" : item.serie);
                    dr["idalmacen"] = item.idalmacen;
                    dt.Rows.Add(dr);
                }

                using (SqlBulkCopy s = new SqlBulkCopy(connection))
                {
                    s.DestinationTableName = dt.TableName;

                    foreach (var column in dt.Columns)
                    {
                        s.ColumnMappings.Add(column.ToString(), column.ToString());
                    }

                    s.WriteToServer(dt);
                }
                var result = new InsertarDocumentoRecepcionDetalleResult { respuesta = true };
                return result;
            }
        }
        private static DataTable crear_DataTable(string tabla)
        {

            DataTable dt = new DataTable(tabla);

            DataColumn iddocumentorecepciondetalle = new DataColumn();
            iddocumentorecepciondetalle.DataType = Type.GetType("System.Int64");
            iddocumentorecepciondetalle.ColumnName = "iddocumentorecepciondetalle";
            dt.Columns.Add(iddocumentorecepciondetalle);


            DataColumn iddocumentorecepcion = new DataColumn();
            iddocumentorecepcion.DataType = Type.GetType("System.Int64");
            iddocumentorecepcion.ColumnName = "iddocumentorecepcion";
            dt.Columns.Add(iddocumentorecepcion);


            DataColumn numeropallet = new DataColumn();
            numeropallet.DataType = Type.GetType("System.String");
            numeropallet.ColumnName = "numeropallet";
            dt.Columns.Add(numeropallet);

         

            DataColumn caja = new DataColumn();
            caja.DataType = Type.GetType("System.String");
            caja.ColumnName = "caja";
            dt.Columns.Add(caja);

            DataColumn repuesto = new DataColumn();
            repuesto.DataType = Type.GetType("System.Boolean");
            repuesto.ColumnName = "repuesto";
            dt.Columns.Add(repuesto);

            DataColumn idtipoproducto = new DataColumn();
            idtipoproducto.DataType = Type.GetType("System.Int32");
            idtipoproducto.ColumnName = "idtipoproducto";
            dt.Columns.Add(idtipoproducto);


            DataColumn fila = new DataColumn();
            fila.DataType = Type.GetType("System.String");
            fila.ColumnName = "fila";
            dt.Columns.Add(fila);


            DataColumn idproducto = new DataColumn();
            idproducto.DataType = Type.GetType("System.Int32");
            idproducto.ColumnName = "idproducto";
            dt.Columns.Add(idproducto);

            DataColumn serie = new DataColumn();
            serie.DataType = Type.GetType("System.String");
            serie.ColumnName = "serie";
            dt.Columns.Add(serie);

            DataColumn imei = new DataColumn();
            imei.DataType = Type.GetType("System.String");
            imei.ColumnName = "imei";
            dt.Columns.Add(imei);

            DataColumn idmodelo = new DataColumn();
            idmodelo.DataType = Type.GetType("System.String");
            idmodelo.ColumnName = "idmodelo";
            dt.Columns.Add(idmodelo);

            DataColumn mac = new DataColumn();
            mac.DataType = Type.GetType("System.String");
            mac.ColumnName = "mac";
            dt.Columns.Add(mac);

            DataColumn cantidad = new DataColumn();
            cantidad.DataType = Type.GetType("System.Int32");
            cantidad.ColumnName = "cantidad";
            dt.Columns.Add(cantidad);




            DataColumn fechahorapersonalizacion = new DataColumn();
            fechahorapersonalizacion.DataType = Type.GetType("System.DateTime");
            fechahorapersonalizacion.ColumnName = "fechahorapersonalizacion";
            dt.Columns.Add(fechahorapersonalizacion);

            DataColumn idusuariopersonalizacion = new DataColumn();
            idusuariopersonalizacion.DataType = Type.GetType("System.Int32");
            idusuariopersonalizacion.ColumnName = "idusuariopersonalizacion";
            dt.Columns.Add(idusuariopersonalizacion);


            DataColumn idalmacen = new DataColumn();
            idalmacen.DataType = Type.GetType("System.Int32");
            idalmacen.ColumnName = "idalmacen";
            dt.Columns.Add(idalmacen);




            return dt;
        }
    }
}
