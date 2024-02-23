import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const submitHandler = async () => {
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      // Conf des en-têtes pour la req Axios
      const config = {
        headers: { "Content-type": "application/json" },
      };
// Envoi req POST au serveur avec les info de cnx
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
//Stockage des info de l'user dans le stockage local
      localStorage.setItem("userInformation", JSON.stringify(data));
      //Navigation vers la page "/chats" après une cnx réussie
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            placeholder="Enter password"
          />
        </InputGroup>
      </FormControl>
      <Button
        fontWeight="bold"
        colorScheme="teal"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
