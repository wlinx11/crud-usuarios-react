import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  const [usuario, setUsuario] = useState([]);
  const [newUsuario, setNewUsuario] = useState({
    nombres: "",
    apellidos: "",
    edad: "",
    genero: "",
    numeroTelefonico: "",
    contraseña: "",
  });
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [toView, setToView] = useState({
    nombres: "",
    apellidos: "",
    edad: "",
    genero: "",
    numeroTelefonico: "",
    contraseña: "",
  });
  const [openView, setOpenview] = useState(false);

  useEffect(() => {
    fetchUsuario();
  }, []);

  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchUsuario = (url = "http://127.0.0.1:8000/api/usuario/") => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.results) {
          setUsuario(response.data.results);
          setNextPage(response.data.next);
          setPrevPage(response.data.previous);
        } else {
          setUsuario(response.data);
          setNextPage(null);
          setPrevPage(null);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleInputsChange = (e) => {
    setNewUsuario({ ...newUsuario, [e.target.name]: e.target.value });
  };

  const handleAddUsuario = () => {
    axios
      .post("http://127.0.0.1:8000/api/usuario/", newUsuario)
      .then((response) => {
        setUsuario([...usuario, response.data]);
        setNewUsuario({
          nombres: "",
          apellidos: "",
          edad: "",
          genero: "",
          numeroTelefonico: "",
          contraseña: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleViewClick = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/usuario/${id}/`
    );
    setToView(response.data);
    setOpenview(true);
  };

  const handleEditClick = (usuario) => {
    setSelectedUsuario(usuario);
    setNewUsuario(usuario);
  };

  const handleUpdateUsuario = (id) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/usuario/${selectedUsuario.id}/`,
        newUsuario
      )
      .then((response) => {
        fetchUsuario();
        setNewUsuario({
          nombres: "",
          apellidos: "",
          edad: "",
          genero: "",
          numeroTelefonico: "",
          contraseña: "",
        });
        setSelectedUsuario(null);
      })
      .catch((error) => console.error(error));
  };

  const handleCancelUpdateUsuario = () => {
    setSelectedUsuario(null);
    setNewUsuario({
      nombres: "",
      apellidos: "",
      edad: "",
      genero: "",
      numeroTelefonico: "",
      contraseña: "",
    });
  };

  const handleDeleteUsuario = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/usuario/${id}/`)
        .then((response) => {
          fetchUsuario();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="text-center">
              <h1 className="display-4 text-primary fw-bold mb-2">
                <i className="fas fa-users me-3"></i>
                Sistema de Administración de Usuarios
              </h1>
              <p className="lead text-muted">
                Gestiona usuarios de forma fácil y eficiente
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">
                  <i className="fas fa-user-plus me-2"></i>
                  {selectedUsuario ? "Actualizar Usuario" : "Nuevo Usuario"}
                </h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombres</label>
                      <input
                        type="text"
                        name="nombres"
                        className="form-control"
                        placeholder="Ingresa los nombres"
                        value={newUsuario.nombres}
                        onChange={handleInputsChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Apellidos</label>
                      <input
                        type="text"
                        name="apellidos"
                        className="form-control"
                        placeholder="Ingresa los apellidos"
                        value={newUsuario.apellidos}
                        onChange={handleInputsChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Edad</label>
                      <input
                        type="number"
                        name="edad"
                        className="form-control"
                        placeholder="Edad"
                        value={newUsuario.edad}
                        onChange={handleInputsChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Género</label>
                      <select
                        name="genero"
                        className="form-select"
                        value={newUsuario.genero}
                        onChange={handleInputsChange}
                      >
                        <option value="">Seleccione género</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Teléfono</label>
                      <input
                        type="tel"
                        name="numeroTelefonico"
                        className="form-control"
                        placeholder="Número telefónico"
                        value={newUsuario.numeroTelefonico}
                        onChange={handleInputsChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Contraseña</label>
                      <input
                        type="password"
                        name="contraseña"
                        className="form-control"
                        placeholder="Contraseña"
                        value={newUsuario.contraseña}
                        onChange={handleInputsChange}
                      />
                    </div>
                  </div>
                  <div className="mt-4 d-flex gap-2 flex-wrap">
                    {selectedUsuario ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleUpdateUsuario}
                        >
                          <i className="fas fa-save me-2"></i>
                          Actualizar Usuario
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCancelUpdateUsuario}
                        >
                          <i className="fas fa-times me-2"></i>
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleAddUsuario}
                        >
                          <i className="fas fa-user-plus me-2"></i>
                          Crear Usuario
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={() =>
                            window.open(
                              "http://127.0.0.1:8000/api/usuario/export/",
                              "_blank"
                            )
                          }
                        >
                          <i className="fas fa-download me-2"></i>
                          Exportar CSV
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  <i className="fas fa-list me-2"></i>
                  Lista de Usuarios
                </h5>
                <span className="badge bg-info">{usuario.length} usuarios</span>
              </div>
              <div className="card-body p-0">
                {usuario.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="ps-4">Nombre Completo</th>
                          <th>Edad</th>
                          <th>Género</th>
                          <th>Teléfono</th>
                          <th className="text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuario.map((user) => (
                          <tr key={user.id}>
                            <td className="ps-4">
                              <div className="d-flex align-items-center">
                                <div
                                  className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                  style={{ width: "40px", height: "40px" }}
                                >
                                  {user.nombres?.charAt(0)}
                                  {user.apellidos?.charAt(0)}
                                </div>
                                <div>
                                  <div className="fw-bold">
                                    {user.nombres} {user.apellidos}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">{user.edad}</td>
                            <td className="align-middle">
                              <span
                                className={`badge ${
                                  user.genero === "M"
                                    ? "bg-primary"
                                    : user.genero === "F"
                                    ? "bg-danger"
                                    : "bg-info"
                                }`}
                              >
                                {user.genero === "M"
                                  ? "Masculino"
                                  : user.genero === "F"
                                  ? "Femenino"
                                  : "Otro"}
                              </span>
                            </td>
                            <td className="align-middle">
                              {user.numeroTelefonico}
                            </td>
                            <td className="text-center align-middle">
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-outline-info btn-sm"
                                  onClick={() => handleViewClick(user.id)}
                                  title="Ver detalles"
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button
                                  className="btn btn-outline-warning btn-sm"
                                  onClick={() => handleEditClick(user)}
                                  title="Editar usuario"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleDeleteUsuario(user.id)}
                                  title="Eliminar usuario"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="fas fa-users fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">No hay usuarios registrados</h5>
                    <p className="text-muted">
                      Crea tu primer usuario usando el formulario de arriba
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {(nextPage || prevPage) && (
          <div className="row mt-4">
            <div className="col-12">
              <nav aria-label="Paginación de usuarios">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${!prevPage ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => prevPage && fetchUsuario(prevPage)}
                      disabled={!prevPage}
                    >
                      <i className="fas fa-chevron-left me-1"></i>
                      Anterior
                    </button>
                  </li>
                  <li className={`page-item ${!nextPage ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => nextPage && fetchUsuario(nextPage)}
                      disabled={!nextPage}
                    >
                      Siguiente
                      <i className="fas fa-chevron-right ms-1"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Modal for View User */}
      {openView && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">
                  <i className="fas fa-user me-2"></i>
                  Detalles del Usuario
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setOpenview(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12 text-center mb-3">
                    <div
                      className="avatar bg-info text-white rounded-circle d-flex align-items-center justify-content-center mx-auto"
                      style={{
                        width: "80px",
                        height: "80px",
                        fontSize: "2rem",
                      }}
                    >
                      {toView.nombres?.charAt(0)}
                      {toView.apellidos?.charAt(0)}
                    </div>
                    <h4 className="mt-3 mb-0">
                      {toView.nombres} {toView.apellidos}
                    </h4>
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label text-muted">Edad</label>
                    <p className="fw-bold">{toView.edad} años</p>
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label text-muted">Género</label>
                    <p className="fw-bold">
                      {toView.genero === "M"
                        ? "Masculino"
                        : toView.genero === "F"
                        ? "Femenino"
                        : "Otro"}
                    </p>
                  </div>
                  <div className="col-12">
                    <label className="form-label text-muted">
                      Número Telefónico
                    </label>
                    <p className="fw-bold">
                      <i className="fas fa-phone me-2 text-success"></i>
                      {toView.numeroTelefonico}
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setOpenview(false)}
                >
                  <i className="fas fa-times me-2"></i>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
