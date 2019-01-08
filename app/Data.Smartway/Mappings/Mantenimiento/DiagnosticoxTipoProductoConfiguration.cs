
using Domain.TYS.Seguimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.TYS.Mappings.Seguimiento
{
    public class DiagnosticoxTipoProductoConfiguration : EntityTypeConfiguration<DiagnosticoxTipoProducto>
    {
        public DiagnosticoxTipoProductoConfiguration()
            : base()
        {
            ToTable("mantenimiento.diagnosticoxtipoproducto");
            HasKey(p => p.iddiagnosticotipoproducto);
            
        }
    }
}
