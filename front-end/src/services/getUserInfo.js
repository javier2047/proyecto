import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyNzI4MDQwLCJpYXQiOjE3MzI3MjA4NDAsImp0aSI6IjA1MTM0MWI4N2RiMzQyNjVhMzI4ODk4NzBmMTI0NmU3IiwidXNlcl9pZCI6OH0.vyLIjPu4ur2OHEp_qSUo0ikc6sPwIlTP-kwF7_s9G6A`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
