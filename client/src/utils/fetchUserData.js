import { api } from "./axios";

// Get MongoDB user data
const fetchUserData = async (userId, setMongoUser, token) => {
  try {
    const res = await api.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    // console.log("User data:", userId, token, data);
    setMongoUser(data);
  } catch (e) {
    console.log(e);
  }
};

export { fetchUserData };
