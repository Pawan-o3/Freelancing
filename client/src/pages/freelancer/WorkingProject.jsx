import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/freelancer/WorkingProject.css';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

const WorkingProject = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  const fetchAssignedProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/fetch-projects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const userId = localStorage.getItem('userId');
      const assigned = res.data.filter(
        proj => proj.freelancerId === userId && proj.status === 'Assigned'
      );

      setProjects(assigned.reverse());
    } catch (err) {
      console.error('Failed to load working projects:', err);
    }
  };

  return (
    <div className="working-projects-page">
      <h3>Working Projects</h3>
      {projects.length === 0 ? (
        <p>No projects currently assigned.</p>
      ) : (
        projects.map(project => (
          <div
            className="working-project-card"
            key={project._id}
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <h6>Budget: ₹{project.budget}</h6>
            <p>Status: {project.status}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default WorkingProject;
