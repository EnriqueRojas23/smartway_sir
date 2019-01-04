

using Domain.Smartway.Agendamiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Agendamiento
{
    public class LibroReclamacionConfiguration : EntityTypeConfiguration<LibroReclamaciones>
    {
        public LibroReclamacionConfiguration()
            : base()
        {
            ToTable("agendamiento.libroreclamaciones");
            HasKey(p => p.idreclamo);
          //  Property(p => p.idincidencia).IsRequired();
        }
    }
}
