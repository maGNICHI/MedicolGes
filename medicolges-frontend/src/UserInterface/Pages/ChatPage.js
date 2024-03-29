import React, { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../Context/chat-context";
import MyChats from '../Components/Chat/MyChats';
import ChatBox from '../Components/Chat/ChatBox';
import SideDrawer from '../Components/Chat/miscellaneous/SideDrawer';
//import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(ChatContext);

  // const navigate = useNavigate(); // Use useNavigate() here

  // if (!user) {
  //   navigate("/");
  //   return null; // or render a loading indicator
  // }
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Flex
        justifyContent="space-between"
        width="100%"
        height="80.5vh"
        padding="12px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
};

export default ChatPage;
