import axios from 'axios';

const handleLogin = async (userId, setIsLoggedIn, setRole,handleNavigate) => {
  try {
    const response = await axios.post('https://fandoexpert1.onrender.com/api/attendance/login', { userId });

    if (response.status === 201) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('role', response.data.role); // Store role in localStorage
      setIsLoggedIn(true);
      setRole(response.data.role);

      // Redirect based on role

      // Redirect based on role or handle navigation
      handleNavigate('/dashboard');  // Example redirect after login
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};


const handleLogout =async (setIsLoggedIn, setRole, navigate) => {

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

    // Clear the user's data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('refreshToken');

    // Update the state in the component
    setIsLoggedIn(false);
    setRole(null);

    // Redirect to login page
    navigate('/login');  // Use the path for your login page

  } catch (error) {
    const existingToken = localStorage.getItem('token');
        if (existingToken) {
            localStorage.removeItem('token');
        }
        const existinguser = localStorage.getItem('userId');
        if (existinguser) {
            localStorage.removeItem('userId');
        }
        const existingrole = localStorage.getItem('role');
        if (existingrole) {
            localStorage.removeItem('role');
        }
        const existingref = localStorage.getItem('refreshToken');
        if (existingref) {
            localStorage.removeItem('refreshToken');
        }
    console.error('Error logging out:', error);
    alert('Error logging out. Please try again later.');
  }
};


export { handleLogin, handleLogout };
