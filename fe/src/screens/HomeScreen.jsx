import React from 'react';
import { Helmet } from 'react-helmet';

const HomeScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1 className="text-4xl font-bold">Welcome to the Home Screen!</h1>
    </div>
  );
};

export default HomeScreen;
