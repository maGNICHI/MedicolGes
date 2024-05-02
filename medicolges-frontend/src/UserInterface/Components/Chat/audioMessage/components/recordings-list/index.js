import React, {useState, useEffect,useContext} from 'react';
import useRecordingsList from '../../hooks/use-recordings-list';
import { AiFillWarning } from 'react-icons/ai'
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
//import { ChatState } from '../../../../../Context/ChatProvider';
import ChatContext from "../../../../../Context/chat-context";
import {Buffer} from 'buffer';
import { io } from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';

const RecordingsList = ({ audio}) => {
   const { recordings, deleteAudio } = useRecordingsList(audio);
   //const { user, selectedChat } = ChatState();
   const { user, selectedChat } = useContext(ChatContext);
   const toast=useToast();
   const [socket, setSocket] = useState(null);

   const getUint8ArrayFromBlobUrl= async (blobUrl) => {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      return uint8Array;
   }
   useEffect(() => {
      // Initialize Socket.IO connection
      const newSocket = io(ENDPOINT);
      setSocket(newSocket);
  
      return () => newSocket.close(); // Clean up connection on unmount
    }, []);
   const sendAudio = async () => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
               'Content-Type': 'application/json'
            }
         };

         const Uint8A=await getUint8ArrayFromBlobUrl(recordings[0].audio);
         const buffer=Buffer.from(Uint8A)
         const { data } =await axios.post('http://localhost:5000/api/message', {
            content: 'Audio Message',
            chatId: selectedChat._id,
            isMedia: true,
            buffer
         }, config);
        // console.log(Uint8A);
         //console.log(buffer);
         socket.emit('new audio', data);
         console.log(data);
      } catch (err) {
         toast({
            title: "Error Occured!",
            description: "Failed to send the Message",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         console.log(err);
      }
      
   }

   return (
      <div>
         <div className="recordings-container">
            {recordings.length > 0 ? (
               <>
                  <h1>Your recordings</h1>
                  <div className="recordings-list">
                     {recordings.map((record) => (
                        <div className="record" key={record.key}>
                           <audio controls src={record.audio} />
                           <div className="delete-button-container">
                              <button
                                 className="delete-button"
                                 title="Delete this audio"
                                 onClick={() => deleteAudio(record.key)}
                              >
                                 Delete audio
                              </button>
                           </div>
                        </div>
                     ))}
                     <button className='send-button' onClick={sendAudio}>
                        Send audio
                     </button>
                  </div>
               </>
            ) : (
               <div className="no-records">
                  <AiFillWarning size={50} />
                  <span>You don't have records to send</span>
               </div>
            )}
         </div>
      </div>
   )
}

export default RecordingsList;