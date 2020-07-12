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

        public ActionResult Configuracion()
        {
            if (Session["Usuario"] != null)
            {
                if (Session["Rol"].ToString() != "3")
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

        #endregion

        #region MetodosHttp

        [HttpPost]
        public JsonResult ValidarUsuario(string Query)
        {
            string JsonResponse = string.Empty;
            try
            {
                ConsultarSql(Query, "InicioSesion");
                JsonResponse = "{\"ErrorCode\":\"00\",\"Mensaje\":\"" + Session["Usuario"] + "\"}";

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
                            if (!string.IsNullOrEmpty(reader.GetString(0)))
                            {
                                Session["Usuario"] = reader.GetString(0);
                                Session["Rol"] = reader.GetString(1);
                            }
                            else
                            {
                                throw new Exception(msj.ErrorUsuario);
                            }
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
            connection.Close();
        }
    }
}