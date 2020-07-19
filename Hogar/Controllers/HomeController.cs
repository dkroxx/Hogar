using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace Hogar.Controllers
{
    public class HomeController : Controller
    {
        #region Instancias

        Mensaje msj = new Mensaje();

        #endregion

        #region Acciones

        public ActionResult IniciarSesion()
        {
            return View();
        }

        public ActionResult Inicio()
        {
            if (Session["Usuario"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("IniciarSesion");
            }
        }

        public ActionResult Pacientes()
        {
            if (Session["Usuario"] != null)
            {
                if (Session["Pacientes"].ToString() == "1")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("NoAutorizado");
                }
            }
            else
            {
                return RedirectToAction("IniciarSesion");
            }
        }

        public ActionResult Visitas()
        {
            if (Session["Usuario"] != null)
            {
                if (Session["Visitas"].ToString() == "1")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("NoAutorizado");
                }
            }
            else
            {
                return RedirectToAction("IniciarSesion");
            }
        }

        public ActionResult Asistentes()
        {
            if (Session["Usuario"] != null)
            {
                if (Session["Asistentes"].ToString() == "1")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("NoAutorizado");
                }
            }
            else
            {
                return RedirectToAction("IniciarSesion");
            }
        }

        public ActionResult Configuracion()
        {
            if (Session["Usuario"] != null)
            {
                if (Session["Configuracion"].ToString() == "1")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("NoAutorizado");
                }
            }
            else
            {
                return RedirectToAction("IniciarSesion");
            }
        }

        public ActionResult NoAutorizado()
        {
            if (Session["Usuario"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("IniciarSesion");
            }
        }

        public ActionResult CerrarSesion()
        {
            if (Session["Usuario"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("IniciarSesion");
            }
        }

        #endregion

        #region MetodosHttp

        [HttpPost]
        public JsonResult ValidarUsuario(string Query)
        {
            string JsonResponse = string.Empty;
            try
            {
                ConsultarSql(Query, "InicioSesion");
                if (Session["Usuario"] == null)
                {
                    throw new Exception(msj.ErrorUsuario);
                }
                JsonResponse = "{\"ErrorCode\":\"00\",\"Mensaje\":\"" + Session["Usuario"] + "\"}";
            }
            catch (Exception ex)
            {
                JsonResponse = "{\"ErrorCode\":\"99\",\"Error\":\"" + ex.Message + "\"}";                
            }

            return Json(JsonResponse);
        }

        [HttpPost]
        public JsonResult CerrarSesion(string Query)
        {
            string JsonResponse = string.Empty;
            try
            {
                var Usuario = Session["Usuario"].ToString();
                Session["Usuario"] = null;
                Session["Nombre"] = null;
                Session["Pacientes"] = null;
                Session["Visitas"] = null;
                Session["Configuracion"] = null;

                JsonResponse = "{\"ErrorCode\":\"00\",\"Mensaje\":\"" + string.Format(msj.CerrarSesion, Usuario) + "\"}";

            }
            catch (Exception ex)
            {
                JsonResponse = "{\"ErrorCode\":\"99\",\"Error\":\"" + ex.Message + "\"}";
            }

            return Json(JsonResponse);
        }

        #endregion

        #region MetodosFuncionales

        private string ConsultarSql(string Query, string Metodo)
        {
            string Resultado = string.Empty;

            var dbCon = DBConnection.Instance();
            if (dbCon.IsConnect())
            {
                var cmd = new MySqlCommand(Query, dbCon.Connection);
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    switch (Metodo)
                    {
                        case "InicioSesion":
                            Session["IdUsuario"] = reader.GetString(0);
                            Session["Usuario"] = reader.GetString(1);
                            Session["Nombre"] = string.Format("{0} {1}", reader.GetString(2), reader.GetString(3));
                            Session["Pacientes"] = reader.GetString(4);
                            Session["Visitas"] = reader.GetString(5);
                            Session["Configuracion"] = reader.GetString(6);
                            Session["Asistentes"] = reader.GetString(7);
                            break;
                        default:
                            break;
                    }


                    //LOGICA PARA CAPTURAR LOS DATOS
                    //string someStringFromColumnZero = reader.GetString(0);
                    //string someStringFromColumnOne = reader.GetString(1);
                    //Console.WriteLine(someStringFromColumnZero + "," + someStringFromColumnOne);
                }
                dbCon.Close();
            }
            else
            {
                throw new Exception(msj.ErrorConexion);
            }

            return Resultado;
        }

        #endregion
    }

    public class Mensaje
    {
        public string ErrorConexion = "Ha ocurrido un problema al conectarse con la base de datos.";
        public string ErrorUsuario = "El usuario es incorrecto o se encuentra inactivo.";        
        public string CerrarSesion = "La sesión de {0} ha sido cerrada correctamente.";
    }

    public class DBConnection
    {
        private DBConnection()
        {
        }

        private string databaseName = string.Empty;
        public string DatabaseName
        {
            get { return databaseName; }
            set { databaseName = value; }
        }

        public string Password { get; set; }
        private MySqlConnection connection = null;
        public MySqlConnection Connection
        {
            get { return connection; }
        }

        private static DBConnection _instance = null;
        public static DBConnection Instance()
        {
            if (_instance == null)
                _instance = new DBConnection();
            return _instance;
        }

        public bool IsConnect()
        {
            if (Connection == null)
            {
                string connstring = ConfigurationManager.AppSettings["Conexion"];
                connection = new MySqlConnection(connstring);
                connection.Open();
            }

            return true;
        }

        public void Close()
        {
            _instance = null;            
            connection.Close();
        }
    }
}