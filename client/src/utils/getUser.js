import axios from "axios";

const getUser = async (userId, setUser) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
    const data = res.data;
    setUser(data);
  } catch (e) {
    console.log(e);
  }
};

const server = "http://localhost:5000";

export { getUser, server };
