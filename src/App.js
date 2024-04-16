import React from "react";
import NavBar from "../src/Components/NavBar";
import { Route, Routes } from "react-router-dom";
import InsertForm from "./Components/InsertForm";
import ReadForm from "./Components/ReadForm";
import DeleteForm from "./Components/DeleteForm";
import UpdateForm from "./Components/UpdateForm";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<InsertForm />}></Route>
        <Route path="/read" element={<ReadForm />}></Route>
        <Route path="/delete" element={<DeleteForm />}></Route>
        <Route path="/update" element={<UpdateForm />}></Route>
      </Routes>
    </div>
  );
};

export default App;
