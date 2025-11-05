import React, { useEffect, useState } from 'react';
import '../../styles/client/client.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const Client = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios.get(`${API_BASE_URL}/fetch-projects`).then((response) => {
      const pros = response.data.filter(pro => pro.clientId === localStorage.getItem('userId'));
      setProjects(pros);
      setDisplayProjects(pros.reverse());
    }).catch((err) => {
      console.log(err);
      fetchProjects();
    });
  };

  const handleFilterChange = (value) => {
    if (value === "") setDisplayProjects(projects);
    else if (value === "Un Assigned") setDisplayProjects(projects.filter(p => p.status === "Available").reverse());
    else if (value === "In Progress") setDisplayProjects(projects.filter(p => p.status === "Assigned").reverse());
    else if (value === "Completed") setDisplayProjects(projects.filter(p => p.status === "Completed").reverse());
  };

  return (
    <div className="client-projects-page">
      <div className="client-projects-list">
        <div className="client-projects-header">
          <h3>My projects</h3>
          <select className='form-control' onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">Choose project status</option>
            <option value="Un Assigned">Un Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <hr />
        {displayProjects.map((project) => (
          <div className="listed-project" key={project._id} onClick={() => navigate(`/client-project/${project._id}`)}>
            <div className='listed-project-head'>
              <h3>{project.title}</h3>
              <p>{String(project.postedDate).slice(0, 25)}</p>
            </div>
            <h5>Budget - ₹{project.budget}</h5>
            <p>{project.description}</p>
            <div className="bids-data">
              <h6>Status - {project.status}</h6>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
