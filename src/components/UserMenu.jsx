import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/features/auth/authSlice";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        console.log("Logged out successfully.");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  if (!user) {
    return null; // Jeżeli użytkownik nie jest zalogowany, nic nie wyświetlaj
  }

  return (
    <Box bg="white" p="4" mt="4" borderWidth="1px" borderRadius="lg">
      <Flex alignItems="center" justifyContent="flex-end">
        <Text mr="4">{user.email}</Text>
        <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default UserMenu;
