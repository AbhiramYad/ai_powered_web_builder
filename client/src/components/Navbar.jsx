import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { actionCreators } from '../state/index.js';
import { logout as logoutAPI } from '../services/authService.js';
import '../styles/navbar.css';

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const actions = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try { await logoutAPI(); } catch (error) { /* optional */ }
    actions.logout();
    actions.showToast('Logged out successfully', 'success');
    navigate('/login');
  };


  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand">
          <span className="navbar-brand-mark">&lt;/&gt;</span> AiBuild
        </Link>
        <div className="navbar-links">
          <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}>
            My Projects
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-user-badge">
          {user && user.name ? user.name.charAt(0).toUpperCase() : '?'}
        </div>
        <span className="navbar-username">{user && user.name ? user.name : ''}</span>
        <button className="navbar-logout" onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  );
}

export default Navbar;