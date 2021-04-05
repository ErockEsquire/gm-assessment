import React, { useState, useEffect } from "react";
import "./App.css";
import Welcome from "./components/Welcome/welcome"
import Header from "./components/Header/Header";
import Projects from "./components/Project/Projects"
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([])
  const [welcome, setWelcome] = useState(true);
  const url = "http://localhost:3000/";

  //useEffect to remove welcome element
  useEffect(() => {
    setTimeout(() => setWelcome(false), 3000);
  })

  //fetch data from projects route
  useEffect(() => {
    const fetchData = async () => {
      const projectsResponse = await axios.get(url + "projects")
      setProjects(projectsResponse.data)
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {welcome && <Welcome />}
      <Header />
      <Projects projects={projects}/>
    </div>
  );
}

export default App;