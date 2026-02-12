import { useState, useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router';
import "./App.css"
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import MoodList from './components/MoodList/MoodList';
import MoodDetails from './components/MoodDetails/MoodDetails';
import MoodForm from './components/MoodForm/MoodForm';
import CommentForm from './components/CommentForm/CommentForm';
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

  const handleAddMood = async (formData) => {
    const newMood = await moodService.create(formData);
    setMoods((prev) => [newMood, ...prev])
  };

  const handleEditMood = async (moodId,formData) => {
    const updatedMood = await moodService.update(moodId,formData);
    setMoods((prev) => prev.map((mood) =>
    mood._id === updatedMood._id ? updatedMood : mood
  )
);
  };

  const handleDeleteMood = async (moodId) => {
    await moodService.deleteMood(moodId)
    setMoods((prev) => prev.filter((mood)=> mood._id !== moodId))
  }

  return (
    <>
      <NavBar />
      <Routes>
        { user ? (
          <>
            <Route path='/' element={<Dashboard moods={moods}/> } />
            <Route path='/moods' element={ <MoodList moods={moods} />} />   
            <Route path='/moods/:moodId' element={<MoodDetails user={user} moods={moods} setMoods={setMoods} handleDeleteMood={handleDeleteMood}/>} /> 
            <Route path='/moods/new' element={<MoodForm handleAddMood={handleAddMood}/>} /> 
            <Route path='/moods/:moodId/edit' element={<MoodForm handleEditMood={handleEditMood}/>}/> 
            <Route path="/community" element= {<Community/>}/> 
          </>
        ) : (
          <>
            <Route path='/' element={<Landing /> } />
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}  
      </Routes>
    </>
  );
};

export default App;


