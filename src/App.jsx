import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './Coponentes/MapComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div  style={{width:"100%"}}>
     <MapComponent style={{with:"100%"}} />
    </div>
  )
}

export default App
