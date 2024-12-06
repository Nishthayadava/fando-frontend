import axios from 'axios';

const handleLogin = async (userId) => {
  try {
    const response = await axios.post('/api/attendance/login', { userId });

    if (response.status === 201) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('role', response.data.role);
      setIsLoggedIn(true);
      setRole(response.data.role);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const handleLogout = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error('User is not logged in');
    return;
  }

  try {
    const response = await axios.post(
      'https://fandoexpert1.onrender.com/api/attendance/logout',
      { userId },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    console.log('Logout success:', response.data);

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
  } catch (error) {
    console.error('Error logging out:', error);
    alert('Error logging out. Please try again later.');
  }
};





export { handleLogin, handleLogout };
