// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import JobVacancy from './pages/JobVacancy'
import JobVacancyDetail from './pages/JobVacancyDetail'
import DataValidation from "./pages/DataValidation";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/data-validation' element={<DataValidation/>} />
        <Route path='/job-vacancy' element={<JobVacancy/>} />
        <Route path='/job-vacancy-detail/:id' element={<JobVacancyDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
