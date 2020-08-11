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
        public JsonResult LlenarTabla(string Query)
        {
            Combox obj = new Combox();
            cmbOptions = new List<string>();
            try
            {
                ConsultarSql(Query, "Table");

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
                if (Query.Contains("select idRelacion from AsistenteResidente"))
                {
                    string[] Nodo = Query.Split('!');

                    for (int i = 0; i < Nodo.Length; i++)
                    {

                        string[] NodoSegundo = Nodo[i].Split('|');
                        string ndSelect = NodoSegundo[0];
                        string ndInset = NodoSegundo[1];

                        ConsultarSql(ndSelect, "ExisteConfig");
                        if (Session["Registro"] == null)
                        {
                            ConsultarSql(ndInset, "");
                        }

                        Session["Registro"] = null;
                    }
                }
                else
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
                        case "Table":
                            var Row = string.Empty;

                            if (Query.Contains("FROM Residente"))
                            {
                                Row = string.Format(msj.TablaPaciente, reader.GetString(0), reader.GetString(1), reader.GetString(2) + " " + reader.GetString(3) + " " + reader.GetString(4), reader.GetString(5), reader.GetString(6));
                            }
                            if (Query.Contains("from Visitante"))
                            {
                                Row = string.Format(msj.TablaPariente, reader.GetString(0), reader.GetString(1), reader.GetString(2) + " " + reader.GetString(3) + " " + reader.GetString(4), reader.GetString(5));
                            }
                            if (Query.Contains("select a.idAsistente, p.Cedula, p.Nombre, p.Apellido1, p.Apellido2, ta.Nombre, a.Entrada, a.Salida from Asistente a"))
                            {
                                Row = string.Format(msj.TablaAsistente, reader.GetString(0), reader.GetString(1), reader.GetString(2) + " " + reader.GetString(3) + " " + reader.GetString(4), reader.GetString(5), reader.GetString(6), reader.GetString(7));
                            }
                            if (Query.Contains("from Usuario"))
                            {
                                Row = string.Format(msj.TablaUsuario, reader.GetString(0), reader.GetString(1), reader.GetString(2) + " " + reader.GetString(3) + " " + reader.GetString(4), reader.GetString(5), reader.GetString(6));
                            }
                            if (Query.Contains("from TipoRol"))
                            {
                                Row = string.Format(msj.TablaRoles, reader.GetString(0), reader.GetString(1), ConvertirString(reader.GetString(2)), ConvertirString(reader.GetString(3)), ConvertirString(reader.GetString(4)), ConvertirString(reader.GetString(5)));
                            }
                            if (Query.Contains("from TipoArticulo") || Query.Contains("from TipoAsistente") || Query.Contains("from TipoParentesco") || Query.Contains("from TipoTelefono"))
                            {
                                Row = string.Format(msj.TablaGeneral, reader.GetString(0), reader.GetString(1));
                            }
                            if (Query.Contains("from Residente r inner join Persona p"))
                            {
                                Row = string.Format(msj.TablaResidente, reader.GetString(0), reader.GetString(1), reader.GetString(2), reader.GetString(0), reader.GetString(2));
                            }
                            if (Query.Contains("select a.idAsistente, concat(p.Nombre, ' ', p.Apellido1, ' ', p.Apellido2) as Nombre, tp.Nombre from Asistente a"))
                            {
                                Row = string.Format(msj.TablaAsignar, reader.GetString(0), reader.GetString(1), reader.GetString(2), reader.GetString(0), reader.GetString(1));
                            }
                            if (Query.Contains("select b.idVisita, concat(day(b.Fecha), '-', month(b.Fecha), '-', year(b.Fecha)) as Fecha, b.Hora"))
                            {
                                Row = string.Format(msj.TablaVisita, reader.GetString(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4));
                            }

                            cmbOptions.Add(Row);
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

        private string ConvertirString(string values)
        {
            var Valor = string.Empty;
            if (values == "1")
            {
                Valor = "Permitir";
            }
            else
            {
                Valor = "Denegar";
            }
            return Valor;
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
        public string TablaPaciente = "<tr><td data-label='ID'>{0}</td><td data-label='Cedula'>{1}</td><td data-label='Nombre completo'>{2}</td><td data-label='Nacimiento'>{3}</td><td data-label='Ingreso'>{4}</td><td data-label='Acciones'><button type='button' class='btn btn-success' onclick=''>Modificar</button></td></tr>";
        public string TablaPariente = "<tr><td data-label='ID'>{0}</td><td data-label='Cedula'>{1}</td><td data-label='Nombre completo'>{2}</td><td data-label='Telefono'>{3}</td><td data-label='Acciones'><button type='button' class='btn btn-success' onclick=''>Modificar</button></td></tr>";
        public string TablaAsistente = "<tr><td data-label='ID'>{0}</td><td data-label='Cedula'>{1}</td><td data-label='Nombre completo'>{2}</td><td data-label='Tipo'>{3}</td><td data-label='Entrada'>{4}</td><td data-label='Salida'>{5}</td><td data-label='Acciones'><button type='button' class='btn btn-success' onclick='ProcesosAsignar()'>Seleccionar</button></td></tr>";
        public string TablaUsuario = "<tr><td data-label='ID'>{0}</td><td data-label='Cedula'>{1}</td><td data-label='Nombre completo'>{2}</td><td data-label='Usuario'>{3}</td><td data-label='Rol'>{4}</td><td data-label='Acciones'><button type='button' class='btn btn-default' onclick=''>Modificar</button></td><td data-label='Acciones'><button type='button' class='btn btn-danger' onclick=''>Eliminar</button></td></tr>";
        public string TablaRoles = "<tr><td data-label='ID'>{0}</td><td data-label='Descripción'>{1}</td><td data-label='Residentes'>{2}</td><td data-label='Asistentes'>{3}</td><td data-label='Visitas'>{4}</td><td data-label='Configuraciones'>{5}</td><td data-label='Accion'><button type='button' class='btn btn-danger' onclick=''>Eliminar</button></td></tr>";
        public string TablaGeneral = "<tr><td data-label='ID'>{0}</td><td data-label='Descripción'>{1}</td><td data-label='Acciones'><button type='button'class='btn btn-danger' onclick=''>Eliminar</button></td></tr>";
        public string TablaResidente = "<tr><td>{0}</td><td>{1}</td><td>{2}</td><td><button type='button' class='btn btn-success' onclick='ProcesosAsignar({3}, \"{4}\")'>Seleccionar</button></td></tr>";
        public string TablaAsignar = "<tr><td>{0}</td><td>{1}</td><td>{2}</td><td><button type='button' class='btn btn-success' onclick='AgregarAsistente({3}, \"{4}\")'>Asignar</button></td></tr>";        
        public string TablaVisita = "<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td><button type='button' class='btn btn-danger' onclick=''>Cancelar</button></td></tr>";
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