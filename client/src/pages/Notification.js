import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const url = "http://localhost:4000";

export default function Notification() {
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
      <div>
        <button
          onClick={() => setRedirect(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Home
        </button>
      </div>
    
      <h1
      className="text-3xl font-bold mt-5 mb-5"
      >
        Notifications
        </h1>
      <div>
        {notificationData.notifications && notificationData.notifications.length > 0 ? (
          notificationData.notifications.map((notification) => (
            <div
              key={notification._id}
              className="flex justify-between border-2 p-2.5 rounded-md mt-5"
            >
              <div className="flex gap-3">
                <img
                  src={url + "/" + notification.senderId.profileImage}
                  alt="user"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h1 className="font-bold">{notification.senderId.firstName} {notification.senderId.surname}</h1>
                  <h1 className="italic text-gray-500">{notification.content}</h1>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Accept
                </button>
    
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No notifications found</p>
        )}
      </div>
    </div>
  );
}
