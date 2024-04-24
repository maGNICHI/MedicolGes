import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatProvider from "./UserInterface/Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Chat from "./Chat/Chat";
import { FaRobot } from "react-icons/fa";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

const queryClient = new QueryClient();

const Root = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter forceRefresh={true}>
             <ChatProvider>
              <ChakraProvider>
                <QueryClientProvider client={queryClient}>
                  <div className="app-container position-absolute left-1">
                    <div className="app-container">
                      <div className="chat-container">
                        {showChat && <Chat />}
                      </div>
                    </div>
                    <div className="chat-button-container">
                      <button className="chat-button" onClick={toggleChat}>
                        <FaRobot className="chat-icon" />
                      </button>
                    </div>
                  </div>
                  <App />
                </QueryClientProvider>
              </ChakraProvider>
            </ChatProvider>
         </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Root />);

reportWebVitals();
