
import React, { useState } from 'react';
import './ProviderDashboard.css';

function ProviderDashboard() {
  const [showRequest, setShowRequest] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const providers = [
    {
      id: 1,
      initials: "JS",
      name: "John Smith",
      email: "john@provider.com",
      phone: "+1 (555) 123-4567",
      address: "123 Provider Lane, NY",
      platforms: ["Amazon Prime", "Netflix", "Disney Plus"],
    },
    {
      id: 2,
      initials: "JD",
      name: "Jane Doe",
      email: "jane@provider.com",
      phone: "+1 (555) 987-6543",
      address: "456 Provider Street, NY",
      platforms: ["Netflix", "Amazon Prime"],
    },
  ];

  const openRequest = (provider) => {
    setSelectedProvider(provider);
    setSelectedPlatform('');
    setFromDate('');
    setToDate('');
    setShowRequest(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPlatform || !fromDate || !toDate) {
      alert("Please select a platform and time duration.");
      return;
    }

    if (new Date(toDate) <= new Date(fromDate)) {
      alert("To date and time must be later than From date and time.");
      return;
    }

    alert("Request created successfully!");

    setShowRequest(false);
  };

  return (
    <div className="dashboard">

      {/* Navigation Bar */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">♧</div>
          <h1>
            Platform<span>Connect</span>
          </h1>
        </div>

        <div className="user-section">
          <div className="user-info">
            <strong>David Villa</strong>
            <small>davidvilla@gmail.com</small>
          </div>

          <div className="avatar">DV</div>

          <div className="logout">
            <span>⇥</span> Logout
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">

        <div className="section-header">
          <div>
            <h2>Available Providers</h2>
            <p>
              Browse and request services from registered
              platform providers.
            </p>
          </div>

          <div className="provider-count">
            2 Providers Found
          </div>
        </div>

        {/* Provider Cards */}
        <div className="provider-grid">
          {providers.slice(0, 1).map((provider) => (
            <div className="provider-card" key={provider.id}>

              <div className="provider-heading">
                <div className="provider-avatar">
                  {provider.initials}
                </div>
                <h3>{provider.name}</h3>
              </div>

              {/* Contact Details */}
              <div className="contact-details">
                <div>
                  <span className="contact-icon">✉</span>
                  {provider.email}
                </div>

                <div>
                  <span className="contact-icon">♧</span>
                  {provider.phone}
                </div>

                <div>
                  <span className="contact-icon">♧</span>
                  {provider.address}
                </div>
              </div>

              {/* Supported Platforms */}
              <div className="platform-section">
                <h4>SUPPORTED PLATFORMS</h4>

                <div className="platform-list">
                  {provider.platforms.map((platform) => (
                    <span className="platform-tag" key={platform}>
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Create Request Button */}
              <button
                className="request-button"
                onClick={() => openRequest(provider)}
              >
                <span>⊕</span> Create Request
              </button>

            </div>
          ))}
        </div>
      </main>

      {/* Create Request Modal */}
      {showRequest && selectedProvider && (
        <div className="modal-overlay">
          <div className="modal">

            <button
              className="modal-close"
              onClick={() => setShowRequest(false)}
              type="button"
            >
              ×
            </button>

            <h2>Create Request</h2>

            <p>
              Select a platform and time to request access from{' '}
              <strong>{selectedProvider.name}</strong>.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Available Platforms */}
              <div className="form-section">

                <label className="section-label">
                  AVAILABLE PLATFORMS <span>*</span>
                </label>

                <div className="platform-options">
                  {selectedProvider.platforms.map((platform) => (
                    <button
                      type="button"
                      key={platform}
                      className={`platform-option ${
                        selectedPlatform === platform ? 'selected' : ''
                      }`}
                      onClick={() => setSelectedPlatform(platform)}
                    >
                      {platform}
                    </button>
                  ))}
                </div>

              </div>

              {/* Time Duration */}
              <div className="form-section duration-section">

                <label className="section-label">
                  TIME DURATION <span>*</span>
                </label>

                <div className="date-time-row">

                  <div className="date-field">
                    <label htmlFor="fromDate">From</label>

                    <input
                      type="datetime-local"
                      id="fromDate"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="date-field">
                    <label htmlFor="toDate">To</label>

                    <input
                      type="datetime-local"
                      id="toDate"
                      value={toDate}
                      min={fromDate || undefined}
                      onChange={(e) => setToDate(e.target.value)}
                      required
                    />
                  </div>

                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowRequest(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={!selectedPlatform || !fromDate || !toDate}
                >
                  Submit Request
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default ProviderDashboard;
