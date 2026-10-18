

import './Navbar.css'
function Navbar( ) {





  return(
    <nav>
      <h1>Nombre de mi sitio</h1>
      <ul>
        <li><a href="">Inicio</a></li>
        <li><a href="">Acerca de</a></li>
        <li><a href="">Contacto</a></li>
      </ul>
      <div>
        <input type="text" placeholder="Buscar..." />
        <button>Buscar</button>
      </div>
    </nav>
  )
}

export default Navbar

