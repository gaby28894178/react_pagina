
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Contacto from './page/Contacto'
import Acercade from './page/Acercade'
import Home from './page/Home'



function App() {



 
return (
  <div>
  <BrowserRouter>
    <Navbar/>
  <Routes>
    <Route path='/home' element={<Home/>} />
    <Route path='/acercade' element={<Acercade/>}  />
    <Route/>
    <Route path="/contacto"element={<Contacto/>} />
  </Routes>
  
  </BrowserRouter>
  

  


  
  </div>
  )
}

export default App
