using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Web.Smartway.DataAccess
{
    public sealed class Constantes
    {
        public sealed class Seguridad 
        {
            public sealed class Usuario 
            {
                public const string listadopedido_filtro_aliasusuario = "ALIAS";
                public const string listadopedido_filtro_nombrecompleto = "NOMBRE";
                public const string listadopedido_filtro_rol = "ROL";
            }

            public sealed class Rol
            {
                public const string listadorol_filtro_nombrerol = "NOMBRE";
            }
        }

        public static string GetModuleAcronym()
        {
            if (ConfigurationManager.AppSettings["ModuleAcronym"] == null) throw new ArgumentException("No esta configurado el ModuleAcronym en el archivo de configuración.");
            var res = Convert.ToString(ConfigurationManager.AppSettings["ModuleAcronym"]);
            return res;
        }
        public enum EstadoIncidencia : int
        {
            EnProceso = 14,
            Anulada = 15,
            Cerrada = 16
        }
        public enum EstadoGuiaRemision : int
        {
            PendienteProgramacion = 31,
            Programada = 32,
            Despachado = 33,
            Recepcionada = 34
        }


        public enum Propuesta
        {
            rechazada = 5
        }
        public enum EstadoDespacho
        {
            programada = 49,
            anulada = 50,
            despachada = 51

        }
        public enum Scanear : int
        {
            Serie = 137,
            SerieImei = 138,
            SerieImeiMac = 139,
            Mac = 140,
            Imei = 163

        }
        public enum tipoordenservicio
        {
            ost = 10,
            osr = 11,
            osp = 497,
        }

        public enum TipoProducto
        {
            POS = 1,
            PINPAD = 2,
            CELULAR = 3,
            TABLET = 4,
            PHABLET = 5,
            LAPTOP = 6,
            DESKTOP = 7,
            MONITOR = 8,
            TELEVISOR = 9,
            PARLANTE = 10,
            TORNAMESA = 11,
            AUDIFONO = 12,
            MODEM = 13,
            LICUADORA = 14,
            LAVADORA = 15,
            REFRIGERADORA = 16,
            FRIOBAR = 17,
            VENTILADOR = 18,
            SECADORA = 19,
            COCINA = 20,
            DVD = 21,
            DVDPORTATIL = 22,
            BLURAY = 23,
            IMPRESORA = 24,
            FOTOCOPIADORA = 25,
            SCANER = 26,
            DVR = 27,
            CAMARAIP = 28,
            JUGUETES = 29,
            MICROHONDA = 30,
            MICROFONO = 31,
            BATERIAEXTERNA = 32,
            PROYECTOR = 33,
            OTROS = 34,
            CARCAZA = 35,
            DISPLAY = 36,
            LECTORDEBANDAMAGNETICA = 39,
            PLACAPRINCIPAL = 40,
            SOFTWARE = 41,
            GENERAL = 42,
            GSMGPRSCDMA = 43,
            TACTIL = 44,
            LECTORDETARJETAINTELIGENTE = 45,
            ALTAVOZ = 46,
            WIFI = 48,
            MOTOR = 49,
            TECLADO = 50,
            MICROFO = 51,
            ANTENA = 52,
            CABLE = 53,
            ADAPTADOR = 54,
            BATERIA = 55,
            SLOTCARGA = 56,
            PINDECARGA = 57,
            SLOTSIM = 58,
            SLOTMICROSD = 59,
            BOTON = 60,
            FLEXIBLE = 61,
            PLACAELECTRONICAFRONTAL = 62,
            COMPONENTESELECTRÓNICOS = 63,
            LENTEOPTICO = 64,
            AURICULAR = 65,
            ESTUCHE = 67,
            MICA = 68,
            FLASH = 70,
            LECTORDEHUELLA = 71,
            SENSOR = 72,
            MAGNETRON = 73,
            BANDEJA = 74,
            PUERTA = 75,
            HERRAMIENTA = 76,
            PANTALLACOMPLETA = 77,
            VIBRADOR = 78
        }

        public enum EstadoOrdenServicio
        {
            PendienteDespacho = 1,
            PendienteRecibirLaboratorio = 2,
            PendienteAsignacionTecnico = 3,
            PendienteInicioReparacion = 4,
            PendienteAprobacionReparacion = 5,
            EnProcesoReparacion = 6,
            PendienteEvaluacionEstado = 7,
            PendienteProcesoQC = 8,
            PendienteRecojo = 9,
            PendienteRecepcionSucursal = 10,
            PendienteEntregaCliente = 11,
            Cerrada = 12,
            Anulada = 13,
            EnProcesoCambioProducto = 61,
            PendienteCotizacion = 63,
            EnEsperaRespuestaCliente = 66,
            PendienteDespachoCliente = 67,
            PendienteRecojoDelivery = 71,

        }
        public enum EstadoCotizacion : int
        {
            PendienteAprobacion = 27,
            Rechazada   = 28,
            Aprobada = 29
        }
        public enum TipoGarantia : int
        {
            DOA = 1,
            Cliente = 2,
            DAP = 3,
            Reparacion = 4,
            SinGarantia = 5
        }
        public enum EstadoProducto :int
        {
            PendienteReparar = 41,
            Inoperativo = 43,
            Reparado = 44,
            Disponible = 45,
            Scrap = 46,
            SEEDSTOCK = 47,
            PendientePersonalizar = 48,
            NoDisponible = 68
        }


        public enum ConceptoFacturacion : int
        {
            Reparacion = 18,
            Venta = 19
        }
        public enum EstadoFacturacion : int
        {
            Facturado = 69,
            Anulado = 70
        }
        public enum Perfil : int
        {
            Admin = 2,
    
        }
        public enum SolucionIncidentes : int 
        {
            PendienteAprobacion = 1,
            Aprobada = 2,
            Rechazada = 3
        }
        public enum Etapa : int
        {
            Registro = 1 ,
            Evaluacion    =   2,
            Propuesta =  3  ,
            EstadoFisico    =   4 ,
        }
        public enum TipoDocumento : int
        {
            RUC = 13
          

        }
        public enum TipoMercaderia : int
        {
                Producto = 101
                ,Repuesto = 102


        }
        public enum TipoSolucion : int
        {
            ManejoInterno = 54,
            LibroReclamaciones = 55

        }
        public enum MaestroTablas : int
        {
            TipoUsuario = 1,
            TipoOrdenServicio = 2,
            TipoPago = 4,
            TipoEntidad = 5,
            CondicionRecojo = 6 ,
            CondicionEntrega = 7,
            Moneda = 3,
            Unidad = 7,
            TipoVehiculo = 8            ,
            TipoTarifa = 9            ,
            Muelle = 10            ,
            TipoDocumento = 11            ,
            Etapas = 12            ,
            NoConforme = 13            ,
            NoEntrega = 14            ,
            NivelReparacion = 15            ,
            ConceptoFormula = 17            ,
            MarcaVehiculo = 18            ,
            ModeloVehiculo = 19            ,
            TipoDocumentoCompra = 20            ,
            ColorVehiculo = 21            ,
            Banda = 22            ,
            Procesador = 23            ,
            CamaraPosterior = 24
            ,CamaraFrontal = 25
            ,MemoriaFlash = 26
            ,MemoriaRam = 27
            ,Color = 28            
            ,Capacidad = 29
            ,Scanear = 30
            ,TipoMercaderia = 31
            ,DocumentoAjuste = 32
            ,Origen = 34
            ,Voltaje = 35
            ,TipoAlmacen = 36
            ,TipoPartner = 39
            ,TipoIncidencia = 41
            ,TipoSolucion = 42
            ,CondicionReclamo = 43
            ,OrdenServicio = 45
            , Modelo = 51
            ,Familia = 52
            ,TipoOG = 56
            ,Pantalla = 57
            ,SistemaOperativo = 58
            ,Sexo = 61
            ,RequerimientoCliente = 62
            ,Sintoma = 63
            ,TipoDano =64
            ,Producto  = 74
            ,Programacion = 76
            ,OrdenTrabajo = 77

        }
        public enum EstadoPreliquidacion
        {
            PendienteFactura = 22
            ,Facturado = 23
            ,Anulado = 24
        }

        public enum TipoPartner : int
        {
            Partner = 1,
            Fabricante = 2
                
        }
        public enum Partner : int
        {
            Smartway = 1
        }


        public enum TipoEntidad : int
        {

        }
        public enum Scaneo : int
        {
            Serie  = 137	,
            SerieIMEI = 138	,
            SerieIMEIMAC = 139,
            MAC = 140,
            IMEI  = 163
        }
        public enum EstadoOrdenTrabajo : int
        {
            Asignada = 52,
            EnAtencion = 53,
            Completada = 54,
            Reasignada = 55,
            Detenida = 56,
            EnCotizacion=64,
            CotizacionCompleta = 65

        }
        public enum Producto : int
        {
            PendienteReparar = 41,
            Inoperativo = 43,
            Reparado = 44,
            Disponible = 45,
            Scrap = 46,
            SeedStock = 47,
            PendientePersonalizar = 48,
            NoDisponible = 68
        }
        public enum TipoRecibo
        {
            NuevaRecepcion = 155,
            Reparacion = 156,
            Personalizacion = 501

        }
        public sealed class CodAlmacen
        {
            public const string AlmacenCentral = "001";
            public const string Telecom_Repuestos = "002";
            public const string Telecom_Averiados  = "003";
            public const string Pos_Repuestos = "004";
            public const string Pos_Averiados = "005";
        }
    }
}