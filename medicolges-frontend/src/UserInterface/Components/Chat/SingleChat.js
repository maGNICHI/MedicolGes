import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ChatContext from "../../Context/chat-context";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import { Button } from "@chakra-ui/react";
import { BsMicFill } from 'react-icons/bs';
import SendAudioModal from "./miscellaneous/SendAudioModal";
import io from "socket.io-client";
import Robo from '../../Assets/robot.gif';

const ENDPOINT = "http://localhost:5000"; //development
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [file, setFile] = useState(null);
  const toast = useToast();
  
  const { selectedChat, setSelectedChat, user, notification, setNotification } = useContext(ChatContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
   const handleFileChange = (e) => {
     setFile(e.target.files[0]);
   };
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = new SpeechRecognition();
  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = "en-US";
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      console.log(data, "fetched messsages of the selected chat data");
      socket.emit("join chat", selectedChat._id);
      console.log(data);
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (!newMessage.trim() && file) {
      try {
        event.preventDefault();
         const formData = new FormData();
         //formData.append('content', newMessage);
         formData.append('chatId', selectedChat._id);
         formData.append('file', file);
       
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
            //"Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        //setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/api/message",
          // {
          //   content: newMessage,
          //   chatId: selectedChat,
          // }
          formData,
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setNewMessage("");
        setFile(null); 
      } catch (error) {
        console.log(error.message);
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
    if (event.key === "Enter") {
      socket.emit("stop typing", selectedChat._id);
      if (!newMessage.trim() && !file) {
        return; // Si ni le message ni le fichier ne sont présents, on ne fait rien
      }
      if (newMessage.trim() && !file) {
      try {
        event.preventDefault();
         const formData = new FormData();
         formData.append('content', newMessage);
         formData.append('chatId', selectedChat._id);
         //formData.append('file', file);
       
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
            //"Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        //setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/api/message",
          // {
          //   content: newMessage,
          //   chatId: selectedChat,
          // }
          formData,
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setNewMessage("");
        setFile(null); 
      } catch (error) {
        console.log(error.message);
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
   
    if (newMessage.trim() && file) {
      try {
        event.preventDefault();
         const formData = new FormData();
         formData.append('content', newMessage);
         formData.append('chatId', selectedChat._id);
         formData.append('file', file);
       
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
            //"Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        //setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/api/message",
          // {
          //   content: newMessage,
          //   chatId: selectedChat,
          // }
          formData,
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setNewMessage("");
        setFile(null); 
      } catch (error) {
        console.log(error.message);
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
    }
  };
  // const sendMessage = async (event) => {
  //   if (event.key === "Enter" && (newMessage && file)) {
  //     socket.emit("stop typing", selectedChat._id);
      
  //     try {
  //       event.preventDefault();
  //        const formData = new FormData();
  //        formData.append('content', newMessage);
  //        formData.append('chatId', selectedChat._id);
  //        formData.append('file', file);
       
  //       const config = {
  //         headers: {
  //           "Content-type": "multipart/form-data",
  //           //"Content-type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       };
  //       //setNewMessage("");
  //       const { data } = await axios.post(
  //         "http://localhost:5000/api/message",
  //         // {
  //         //   content: newMessage,
  //         //   chatId: selectedChat,
  //         // }
  //         formData,
  //         config
  //       );
  //       socket.emit("new message", data);
  //       setMessages([...messages, data]);
  //       setNewMessage("");
  //       setFile(null); 
  //     } catch (error) {
  //       console.log(error.message);
  //       toast({
  //         title: "Error Occured!",
  //         description: "Failed to send the Message",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //     }
  //   }
  // };
  // Effect hook for initializing socket connection
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  //Effect hook for fetching messages when the selected chat changes
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  // Effect hook for handling incoming messages
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {

        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
          console.log(notification, "notification bell-icon check");
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
/*
/ Mettez à jour la fonction typingHandler pour gérer la sélection de fichier
const typingHandler = (e) => {
  if (e.target.name === 'images') {
    setFile(e.target.files[0]);
    return;
  }
  setNewMessage(e.target.value);
  // Le reste du code reste inchangé
};
*/
  const typingHandler = (e) => {
    if (e.target.name === 'file') {
   setFile(e.target.files[0]);
    return;
  }
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages && !selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}

          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={6}
            mt={6}
            bg="#E8E8E8"
            w="100%"
            h="86%"
            borderRadius="lg"
            overflowY="hidden"
            position="relative"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
              position="absolute"
              bottom="0"
              left="0"
              right="0"
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    height={40}
                    width={50}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>

                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />
                <input
        type="file"
        onChange={handleFileChange}
        name="file" // Ajoutez un nom au champ pour le différencier
      /> 
                <SendAudioModal>
                  <Button
                    rightIcon={<BsMicFill />}
                    padding="5px"
                  >
                    Send
                  </Button>
                </SendAudioModal>
                
                       
              </div>
              
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
        <div>
          <img src={Robo} alt="robo" />
        </div>
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;