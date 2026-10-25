
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Contacto from './page/Contacto'



function App() {



 
return (
  <div>
  <BrowserRouter>
    <Navbar/>
  <Routes>
    <Route path="/contacto"element={<Contacto/>} />
    <Route/>
    <Route/>
    <Route/>
  </Routes>
  
  </BrowserRouter>
  

  


  
  </div>
  )
}

export default App
