

using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Mantenimiento
{
   
    public class ClienteConfiguration : EntityTypeConfiguration<Cliente>
    {
        public ClienteConfiguration()
            : base()
        {
            ToTable("mantenimiento.cliente");
            HasKey(p => p.idcliente);
            //Property(p => p.idcliente).IsRequired();
        }
    }
}
