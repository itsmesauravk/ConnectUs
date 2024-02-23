import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const url = "http://localhost:4000";

export default function FriendsPage() {
  const { userInfo } = useContext(UserContext);
  // const userInfo = localStorage.getItem("user")
  
  const [redirect, setRedirect] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
 


  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(`${url}/notification/${userInfo.id}`);
        setNotificationData(response.data);
      } catch (error) {
        console.log("Error getting friends: ", error);
      }
    };
    getFriends();
  }, [userInfo.id]);


  if (redirect) {
    return <Navigate to="/home" />;
  }

  // console.log("noti", notificationData);
 

  return (
    <div>
      <h1>You have no friends right now ^_^</h1>
    </div>
  );
}
