import React, {useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "./chat-context";

const ChatProvider = (props) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInformation);

    // Allow navigation to "/" (home), "/login", or "/signup" if user is not logged in
    if (!userInformation) {
      const path = window.location.pathname;
      if (path !== "/login" && path !== "/signup" && path !== "/") {
        navigate("/login");
      }
    }
  }, [navigate]);
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem('userinfo'));
//     setUser(userInfo);

//     if (!userInfo) {
//        <Navigate to="/" />
//     }
//  }, [])
  //console.log(chats, 'chats context')
  return (
    <div>
      <ChatContext.Provider
        value={{
          user,
          setUser,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          notification,
          setNotification,
        }}
      >
        {props.children}
      </ChatContext.Provider>
    </div>
  );
};

export default ChatProvider;
// export const ChatState = () => {
//   return useContext(ChatContext);
// }
