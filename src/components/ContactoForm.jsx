import React, { useState } from 'react';

const infoItems = [
  { Icono: 'IconoEmail', titulo: 'Email', texto: 'contacto@mitienda.com' },
  { Icono: 'IconoTelefono', titulo: 'Teléfono', texto: '+54 9 3874 73-6030' },
  { Icono: 'IconoDireccion', titulo: 'Dirección', texto: 'Av. Borelli, A4400 Salta' },
  { Icono: 'IconoHorario', titulo: 'Horario', texto: 'Lunes a viernes, 9:00 – 18:00' },
];

const ENDPOINT = 'https://formspree.io/f/mjyyawpl';

function ContactoFormulario() {
  const [formulario, setFormulario] = useState({ 
    nombre: '', 
    email: '', 
    mensaje: '' 
  });
  const [estado, setEstado] = useState('idle');

  const manejarCambios = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setEstado('enviando');

    try {
      const respuesta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formulario.nombre,
          email: formulario.email,
          message: formulario.mensaje,
        }),
      });

      if (respuesta.ok) {
        setEstado('ok');
        setFormulario({ nombre: '', email: '', mensaje: '' });
      } else {
        setEstado('error');
      }
    } catch {
      setEstado('error');
    }
  };

  return (
    <form className="formulario-contacto" onSubmit={enviarFormulario}>
      <div className="grupo-input">
        <label>Tu Nombre:</label>
        <input 
          type="text" 
          name="nombre"
          value={formulario.nombre} 
          onChange={manejarCambios} 
          placeholder="Tu nombre completo" 
          required 
        />
      </div>

      <div className="grupo-input">
        <label>Tu Correo:</label>
        <input 
          type="email" 
          name="email"
          value={formulario.email} 
          onChange={manejarCambios} 
          placeholder="nombre@correo.com" 
          required 
        />
      </div>

      <div className="grupo-input">
        <label>Mensaje:</label>
        <textarea 
          name="mensaje"
          value={formulario.mensaje} 
          onChange={manejarCambios} 
          placeholder="Escribe tu consulta aquí..." 
          required 
        />
      </div>

      <button type="submit" className="boton-enviar" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
      </button>

      {estado === 'ok' && <p className="exito">¡Mensaje enviado con éxito!</p>}
      {estado === 'error' && <p className="error">Hubo un error al enviar el mensaje.</p>}
    </form>
  );
}

export default ContactoFormulario;
