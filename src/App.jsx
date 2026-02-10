import { useState, useContext, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router';
import "./App.css"
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import MoodList from './components/MoodList/MoodList';
import Moodform from './components/MoodForm/MoodForm';
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
    return newMood;
  };

  const handleEditMood = async (formData,moodId) => {
    const updatedMood = await moodService.update(formData,moodId);
    return updatedMood;
  }

  const handleAddComment = async ( formData,moodId) => {
    const updatedMood = await moodService.addComment(formData,moodId);
    return updatedMood;
  }

  const handleUpdateComment = async (formData,commentId,moodId) => {
    const updatedMood = await moodService.updateComment(formData,commentId,moodId);
    return updatedMood
  }

  return (
    <>
      <NavBar />
      <Routes>
        { user ? (
          <>
            <Route path='/dashboard' element={<Dashboard /> } />
            <Route path='/moods' element={ <MoodList moods={moods} />} />   
            <Route path='/moods/new' element={<Moodform handleAddMood={handleAddMood}/>} /> 
            <Route path='/moods/:moodId/edit' element={<Moodform handleEditMood={handleEditMood}/>}/>  
            <Route path='/moods/:moodId/comments/new' element={<CommentForm handleAddComment={handleAddComment}/>}/>  
            <Route path='/moods/:moodId/comments/:commentId/edit' element={<CommentForm handleUpdateComment={handleUpdateComment}/>}/>
          </>
        ) : (
          <>
            <Route path='/' element={<Landing /> } />
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
        {/* Public Routes */}
        


        
      </Routes>
    </>
  );
};

export default App;


