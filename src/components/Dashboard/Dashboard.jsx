
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';
import MoodCalendar from '../MoodCalendar/MoodCalendar';
import MoodList from '../MoodList/MoodList';
import MoodStats from '../MoodStats/MoodStats'


const Dashboard = ({ moods }) => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);


  return (
    <main className='dashboard-container'>
      <h1>Welcome, {users.username}</h1>
      <MoodSummary moods={moods} />
      <MoodStats moods={moods}/>
    </main>
  );
};

export default Dashboard;