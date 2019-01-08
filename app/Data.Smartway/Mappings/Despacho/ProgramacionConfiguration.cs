

using Domain.Smartway.Despacho;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class ProgramacionConfiguration : EntityTypeConfiguration<Programacion>
    {
        public ProgramacionConfiguration()
            : base()
        {
            ToTable("despacho.programacion");
            HasKey(p => p.idprogramacion);
            //Property(p => p.idcliente).IsRequired();
        }
    }
}
