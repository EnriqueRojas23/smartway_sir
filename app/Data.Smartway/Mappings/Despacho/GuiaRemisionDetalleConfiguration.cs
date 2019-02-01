

using Domain.Smartway.Despacho;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class GuiaRemisionDetalleConfiguration : EntityTypeConfiguration<GuiaRemisionDetalle>
    {
        public GuiaRemisionDetalleConfiguration()
            : base()
        {
            ToTable("despacho.guiaremisiondetalle");
            HasKey(p => p.idguiadetalle);
        }
    }
}
