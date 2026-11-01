
import React, { useState } from 'react';
import Footer from '../components/Footer';

const infoItems = [
  { Icono: '✉️', titulo: 'Email', texto: 'contacto@mitienda.com' },
  { Icono: '📞', titulo: 'Teléfono', texto: '+54 9 3874 73-6030' },
  { Icono: '📍', titulo: 'Dirección', texto: 'Av. Borelli, A4400 Salta' },
  { Icono: '🕒', titulo: 'Horario', texto: 'Lunes a viernes, 9:00 – 18:00' },
];

const ENDPOINT = 'https://formspree.io/f/mjyyawpl';

const latitud = -37.0323467;
const longitud = -65.3129713;

const MAPA_EMBED_URL = `https://www.google.com/maps?q=${latitud},${longitud}&output=embed`;

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

    if (estado === 'enviando') return;

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
          message: formulario.mensaje
        })
      });

      if (respuesta.ok) {
        setEstado('ok');
        setFormulario({
          nombre: '',
          email: '',
          mensaje: ''
        });
      } else {
        setEstado('error');
      }
    } catch {
      setEstado('error');
    }
  };

  return (
    <form
      onSubmit={enviarFormulario}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div>
        <label>Tu Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambios}
          placeholder="Tu nombre completo"
          required
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label>Tu Correo:</label>
        <input
          type="email"
          name="email"
          value={formulario.email}
          onChange={manejarCambios}
          placeholder="nombre@correo.com"
          required
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label>Mensaje:</label>
        <textarea
          name="mensaje"
          value={formulario.mensaje}
          onChange={manejarCambios}
          placeholder="Escribe tu consulta aquí..."
          required
          rows="5"
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
        />
      </div>

      <button type="submit" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
      </button>

      {estado === 'ok' && <p>¡Mensaje enviado con éxito!</p>}
      {estado === 'error' && <p>Hubo un error al enviar el mensaje.</p>}
    </form>
  );
}

function Contacto() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <main
        style={{
          flex: 1,
          padding: '25px',
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}
      >
        <h1>Póngase en Contacto</h1>
        <p>Escríbenos y te responderemos lo antes posible.</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            alignItems: 'start',
            marginTop: '25px'
          }}
        >
          <section>
            <ContactoFormulario />
          </section>

          <section>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {infoItems.map(({ Icono, titulo, texto }) => (
                <li
                  key={titulo}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span>{Icono}</span>
                  <div>
                    <strong>{titulo}</strong>
                    <p style={{ margin: '4px 0' }}>{texto}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '20px', width: '100%' }}>
              <iframe
                src={MAPA_EMBED_URL}
                width="100%"
                height="200"
                style={{
                  border: 0,
                  borderRadius: '8px',
                  display: 'block'
                }}
                allowFullScreen
                loading="lazy"
                title="Ubicación en el mapa"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contacto;
