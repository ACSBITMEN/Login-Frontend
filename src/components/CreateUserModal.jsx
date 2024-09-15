// src/components/CreateUserModal.jsx
import '../styles/components/CreateUserModal.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { createUser } from '../services/userService'; // Importar la función createUser

const CreateUserModal = ({ show, onClose, onSuccess }) => {
  // Campos para el formulario
  const formFields = [
    { name: 'username', type: 'text', label: 'Username' },
    { name: 'first_name', type: 'text', label: 'Nombre' },
    { name: 'last_name', type: 'text', label: 'Apellido' },
    { name: 'password', type: 'password', label: 'Contraseña' },
    { name: 'email', type: 'email', label: 'Correo Electrónico' },
  ];

  // Estado para controlar los valores de los campos
  const [formValues, setFormValues] = useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    role_id: '',
  });

  // Estado para manejar mensajes de error
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
  });

  // Función para manejar los cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    // Validar que solo se ingresen letras en first_name y last_name
    if (name === 'first_name' || name === 'last_name') {
      const lettersRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/; // Acepta letras, acentos y espacios
      if (!lettersRegex.test(value)) {
        error = 'Este campo solo acepta letras.';
      }
    }

    // Actualizar el estado de errores y valores del formulario
    setErrors({ ...errors, [name]: error });
    setFormValues({ ...formValues, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que no haya errores en los campos
    if (errors.first_name || errors.last_name) {
      return;
    }

    try {
      // Llamar a la función createUser para enviar los datos al backend
      const response = await createUser(formValues);

      // Cerrar el modal inmediatamente
      onClose();

      // Notificar al componente padre del éxito
      onSuccess(`Usuario "${response.username}" creado exitosamente.`);
      
      // Limpiar el formulario después de crear el usuario
      setFormValues({
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        email: '',
        role_id: '',
      });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <div id='ContainerModal-CreateUserModal' className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Usuario</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <div className="form-group" key={field.name}>
                  <label className="label">
                    <input
                      className="input"
                      type={field.type}
                      name={field.name}
                      placeholder=" "
                      required
                      value={formValues[field.name]}
                      onChange={handleChange}
                    />
                    <span className='span'>{field.label}</span>
                  </label>
                  {errors[field.name] && <small className="text-danger">{errors[field.name]}</small>}
                </div>
              ))}
              <div className="form-group">
                <label className="label">
                  <select
                    className="input"
                    name="role_id"
                    required
                    value={formValues.role_id}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Selecciona un Rol</option>
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                  </select>
                  <span className='span'>Rol</span>
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                <button type="submit" className="btn btn-primary">Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired, // Nueva prop para manejar el éxito
};

export default CreateUserModal;
