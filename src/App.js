// src/App.js
import React from 'react';
import FormBuilder from './components/FormBuilder';
import './App.css';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <FormBuilder />
      <Toaster />
    </div>
  );
};

export default App;