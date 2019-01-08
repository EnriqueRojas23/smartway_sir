

using Domain.Smartway.Facturacion;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Facturacion
{
   
    public class ComprobanteClienteConfiguration : EntityTypeConfiguration<ComprobanteCliente>
    {
        public ComprobanteClienteConfiguration()
            : base()
        {
            ToTable("facturacion.comprobantecliente");
            HasKey(p => p.iddocumentocompra);
            //Property(p => p.idcliente).IsRequired();
        }
    }
}
