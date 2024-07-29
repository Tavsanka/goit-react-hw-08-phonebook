import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";
import Contacts from "../pages/Contacts";
import Navigation from "./Navigation";
import PrivateRoute from "./PrivateRoute";
import UserMenu from "./UserMenu";
import "./App.scss";

const App = () => {
  return (
    <ChakraProvider>
      <Router basename="/goit-react-hw-08-phonebook">
        <Box>
          <Navigation />
          <UserMenu /> {/* Dodaj UserMenu tutaj */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <Contacts />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
