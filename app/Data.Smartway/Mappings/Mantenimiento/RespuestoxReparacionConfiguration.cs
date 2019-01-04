
using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.TYS.Mappings.Seguimiento
{
    public class RespuestoxReparacionConfiguration : EntityTypeConfiguration<RepuestoxReparacion>
    {
        public RespuestoxReparacionConfiguration()
            : base()
        {
            ToTable("mantenimiento.repuestoxreparacion");
            HasKey(p => p.idrepuestoreparacion);
        }
    }
}
