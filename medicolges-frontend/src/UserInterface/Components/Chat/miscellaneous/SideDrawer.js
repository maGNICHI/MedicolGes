import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../../Context/chat-context";
//import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  //MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, 
//  ChevronDownIcon
 } from "@chakra-ui/icons";
//import { Avatar } from "@chakra-ui/avatar";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { Input, Spinner } from "@chakra-ui/react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
//import NotificationBadge from "react-notification-badge";
//import { Effect } from "react-notification-badge";
import { getSender } from "../../../config/ChatLogics";
import Navbar from "../../Navbar";


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, setSelectedChat, chats, setChats, notification, setNotification } = useContext(ChatContext);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const logoutHandler = () => {
  //   localStorage.removeItem("userInformation");
  //   navigate("/");
  // };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChatCreateChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);
      if (!chats.find((chat) => chat._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      console.log(data, 'access new/existing chat response data');
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <React.Fragment>
      <Navbar />
      <div className="p-2 sideDrawer-section">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="5px 10px 5px 30px"
        boxShadow='lg'  
        rounded='md' 
        bg='white'
       >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" bg='#1990aa' onClick={onOpen} color="white"
            _hover={{ background: "#7ea7ab", color: "#7ac1b1" }} _active={{ background: "#7ea7ab", color: "#7ac1b1" }}>
            <i className="fas fa-search me-2"></i>
            <Text display={{ base: "none", md: "flex" }} m={0} fontWeight="bold">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="3xl" fontFamily="Work sans bold" fontWeight='bold' color="#1990aa">
          Chat
        </Text>
        <div >
          {/* <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} color="#1990aa" />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu> */}
          {/* <Menu>
            <MenuButton as={Button} bg="blue.700"  rightIcon={<ChevronDownIcon/>}  
              _hover={{background: "purple.800", color:"yellow.400"}} _active={{background: "purple.800", color:"yellow.400"}}>
              <Avatar size="sm" cursor="pointer" name={user.name} borderColor="black" borderWidth="2px" bg="yellow.400" color="black"/>
            </MenuButton>
            <MenuList bg = "purple.600" borderColor="black" borderWidth="2px">
              
              <MenuDivider/>
              <MenuItem fontWeight="bold" color="black" onClick={logoutHandler} _hover={{background: "yellow.400"}}>
                Logout
              </MenuItem> 
            </MenuList>
          </Menu> */}
        </div>
      </Box>
      </div>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => ( //user clicked on for chat
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChatCreateChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;