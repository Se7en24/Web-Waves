import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserDashboard.css";

import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Menu, 
  MenuItem 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle"; // Import AccountCircle icon
import Logo from '../../Assets/Logo.jpg'; // Import the logo

const Dashboard = () => {
  const [fromPort, setFromPort] = useState('');
  const [toPort, setToPort] = useState('');
  const [date, setDate] = useState('');
  const [userDetails, setUserDetails] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for the menu anchor
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schedules');

  const fetchUserDetails = () => {
    setUserDetails(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const menuItems = [
    "Dashboard",
    "eBookings",
    "Shipping Instructions",
    "Free time Detention Demurrage",
    "My Profile"
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Clear user details as well
    toast.success("Logged out successfully!");
    navigate("/", { replace: true }); // Redirect to the home page and replace the current entry
    // No need for window.location.reload() as the navigation will handle it
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the menu
  };

  const drawerList = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((text, index) => (
          <ListItem button key={text} onClick={() => {
            navigate(`/${text.replace(" ", "").toLowerCase()}`);
          }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <AppBar position="fixed" style={{ backgroundColor: 'white', color: '#333' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div className="navbar-logo" style={{ flexGrow: 1, marginLeft: '750px' }}>
            <Link to="/dashboard">
              <img src={Logo} alt="Logo" style={{ height: '40px' }} />
            </Link>
          </div>
          <div className="navbar-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="#search" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Search</Link>
            <Link to="#tracking" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Tracking</Link>
            
            {/* User Profile Button */}
            <Button
              onClick={handleProfileClick}
              style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}
            >
              <Typography variant="subtitle1" style={{ marginRight: '10px' }}>
                {userDetails ? userDetails.name : "Guest"}
              </Typography>
              <AccountCircle style={{ fontSize: '30px', color: '#333' }} />
            </Button>
            {/* User Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
      <div className="header-section">
        <h1 className="main-title">Welcome to Your Dashboard</h1>
        <div className="tracking-container">
          <div className="tracking-tabs">
            <button 
              className={`tab ${activeTab === 'tracking' ? 'active' : ''}`}
              onClick={() => setActiveTab('tracking')}
            >
              TRACKING
            </button>
            <button 
              className={`tab ${activeTab === 'schedules' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedules')}
            >
              SCHEDULES
            </button>
            <button 
              className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              CONTACTS
            </button>
          </div>
          {activeTab === 'tracking' && (
            <div className="tracking-content">
              <div className="tracking-options">
                <label>
                  <input type="radio" name="tracking" value="container" defaultChecked />
                  Container / Bill of Lading Number
                </label>
                <label>
                  <input type="radio" name="tracking" value="booking" />
                  Booking Number
                </label>
              </div>
              <input type="text" placeholder="Search..." className="search-input" />
            </div>
          )}
          {activeTab === 'schedules' && (
            <div className="schedules-content">
              <div className="port-inputs">
                <input
                  type="text"
                  placeholder="From (Port)"
                  className="port-input"
                  value={fromPort}
                  onChange={(e) => setFromPort(e.target.value)}
                />
                <button className="swap-button" onClick={() => {
                  const temp = fromPort;
                  setFromPort(toPort);
                  setToPort(temp);
                }}>⇄</button>
                <input
                  type="text"
                  placeholder="To (Port)"
                  className="port-input"
                  value={toPort}
                  onChange={(e) => setToPort(e.target.value)}
                />
              </div>
              <input
                type="date"
                className="date-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button
                className="search-button"
                onClick={() => navigate(`/shipschedules?from=${fromPort}&to=${toPort}&date=${date}`)}
              >
                Search
              </button>
            </div>
          )}
          {activeTab === 'contacts' && (
            <div className="contacts-content">
              {/* Add contacts content here */}
              <p>Contacts information will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
      <div className="main-content">
        {/* Removed the tracking box below the background image */}
      </div>
    </div>
  );
};

export default Dashboard;
