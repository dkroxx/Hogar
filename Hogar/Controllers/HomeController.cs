using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace Hogar.Controllers
{
    public class HomeController : Controller
    {
        #region Instancias

        Mensaje msj = new Mensaje();
        List<string> cmbOptions;

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
                Session["IdRegistro"] = "";
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
        public JsonResult LlenarCombos(string Query)
        {
            Combox obj = new Combox();
            cmbOptions = new List<string>();
            try
            {
                ConsultarSql(Query, "Combox");

                obj.ErrorCode = "00";
                obj.Mensaje = "Transacción exitosa";
                obj.ComboxOptions = cmbOptions;
            }
            catch (Exception ex)
            {
                obj.ErrorCode = "99";
                obj.Error = ex.Message;
            }

            var Response = new JavaScriptSerializer().Serialize(obj);
            return Json(Response);
        }

        [HttpPost]
        public JsonResult InsertBasico(string Query)
        {
            string JsonResponse = string.Empty;

            try
            {
                string[] Consultas = Query.Split('|');
                if (Consultas.Length == 2)
                {
                    string Existe = Consultas[0];
                    string Insertar = Consultas[1];

                    //CONSULTAR SI EXISTE EL REGISTRO
                    if (Existe != " ")
                    {
                        ConsultarSql(Existe, "ExisteConfig");
                        if (Session["Registro"] != null)
                        {
                            Session["Registro"] = null;
                            throw new Exception(msj.ErrorRegExiste);
                        }
                    }

                    if (Query.Contains("SELECT idNumTelefono FROM NumTelefono WHERE Telefono") ||
                        Query.Contains("SELECT idUsuarios FROM Usuario WHERE Usuario") ||
                        Query.Contains(" |INSERT INTO Asistente"))
                    {
                        Insertar = string.Format(Insertar, Convert.ToInt32(Session["IdRegistro"].ToString()));
                    }

                    if (Query.Contains(" |INSERT INTO Articulos"))
                    {
                        Insertar = string.Format(Insertar, Convert.ToInt32(Session["IdExp"].ToString()));
                    }

                    //INSERTAR EL REGISTRO
                    ConsultarSql(Insertar, "");

                    if (Query.Contains("Persona") && Query.Contains("Cedula"))
                    {
                        ConsultarSql(Existe, "ObtenerID");
                    }
                }
                else if (Consultas.Length == 3)
                {
                    string Select = Consultas[0];
                    string Insert = Consultas[1];
                    string InsertParient = Consultas[2];

                    ConsultarSql(Select, "ExisteConfig");
                    if (Session["Registro"] != null)
                    {
                        Session["Registro"] = null;
                        throw new Exception(msj.ErrorRegExiste);
                    }

                    ConsultarSql(Insert, "");
                    ConsultarSql(Select, "ObtenerID");               
                    if (Session["IdRegistro"] != null)
                    {
                        InsertParient = string.Format(InsertParient, Session["IdRegistro"].ToString());
                    }
                    ConsultarSql(InsertParient, "");
                }
                else if (Consultas.Length == 4)
                {
                    string InsertResidente = Consultas[0];
                    string SelectResidente = Consultas[1];
                    string InsertExpediente = Consultas[2];
                    string SelectExpediente = Consultas[3];

                    InsertResidente = string.Format(InsertResidente, Convert.ToInt32(Session["IdRegistro"].ToString()));
                    ConsultarSql(InsertResidente, "");

                    SelectResidente = string.Format(SelectResidente, Convert.ToInt32(Session["IdRegistro"].ToString()));
                    ConsultarSql(SelectResidente, "SelectResidente");

                    if (Session["IdRes"] != null)
                    {
                        InsertExpediente = string.Format(InsertExpediente, Convert.ToInt32(Session["IdRes"].ToString()), Convert.ToInt32(Session["IdUsuario"].ToString()));
                        ConsultarSql(InsertExpediente, "");

                        SelectExpediente = string.Format(SelectExpediente, Convert.ToInt32(Session["IdRes"].ToString()));
                        ConsultarSql(SelectExpediente, "SelectExpediente");
                    }
                    else
                    {
                        throw new Exception(msj.ErrorExpediente);
                    }
                }

                JsonResponse = "{\"ErrorCode\":\"00\",\"Mensaje\":\"Se agrego el registro.\"}";
                Session["Registro"] = null;
            }
            catch (Exception ex)
            {
                JsonResponse = "{\"ErrorCode\":\"99\",\"Error\":\"" + ex.Message + "\"}";
            }

            return Json(JsonResponse);
        }

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
                        case "ExisteConfig":
                            Session["Registro"] = reader.GetString(0);
                            break;
                        case "ObtenerID":
                            Session["IdRegistro"] = reader.GetString(0);
                            break;
                        case "Combox":
                            var Option = string.Format(msj.OptionCombo, reader.GetString(0), reader.GetString(1));
                            cmbOptions.Add(Option);
                            break;
                        case "SelectResidente":
                            Session["IdRes"] = reader.GetString(0);
                            break;
                        case "SelectExpediente":
                            Session["IdExp"] = reader.GetString(0);
                            break;
                        default:
                            break;
                    }
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
        public string ErrorRegExiste = "El valor que se ingresó ya se encuentra registrado.";
        public string ErrorExpediente = "Ha ocurrido un problema al guardar el expediente.";
        public string OptionCombo = "<option value=\"{0}\">{1}</option>";
    }

    public class Combox
    {
        public string ErrorCode { get; set; } = string.Empty;
        public string Mensaje { get; set; } = string.Empty;
        public string Error { get; set; } = string.Empty;
        public List<string> ComboxOptions { get; set; } = new List<string>();
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