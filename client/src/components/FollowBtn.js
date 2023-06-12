import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";

const FollowBtn = ({ ngo }) => {
  const [disabled, setDisabled] = useState(false);
  const { mongoUser, user, setMongoUser } = useContext(AuthContext);

  const handleFollow = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.post(
        `/user/${user.uid}/follow/ngo`,
        {
          follow: `${ngo.name}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      setDisabled("Following...");
      await fetchUserData(user.uid, setMongoUser, token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button disabled={disabled} className="follow" onClick={handleFollow}>
        {mongoUser?.following?.find((item) => item === ngo.name)
          ? `Following`
          : `Follow ${ngo.name}`}
      </button>
    </div>
  );
};

export default FollowBtn;
