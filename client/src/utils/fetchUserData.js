import { api } from "./axios";

// Get MongoDB user data
const fetchUserData = async (userId, setMongoUser, token) => {
  try {
    console.log("User:", userId, token);
    const res = await api.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    console.log("User data:", data);
    setMongoUser(data);
  } catch (e) {
    console.log(e);
  }
};

export { fetchUserData };
