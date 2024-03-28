import React, {useContext, useEffect, useState} from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import ChatContext from "../../Context/chat-context";
import { formatDate } from "../Chat/util/DateUtil";

const ScrollableChat = ({ messages }) => {
  
  const { user } =  useContext(ChatContext);
  const [blobUrls, setBlobUrls] = useState([]);
  useEffect(() => {
    const fetchBlobUrls = async () => {
      const urls = await Promise.all(messages.map(async (message) => {
        if (message.isMedia) {
          const uint8Array = Uint8Array.from(message.buffer);
          const blob = new Blob([uint8Array], { type: 'audio/wav' });
          return URL.createObjectURL(blob);
        }
        return null;
      }));
      setBlobUrls(urls);
      //console.log( setBlobUrls(urls));
    };

    fetchBlobUrls();
    //console.log(fetchBlobUrls());
  }, [messages]);
//console.log(messages);
//console.log(fetchBlobUrls);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => (
          <div style={{ display: "flex" }} key={message._id}>
            {(isSameSender(messages, message, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={message.sender.username} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.username}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, message, i, user._id),
                marginTop: isSameUser(messages, message, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
             {
                !message.isMedia ?
                  ( <>
                  <span>{message.content}</span>
                  
                </>) :
                  (
                    <audio controls>
                      <source src={blobUrls[i]} type="audio/wav" />
                    </audio>
                  )
              }
              {/* <span className="message-item-time-text">{formatDate(message.updatedAt)}</span> */}
              <span style={{ marginLeft: "10px", fontSize: "12px", color: "gray" }}>
                {formatDate(message.createdAt)}
              </span>
            </span>
            
          </div>
        ))}
        <div id='only-audio'></div>
    </ScrollableFeed>
  );
};

export default ScrollableChat;