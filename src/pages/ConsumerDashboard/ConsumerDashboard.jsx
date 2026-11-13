import React, { useState } from "react";
import "./ConsumerDashboard.css";

const initialRequests = [
  {
    id: 1,
    name: "Alexander Richardson",
    initials: "AR",
    platform: "Netflix",
    fromDateTime: "2026-06-20T10:00",
    toDateTime: "2026-06-21T19:00",
    color: "blue",
  },
  {
    id: 2,
    name: "Alexis Thomas",
    initials: "AT",
    platform: "Disney Plus",
    fromDateTime: "2026-06-20T11:00",
    toDateTime: "2026-06-22T20:00",
    color: "pink",
  },
  {
    id: 3,
    name: "James Peter",
    initials: "JP",
    platform: "Amazon Prime",
    fromDateTime: "2026-06-20T09:00",
    toDateTime: "2026-06-21T08:00",
    color: "red",
  },
];

// Format date and time
const formatDateTime = (value) => {
  if (!value) return "Not specified";

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

function App() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: action }
          : request
      )
    );

    setSelectedRequest(null);
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">♧</div>
          <h1>
            Platform<span>Connect</span>
          </h1>
        </div>

        <div className="user-section">
          <div className="user-info">
            <strong>John Smith</strong>
            <span>john@provider.com</span>
          </div>

          <div className="user-avatar">JS</div>

          <div className="header-divider" />

          <button
            className="logout-btn"
            onClick={() => alert("Logged out")}
          >
            <span>⇥</span> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-layout">

        <section className="requests-card">

          <div className="requests-header">
            <div>
              <h2>Incoming Requests</h2>
              <p>Manage requests from consumers here.</p>
            </div>

            <span className="total-badge">
              {requests.filter((r) => !r.status).length} Total
            </span>
          </div>

          {/* Request List */}
          <div className="request-list">

            {requests.map((request) => (
              <div className="request-item" key={request.id}>

                <div className={'request-avatar ${request.color}'}>
                  {request.initials}
                </div>

                <div className="request-details">

                  <div className="name-row">
                    <h3>{request.name}</h3>

                    <span
                      className={`status ${
                        request.status
                          ? request.status.toLowerCase()
                          : "pending"
                      }`}
                    >
                      {request.status || "PENDING"}
                    </span>
                  </div>

                  <div className="request-meta">
                    Requested <strong>{request.platform}</strong>
                  </div>

                  <div className="request-time">
                    <span>
                      From: {formatDateTime(request.fromDateTime)}
                    </span>

                    <span>
                      To: {formatDateTime(request.toDateTime)}
                    </span>
                  </div>

                </div>

                <button
                  className="view-btn"
                  onClick={() => setSelectedRequest(request)}
                >
                  View Details
                </button>

              </div>
            ))}

            {requests.length === 0 && (
              <p className="empty-state">
                No incoming requests.
              </p>
            )}

          </div>
        </section>

        {/* Profile Summary */}
        <aside className="profile-card">

          <div className="profile-heading">
            <div className="profile-icon">♙</div>
            <h2>Profile Summary</h2>
          </div>

          <div className="profile-divider" />

          <div className="profile-content">

            <label>EMAIL</label>
            <p>john@provider.com</p>

            <label className="platform-label">
              MY PLATFORMS
            </label>

            <div className="platform-tags">
              <span>Amazon Prime</span>
              <span>Netflix</span>
              <span>Disney Plus</span>
            </div>

          </div>
        </aside>

      </main>

      {/* Request Details Modal */}
      {selectedRequest && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedRequest(null)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedRequest(null)}
            >
              ×
            </button>

            <h2>Request Details</h2>

            <div className="modal-user">

              <div className={'request-avatar ${selectedRequest.color}'}>
                {selectedRequest.initials}
              </div>

              <div>
                <h3>{selectedRequest.name}</h3>
                <span>Consumer Request</span>
              </div>

            </div>

            <div className="modal-info">

              <p>
                <strong>Platform:</strong>{" "}
                {selectedRequest.platform}
              </p>

              <p>
                <strong>From Date & Time:</strong>
                <br />
                {formatDateTime(selectedRequest.fromDateTime)}
              </p>

              <p>
                <strong>To Date & Time:</strong>
                <br />
                {formatDateTime(selectedRequest.toDateTime)}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedRequest.status || "PENDING"}
              </p>

            </div>

            {!selectedRequest.status && (

              <div className="modal-actions">

                <button
                  className="reject-btn"
                  onClick={() =>
                    handleAction(selectedRequest.id, "REJECTED")
                  }
                >
                  Reject
                </button>

                <button
                  className="accept-btn"
                  onClick={() =>
                    handleAction(selectedRequest.id, "ACCEPTED")
                  }
                >
                  Accept Request
                </button>

              </div>

            )}

          </div>
        </div>

      )}

    </div>
  );
}

export default App;