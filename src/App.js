//import './App.css';
import React from 'react';
import Register from "./Register";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Home from './Home';
import Dashboard from './Dashboard';
import TodoApp from './todos/TodoApp';

function getUserToken(){
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token
}

function getUser(){
  const user = JSON.parse(localStorage.getItem('user'));
  return user?user:{};
}

function App() {
const user = getUser();
const userToken = getUserToken();
//console.log(userToken);
//console.log(user);

if(userToken){
  return (
    <div className="App">
      <Dashboard user={user} />
    </div>
  );
}

return (
	<div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/todos" element={<TodoApp/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
	</div>
	
);
}

export default App;
