import About from './pages/about';
import Home from './pages/home';
import Students from './pages/student';
import Upload from './pages/upload';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/uploadResults' Component={Upload}/>
            <Route path='/students' Component={Students}/>
            <Route path='/about' Component={About}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
