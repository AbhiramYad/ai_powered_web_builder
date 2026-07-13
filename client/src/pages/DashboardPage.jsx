import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../state/index.js';
import ProjectCard from '../components/ProjectCard.jsx';
import { getProjects, createProject, deleteProject } from '../services/projectService.js';
import '../styles/dashboard.css';

function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        actions.showToast('Failed to load projects.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleNewProject = async () => {
    try {
      const project = await createProject();
      navigate(`/builder/${project._id}`);
    } catch (err) {
      actions.showToast('Failed to create project.', 'error');
    }
  };

  const handleOpen = (id) => {
    navigate(`/builder/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
      actions.showToast('Project deleted.', 'success');
    } catch (err) {
      actions.showToast('Failed to delete project.', 'error');
    }
  };


  if (loading) {
    return (
      <div className="loading-state" style={{ flex: 1 }}>
        <div className="spinner" />
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Your Projects</h1>
          <p className="dashboard-subtitle">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="dashboard-new-btn" onClick={handleNewProject}>
          + New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="dashboard-empty">
          <p className="dashboard-empty-icon">&#9830;</p>
          <h2 className="dashboard-empty-title">No projects yet</h2>
          <p className="dashboard-empty-subtitle">Create your first project and start building with AI.</p>
          <button className="dashboard-new-btn" onClick={handleNewProject}>
            + Create First Project
          </button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onOpen={handleOpen}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;