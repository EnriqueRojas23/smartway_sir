using System.Collections.Generic;

namespace Seguridad.Common
{
    public interface IPerfil
    {
        int? IdPerfil { get; set; }

        string NombrePerfil { get; set; }

        List<MenuOpcion> ListaMenuOpcion { get; set; }
    }
}
