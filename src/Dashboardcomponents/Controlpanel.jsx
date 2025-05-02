import { useState, useEffect } from "react";

export default function ControlPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [panels, setPanels] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockData = [
        {
          id: 1,
          name: "System Configuration",
          description: "Configure core system settings and parameters",
          icon: "⚙️",
          lastAccessed: new Date().toISOString().split("T")[0],
          status: "active",
          accessLevel: "admin",
          stats: {
            users: 142,
            changes: 28,
            alerts: 3,
          },
        },
        {
          id: 2,
          name: "User Management",
          description: "Manage user accounts, roles and permissions",
          icon: "👥",
          lastAccessed: "2023-06-14",
          status: "active",
          accessLevel: "admin",
          stats: {
            users: 256,
            changes: 42,
            alerts: 7,
          },
        },
        {
          id: 3,
          name: "Database Admin",
          description: "Database maintenance and query tools",
          icon: "🗄️",
          lastAccessed: "2023-06-10",
          status: "maintenance",
          accessLevel: "superadmin",
          stats: {
            users: 89,
            changes: 15,
            alerts: 2,
          },
        },
        {
          id: 4,
          name: "Security Settings",
          description: "Configure security protocols and access controls",
          icon: "🔒",
          lastAccessed: "2023-06-08",
          status: "active",
          accessLevel: "superadmin",
          stats: {
            users: 76,
            changes: 19,
            alerts: 1,
          },
        },
        {
          id: 5,
          name: "Backup & Restore",
          description: "System backup and recovery tools",
          icon: "💾",
          lastAccessed: "2023-05-28",
          status: "inactive",
          accessLevel: "admin",
          stats: {
            users: 53,
            changes: 8,
            alerts: 0,
          },
        },
      ];

      setPanels(mockData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredPanels = panels.filter(
    (panel) =>
      panel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      panel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenPanel = (panelId) => {
    // In a real app, this would redirect to the actual panel
    alert(`Opening Control Panel ${panelId}`);
    setSelectedPanel(null);
  };

  const handleRefresh = () => {
    // Simulate refresh
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="control-panel-container">
      <div className="control-panel-content">
        {/* Header with search and actions */}
        <div className="control-panel-header">
          <div>
            <h1 className="control-panel-title">Control Panels</h1>
            <p className="control-panel-subtitle">
              Administrative tools and system configurations
            </p>
          </div>

          <div className="control-panel-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search control panels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button onClick={handleRefresh} className="refresh-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            {/* Control Panels List */}
            <div className="panels-grid">
              {filteredPanels.length > 0 ? (
                filteredPanels.map((panel) => (
                  <div
                    key={panel.id}
                    onClick={() => setSelectedPanel(panel)}
                    className={`panel-card ${panel.status}`}
                  >
                    <div className="panel-icon">{panel.icon}</div>

                    <div className="panel-details">
                      <div className="panel-title-container">
                        <h3 className="panel-name">{panel.name}</h3>
                        <span className={`access-level ${panel.accessLevel}`}>
                          {panel.accessLevel}
                        </span>
                      </div>
                      <p className="panel-description">{panel.description}</p>
                      <div className="panel-meta">
                        <span>Last accessed: {panel.lastAccessed}</span>
                        <div className="statuspanel">
                          <span>Status:</span>
                          <span className={`status ${panel.status}`}>
                            {panel.status.charAt(0).toUpperCase() +
                              panel.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <svg
                      className="panel-arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h3>No control panels found</h3>
                  <p>Try adjusting your search query</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Control Panel Details Modal */}
      {selectedPanel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setSelectedPanel(null)}
              className="modal-close-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-body">
              <div className="modal-header">
                <div className="modal-icon">{selectedPanel.icon}</div>

                <div>
                  <h2 className="modal-title">{selectedPanel.name}</h2>
                  <div className="modal-badges">
                    <span className={`status-badge ${selectedPanel.status}`}>
                      {selectedPanel.status}
                    </span>
                    <span
                      className={`access-badge ${selectedPanel.accessLevel}`}
                    >
                      {selectedPanel.accessLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="modal-tabs">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`tab-button ${
                    activeTab === "overview" ? "active" : ""
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`tab-button ${
                    activeTab === "settings" ? "active" : ""
                  }`}
                >
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab("access")}
                  className={`tab-button ${
                    activeTab === "access" ? "active" : ""
                  }`}
                >
                  Access Control
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div>
                  <div className="modal-section">
                    <h3>Description</h3>
                    <p>{selectedPanel.description}</p>
                  </div>

                  <h3>Quick Stats</h3>

                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-label">Active Users</div>
                      <div className="stat-value">
                        {selectedPanel.stats.users}
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-label">Recent Changes</div>
                      <div className="stat-value">
                        {selectedPanel.stats.changes}
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-label">Active Alerts</div>
                      <div
                        className={`stat-value ${
                          selectedPanel.stats.alerts > 0 ? "alert" : ""
                        }`}
                      >
                        {selectedPanel.stats.alerts}
                      </div>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h3>Recent Activity</h3>
                    <div className="activity-item">
                      <div className="activity-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <div className="activity-text">
                          Configuration updated by{" "}
                          <span className="activity-user">Admin User</span>
                        </div>
                        <div className="activity-time">2 hours ago</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <div className="activity-text">
                          New user permission added
                        </div>
                        <div className="activity-time">
                          Yesterday at 3:45 PM
                        </div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <div className="activity-details">
                        <div className="activity-text">
                          System alert resolved
                        </div>
                        <div className="activity-time">June 12, 2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h3>Panel Configuration</h3>

                  <div className="modal-section">
                    <div className="form-group">
                      <label>Panel Name</label>
                      <input
                        type="text"
                        value={selectedPanel.name}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={selectedPanel.description}
                        rows="3"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={selectedPanel.status}
                        className="form-input"
                      >
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "access" && (
                <div>
                  <h3>Access Permissions</h3>

                  <div className="modal-section">
                    <div className="form-group">
                      <label>Access Level</label>
                      <select
                        value={selectedPanel.accessLevel}
                        className="form-input"
                      >
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Allowed Users</label>
                      <div className="users-list">
                        <div className="user-item">
                          <input type="checkbox" id="user1" />
                          <label htmlFor="user1">
                            Admin User (admin@example.com)
                          </label>
                        </div>
                        <div className="user-item">
                          <input type="checkbox" id="user2" checked />
                          <label htmlFor="user2">
                            Super Admin (super@example.com)
                          </label>
                        </div>
                        <div className="user-item">
                          <input type="checkbox" id="user3" />
                          <label htmlFor="user3">
                            Manager (manager@example.com)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button
                  onClick={() => setSelectedPanel(null)}
                  className="cancel-button"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleOpenPanel(selectedPanel.id)}
                  className="open-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                  Open Control Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
