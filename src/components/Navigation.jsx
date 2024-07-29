import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex, Link } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Flex
      as="nav"
      bg="teal.500"
      p="4"
      color="white"
      justifyContent="space-between">
      <Box>
        <Link
          as={NavLink}
          to="/login"
          mr="4"
          color="white"
          _hover={{ textDecoration: "none" }}>
          Login
        </Link>
        <Link
          as={NavLink}
          to="/register"
          mr="4"
          color="white"
          _hover={{ textDecoration: "none" }}>
          Register
        </Link>
      </Box>
      <Link
        as={NavLink}
        to="/contacts"
        color="white"
        _hover={{ textDecoration: "none" }}>
        Contacts
      </Link>
    </Flex>
  );
};

export default Navigation;
