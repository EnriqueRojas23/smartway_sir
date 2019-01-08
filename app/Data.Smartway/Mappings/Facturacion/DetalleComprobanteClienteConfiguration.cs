

using Domain.Smartway.Facturacion;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Facturacion
{
   
    public class DetalleComprobanteClienteConfiguration : EntityTypeConfiguration<DetalleComprobanteCliente>
    {
        public DetalleComprobanteClienteConfiguration()
            : base()
        {
            ToTable("facturacion.detallecomprobantecliente");
            HasKey(p => p.iddetallecomprobantecliente);
            //Property(p => p.idcliente).IsRequired();
        }
    }
}
