import React, { useEffect, useContext } from 'react';
import { Box, Stack } from "@chakra-ui/layout";
import axios from "axios";
import ChatContext from "../chatbot/Context/chat-context";

const MyChats = ({ fetchAgain }) => {

  const { selectedChat, setSelectedChat, user, chats, setChats } = useContext(ChatContext);
  
  const fetchChats = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error.message);
    }
  };



  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);


  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
          <Stack overflowY="scroll">
            {chats.map((chat, i) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
        
              </Box>
            ))}
          </Stack>
       
      </Box>
    </Box>
  );
};

export default MyChats;
