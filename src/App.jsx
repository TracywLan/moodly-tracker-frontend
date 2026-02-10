import { useState, useContext, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import MoodList from './components/MoodList/MoodList';
import * as moodService from './services/moodService';

import { UserContext } from './contexts/UserContext';


const App = () => {
  const [moods, setMoods] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllMood = async () => {
      const moodData = await moodService.index();
      
      setMoods(moodData);
    };

    if (user) fetchAllMood();
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />


        <Route path='/moods' element={user ? <MoodList moods={moods} /> : <Navigate to="/sign-in"/>} />        
      </Routes>
    </>
  );
};

export default App;


