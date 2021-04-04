import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/header";
import Projects from "./components/Project/project"
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([])

  const url = "http://localhost:3000/";
  useEffect(() => {
    const fetchData = async () => {
      const projectsResponse = await axios.get(url + "projects")
      setProjects(projectsResponse.data)
    };
    fetchData();
  }, []);
  console.log(projects)

  return (
    <div className="App">
      <Header />
      <Projects projects={projects}/>
    </div>
  );
}

export default App;
