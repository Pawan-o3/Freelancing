import React, { useEffect, useState } from 'react';
import '../../styles/client/ClientApplications.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const ProjectApplications = () => {
  const [applications, setApplications] = useState([]);
  const [displayApplications, setDisplayApplications] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    await axios.get(`${API_BASE_URL}/fetch-applications`).then((response) => {
      const filtered = response.data.filter(app => app.clientId === localStorage.getItem('userId'));
      setApplications(filtered);
      setDisplayApplications(filtered.reverse());
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    if (applications.length > 0) {
      const titles = [...new Set(applications.map(app => app.title))];
      setProjectTitles(titles);
    }
  }, [applications]);

  const handleApprove = async (id) => {
    await axios.get(`${API_BASE_URL}/approve-application/${id}`).then(() => {
      alert("Application approved");
      fetchApplications();
    }).catch(() => alert("Operation failed!"));
  };

  const handleReject = async (id) => {
    await axios.get(`${API_BASE_URL}/reject-application/${id}`).then(() => {
      alert("Application rejected");
      fetchApplications();
    }).catch(() => alert("Operation failed!"));
  };

  const handleFilterChange = (value) => {
    if (value === '') setDisplayApplications(applications.reverse());
    else setDisplayApplications(applications.filter(app => app.title === value).reverse());
  };

  return (
    <div className="client-applications-page">
      {projectTitles.length > 0 && (
        <span>
          <h3>Applications</h3>
          <select className='form-control' onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">All Projects</option>
            {projectTitles.map((title) => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </span>
      )}

      <div className="client-applications-body">
        {displayApplications.map((application) => (
          <div className="client-application" key={application._id}>
            <div className="client-application-body">
              <div className="client-application-half">
                <h4>{application.title}</h4>
                <p>{application.description}</p>
                <span>
                  <h5>Skills</h5>
                  <div className="application-skills">
                    {application.requiredSkills.map((skill) => (
                      <p key={skill}>{skill}</p>
                    ))}
                  </div>
                </span>
                <h6>Budget - ₹{application.budget}</h6>
              </div>

              <div className="vertical-line"></div>

              <div className="client-application-half">
                <span>
                  <h5>Proposal</h5>
                  <p>{application.proposal}</p>
                </span>
                <span>
                  <h5>Skills</h5>
                  <div className="application-skills">
                    {application.freelancerSkills.map((skill) => (
                      <p key={skill}>{skill}</p>
                    ))}
                  </div>
                </span>
                <h6>Proposed Budget - ₹{application.bidAmount}</h6>
                <div className="approve-btns">
                  {application.status === 'Pending' ? (
                    <>
                      <button className="btn btn-success" onClick={() => handleApprove(application._id)}>Approve</button>
                      <button className="btn btn-danger" onClick={() => handleReject(application._id)}>Decline</button>
                    </>
                  ) : (
                    <h6>Status: <b>{application.status}</b></h6>
                  )}
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectApplications;
