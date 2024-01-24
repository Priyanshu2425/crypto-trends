import {useState, useEffect} from 'react'
import CryptoView from './components/CryptoView';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  const [data, setData] = useState({});

  useEffect(()=>{

    
    
  }, [])
    
  return (
    <>  
      <div id="main-view">
        <div id="main-navbar-div"><Navbar/></div>
        <div id="main-cryptoview-div"><CryptoView/></div>
      </div>
        
    </>
  )
}

export default App;
