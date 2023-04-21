import axios from 'axios'

const getUser = async (userId, setUser) => {

  try {
    console.log('calling getUser function')
    const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
    console.log(res)
    const data = res.data;
    console.log(data)
    setUser(data);
  } catch (e) {
    console.log(e);
  }
};

export {getUser};