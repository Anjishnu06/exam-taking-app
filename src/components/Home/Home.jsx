import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../assets/Home.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className>
      Hello Welcome to Home
    </div>
  );
};