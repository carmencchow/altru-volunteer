import { api } from "./axios";

// Get Ngo user data
const fetchNgoData = async (setNgo, ngo, token) => {
  try {
    const res = await api.get(`/ngo/${ngo._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    setNgo(data);
  } catch (e) {
    console.log(e);
  }
};

export { fetchNgoData };
