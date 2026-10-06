import './App.css'
import { Routes,Route } from "react-router-dom";
import Hero from "./landing_page/home/Hero";
import Signup from "./landing_page/signup/Signup";
import Dashboard from "./dashboard/Dashboard"
import History from './dashboard/History';
import Login from "./landing_page/signup/Login";
import VideoMeetComponent from './dashboard/VideoMeet';
import {HistoryProvider}  from './contexts/HistoryContext';

function App() {
  return (
    <>
    <HistoryProvider>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/history' element={<History/>}/>
        <Route path="/login" element={<Login />} />
        <Route path='/:url' element={<VideoMeetComponent/>}/>
      </Routes>
      </HistoryProvider>
    </>
  );
}

export default App;
