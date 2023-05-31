import axios from "axios";

const getUser = async (userId, setUser) => {
  try {
    const res = await axios.get(
      `https://altru-volunteer-be.onrender.com/api/user/${userId}`
    );
    const data = res.data;
    setUser(data);
  } catch (e) {
    console.log(e);
  }
};

const server = "https://altru-volunteer-be.onrender.com";

export { getUser, server };
