import React from 'react';
import { Box, Flex, Button, Text, useColorModeValue, Grid } from '@chakra-ui/react';
import ProjectCard from './components/ProjectCard';
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Project() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  
  return (
    <>
      <Flex px="25px" justify="space-between" mt="130px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Project List
        </Text>
        <NavLink to="/admin/projects/add-project">
          <Button
            w="150px"
            minW="140px"
            variant="brand"
            fontWeight="500"
          >
            Add New Project
          </Button>
        </NavLink>

      </Flex>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1.34fr 1fr 1.62fr",
          }}
          templateRows={{
            base: "repeat(3, 1fr)",
            lg: "1fr",
          }}
          gap={{ base: "20px", xl: "20px" }}
        >
          <NavLink to="/admin/projects/1">
            <ProjectCard/>
          </NavLink>
        </Grid>
      </Box>
    </>
  );
}
