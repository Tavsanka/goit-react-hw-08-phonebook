import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/auth/authSlice";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Alert,
} from "@chakra-ui/react";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <Box
      maxWidth="500px"
      margin="auto"
      padding="2rem"
      boxShadow="md"
      bg="white">
      <Heading as="h2" size="lg" textAlign="center" mb="1.5rem">
        Register
      </Heading>
      {error && <Alert status="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb="1rem">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormControl>
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
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
