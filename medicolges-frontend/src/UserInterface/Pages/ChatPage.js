import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../Context/chat-context";
import MyChats from "../Components/Chat/MyChats";
import ChatBox from "../Components/Chat/ChatBox";
import SideDrawer from "../Components/Chat/miscellaneous/SideDrawer";
import { Flex } from "@chakra-ui/react";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

    if (userInformation) navigate("/chats");
  }, [navigate]);


  return (
    <div style={{ width: "100%", position:"absolute" }}>
      {user && <SideDrawer />}
      <Flex
        direction={{ base: "column", md: "row" }} // Stack direction based on screen size
        justifyContent="space-between"
        width="100%"
        padding="12px"
        marginBottom={"10px"}
        minHeight="80.5vh" // Minimum height to ensure content visibility
      >
        {user && (
          <MyChats fetchAgain={fetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
};

export default ChatPage;
