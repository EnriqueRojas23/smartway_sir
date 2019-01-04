using Domain.Smartway.Inventario;
using Domain.Smartway.Reparacion;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class DocumentoRecepcionDetalleConfiguration : EntityTypeConfiguration<DocumentoRecepcionDetalle>
    {
        public DocumentoRecepcionDetalleConfiguration()
            : base()
        {
            ToTable("recepcion.DocumentoRecepcionDetalle");
            HasKey(p => p.iddocumentorecepciondetalle);
        }
    }
}
