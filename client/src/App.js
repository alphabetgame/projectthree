import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navigation from "./components/Nav";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Gameloader from "./pages/Gameloader";
import "./index.css";
import "./App.css";




const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  
  
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <Header></Header> */}
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/game"
              element={<Game />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/game/:level" element={<Gameloader />} />
            
          </Routes>

      
        </div>
        <Footer></Footer>
      </Router>
    </ApolloProvider>
  );
}

export default App;
