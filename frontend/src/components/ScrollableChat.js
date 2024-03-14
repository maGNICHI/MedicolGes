import React, {useContext, useEffect, useState} from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import ChatContext from "../Context/chat-context";

const ScrollableChat = ({ messages }) => {

  const { user } =  useContext(ChatContext);
  const binaryToBlob = async (binary) => {
    const uint8Array = Uint8Array.from(binary);
    const blob = new Blob([uint8Array], { type: 'audio/wav' });
    const blobUrl = URL.createObjectURL(blob);
    console.log(blobUrl);
    return blobUrl;
 }
//console.log(messages);
//console.log(fetchBlobUrls);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => (
          <div style={{ display: "flex" }} key={message._id}>
            {(isSameSender(messages, message, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={message.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                />
              </Tooltip>
            )}
            <span
              style={{
                //display: "flex",
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
                        (<span>{message.content}</span>) :
                        (
                           <audio controls>
                              <source src={binaryToBlob(message.buffer)} type="audio/mpeg"/>
                           </audio>
                        )

                  }
            </span>
          </div>
        ))}
        <div id='only-audio'></div>
    </ScrollableFeed>
  );
};

export default ScrollableChat;