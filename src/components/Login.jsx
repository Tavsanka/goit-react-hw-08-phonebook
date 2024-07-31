import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/features/auth/authSlice";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { error, token } = useSelector((state) => state.auth);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      console.log("Error occurred:", error);
      toast({
        title: "Login error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      dispatch(clearError());
    }

    if (token) {
      navigate("/contacts"); // Przekierowanie po zalogowaniu
    } else {
      // Resetowanie formularza po wylogowaniu
      setFormData({ email: "", password: "" });
    }
  }, [error, dispatch, toast, token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <Box
      maxWidth="500px"
      margin="auto"
      padding="2rem"
      boxShadow="md"
      bg="white">
      <Heading as="h2" size="lg" textAlign="center" mb="1.5rem">
        Login
      </Heading>
      {error && (
        <Alert status="error" mb="1rem">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb="1rem">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl id="password" mb="1.5rem">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
