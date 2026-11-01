import React from 'react';
import ContactoForm from '../components/ContactoForm';
import Footer from '../components/Footer';

const LATITUD = -24.78918;
const LONGITUD = -65.41032;
const ZOOM = '7';
const NOMBRE = 'Salta Capital';

function Contacto() {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${ZOOM}!2d${LONGITUD}!3d${LATITUD}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(NOMBRE)}!5e1!3m2!1ses!2sar!4v1793541672406!5m2!1ses!2sar`;

  return (
    <div className="pagina-contacto-layout">
      <main className="contenido-contacto">
        <h1>Póngase en Contacto</h1>
        <p>Escríbenos y te responderemos lo antes posible.</p>

        <ContactoForm />

        <div>
          <iframe
            src={mapSrc}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={`Mapa de ${NOMBRE}`}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contacto;