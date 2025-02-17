import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
//import cargoCoverImage from '../../Assets/cargo cover solution.jpg'; 

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('schedules');
  const [fromPort, setFromPort] = useState('');
  const [toPort, setToPort] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Header Section */}
      <section className="header-section">
        <h1 className="main-title">Welcome to our Shipping & Logistics Company</h1>
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
      </section>

      {/* Our Solutions Section */}
      <section className="solutions-section">
        <div className="container">
          <h2>Our Solutions</h2>
          <p>
            As a global leader in container shipping, our worldwide teams of industry-specific experts offer round-the-clock personalized service. We ensure fast and reliable transit times, providing the best solutions for your needs.
          </p>
          <div className="solutions-container">
            <div className="solution">
              <h3>Shipping Solutions</h3>
            </div>
            <div className="solution">
              <h3>Inland Transportation & Logistics Solutions</h3>
            </div>
            <div className="solution">
              <h3>Air Cargo Solutions</h3>
            </div>
            <div className="solution">
              <h3>Digital Business Solutions</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
