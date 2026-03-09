import { useState } from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Chatbot from './Pages/Chatbot'
import Play from './Pages/Play'
import Vis from './Pages/Vis'
import ID from './Pages/ID'
import Analysis from './Pages/Analysis'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/play' element={<Play />}/>
    <Route path='/chatbot' element={<Chatbot />}/>
    <Route path='/visualize' element={<Vis />}/>
    <Route path='/userID' element={<ID />}/>
    <Route path='/Analysis' element={<Analysis />}/>
    
   </Routes>
    </>
  )
}

export default App
