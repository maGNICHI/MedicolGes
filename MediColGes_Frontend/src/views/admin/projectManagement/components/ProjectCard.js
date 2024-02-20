import React from "react";

// Chakra imports
import { Flex, Box, Icon, Text, Spacer } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";

// Assets
import bgMastercard from "assets/img/dashboards/Debit.png";
import { RiMastercardFill } from "react-icons/ri";

export default function ProjectCard() {
  // Chakra Color Mode
  return (
    <Card
      backgroundImage={bgMastercard}
      backgroundRepeat="no-repeat"
      bgSize="cover"
      alignSelf="center"
      w={{ base: "100%", md: "60%", xl: "99%" }}
      bgPosition="10%"
      mx="auto"
      p="20px"
    >
      <Flex direction="column" color="white" h="100%" w="100%">
        <Flex justify="space-between" align="center" mb="37px">
          <Text fontSize="2xl" fontWeight="bold">
            Project 1: Breast Cancer
          </Text>
          <Icon as={RiMastercardFill} w="48px" h="auto" color="gray.400" />
        </Flex>
        <Spacer />
        <Flex direction="column">
          <Flex mt="14px">
            <Text fontSize="s">
              Created By: &nbsp;
              <Text as="span" fontSize="s" fontWeight="bold">
                Dr Eya Araari
              </Text>
            </Text>
          </Flex>
          <Flex mt="14px">
            <Text fontSize="s">
              Under: &nbsp;
              <Text as="span" fontSize="s" fontWeight="bold">
                Esprit University
              </Text>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
