import Navbar from './Components/Navbar';
import {Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Notfound from './Components/Notfound';
import Register from './Components/Register';
import Login from './Components/Login';
import Edit from './Components/Edit';

function App() {
  return(
    <div>
    <Navbar/>
    <Routes>
    <Route path='/' element = {<Home/>}/>
    <Route path='signup' element = {<Register/>}/>
    <Route path='/login' element = {<Login/>}/>
    <Route  path='/edit' element = {<Edit/>}/>
    <Route path='*' element = {<Notfound/>}/>
</Routes>
    
    </div>
  )
}

export default App;


