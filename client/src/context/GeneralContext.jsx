import React, { createContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const WS = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5500';
  const socket = io(WS);

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  const login = async () => {
    try {
      const loginInputs = { email, password };
      const res = await axios.post(`${WS}/login`, loginInputs);
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('usertype', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.usertype === 'freelancer') navigate('/freelancer');
      else if (res.data.usertype === 'client') navigate('/client');
      else if (res.data.usertype === 'admin') navigate('/admin');
    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  };

  const register = async () => {
    try {
      const inputs = { username, email, usertype, password };
      const res = await axios.post(`${WS}/register`, inputs);

      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('usertype', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.usertype === 'freelancer') navigate('/freelancer');
      else if (res.data.usertype === 'client') navigate('/client');
      else if (res.data.usertype === 'admin') navigate('/admin');
    } catch (err) {
      alert("Registration failed!");
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <GeneralContext.Provider
      value={{
        socket,
        login,
        register,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
