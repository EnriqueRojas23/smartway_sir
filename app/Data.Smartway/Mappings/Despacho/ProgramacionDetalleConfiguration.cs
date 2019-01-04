

using Domain.Smartway.Despacho;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class ProgramacionDetalleConfiguration : EntityTypeConfiguration<ProgramacionDetalle>
    {
        public ProgramacionDetalleConfiguration()
            : base()
        {
            ToTable("despacho.programaciondetalle");
            HasKey(p => p.idprogramaciondetalle);
            //Property(p => p.idcliente).IsRequired();
        }
    }
}
