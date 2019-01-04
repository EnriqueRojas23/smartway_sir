using Domain.Smartway.Inventario;
using Domain.Smartway.Reparacion;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class DocumentoRecepcionConfiguration : EntityTypeConfiguration<DocumentoRecepcion>
    {
        public DocumentoRecepcionConfiguration()
            : base()
        {
            ToTable("recepcion.DocumentoRecepcion");
            HasKey(p => p.iddocumentorecepcion);
        }
    }
}
