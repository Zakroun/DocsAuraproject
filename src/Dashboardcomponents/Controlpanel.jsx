import { useState, useEffect } from 'react';


export default function ControlPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [panels, setPanels] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        {
          id: 1,
          name: "System Configuration",
          description: "Configure core system settings and parameters",
          icon: "⚙️",
          lastAccessed: new Date().toISOString().split('T')[0],
          status: "active",
          accessLevel: "admin",
          stats: {
            users: 142,
            changes: 28,
            alerts: 3
          }
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
            alerts: 7
          }
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
            alerts: 2
          }
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
            alerts: 1
          }
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
            alerts: 0
          }
        }
      ];
      
      setPanels(mockData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredPanels = panels.filter(panel =>
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
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Header with search and actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#018786',
              margin: 0
            }}>Control Panels</h1>
            <p style={{
              color: '#64748b',
              marginTop: '0.5rem',
              fontSize: '0.9rem'
            }}>Administrative tools and system configurations</p>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: '300px'
            }}>
              <input 
                type="text" 
                placeholder="Search control panels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  ':focus': {
                    borderColor: '#018786',
                    boxShadow: '0 0 0 3px rgba(1, 135, 134, 0.2)'
                  }
                }}
              />
              <svg 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8',
                  width: '1rem',
                  height: '1rem'
                }} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button 
              onClick={handleRefresh}
              style={{
                backgroundColor: '#018786',
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: '#016b6b'
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px'
          }}>
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '3px solid rgba(1, 135, 134, 0.3)',
              borderRadius: '50%',
              borderTopColor: '#018786',
              animation: 'spin 1s ease-in-out infinite'
            }}></div>
          </div>
        ) : (
          <>
            {/* Control Panels List */}
            <div style={{
              display: 'grid',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {filteredPanels.length > 0 ? (
                filteredPanels.map((panel) => (
                  <div 
                    key={panel.id}
                    onClick={() => setSelectedPanel(panel)}
                    style={{
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      borderLeft: `4px solid ${
                        panel.status === 'active' ? '#018786' :
                        panel.status === 'maintenance' ? '#FFA500' :
                        '#CCCCCC'
                      }`,
                      ':hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)'
                      }
                    }}
                  >
                    <div style={{
                      fontSize: '2rem',
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#e6f7f7',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#018786',
                      flexShrink: 0
                    }}>
                      {panel.icon}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        <h3 style={{ 
                          fontWeight: '600',
                          color: '#018786',
                          margin: 0,
                          fontSize: '1.1rem'
                        }}>
                          {panel.name}
                        </h3>
                        <span style={{
                          backgroundColor: 
                            panel.accessLevel === 'superadmin' ? '#fff0f0' : '#f0f7ff',
                          color: 
                            panel.accessLevel === 'superadmin' ? '#dc2626' : '#2563eb',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}>
                          {panel.accessLevel}
                        </span>
                      </div>
                      <p style={{ 
                        fontSize: '0.9rem', 
                        color: '#475569',
                        margin: '0 0 0.5rem 0',
                        lineHeight: '1.5'
                      }}>
                        {panel.description}
                      </p>
                      <div style={{ 
                        display: 'flex',
                        gap: '1rem',
                        fontSize: '0.8rem',
                        color: '#64748b'
                      }}>
                        <span>Last accessed: {panel.lastAccessed}</span>
                        <span>Status: 
                          <span style={{
                            color: 
                              panel.status === 'active' ? '#018786' :
                              panel.status === 'maintenance' ? '#FFA500' :
                              '#666666',
                            fontWeight: '500',
                            marginLeft: '0.3rem'
                          }}>
                            {panel.status.charAt(0).toUpperCase() + panel.status.slice(1)}
                          </span>
                        </span>
                      </div>
                    </div>
                    
                    <svg 
                      style={{
                        color: '#94a3b8',
                        width: '1.2rem',
                        height: '1.2rem',
                        flexShrink: 0
                      }} 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))
              ) : (
                <div style={{
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px dashed #e2e8f0'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h3 style={{ color: '#64748b', margin: '0.5rem 0' }}>No control panels found</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Try adjusting your search query</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Control Panel Details Modal */}
      {selectedPanel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedPanel(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: '#f1f5f9'
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div style={{ padding: '2rem' }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#e6f7f7',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#018786',
                  flexShrink: 0
                }}>
                  {selectedPanel.icon}
                </div>
                
                <div>
                  <h2 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#018786',
                    margin: '0 0 0.3rem 0'
                  }}>
                    {selectedPanel.name}
                  </h2>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      backgroundColor: 
                        selectedPanel.status === 'active' ? '#f0fdf4' :
                        selectedPanel.status === 'maintenance' ? '#fffbeb' :
                        '#f1f5f9',
                      color: 
                        selectedPanel.status === 'active' ? '#16a34a' :
                        selectedPanel.status === 'maintenance' ? '#d97706' :
                        '#64748b',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {selectedPanel.status}
                    </span>
                    <span style={{
                      backgroundColor: 
                        selectedPanel.accessLevel === 'superadmin' ? '#fff0f0' : '#f0f7ff',
                      color: 
                        selectedPanel.accessLevel === 'superadmin' ? '#dc2626' : '#2563eb',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {selectedPanel.accessLevel}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Tabs */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #e2e8f0',
                marginBottom: '1.5rem'
              }}>
                <button
                  onClick={() => setActiveTab('overview')}
                  style={{
                    padding: '0.7rem 1rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: activeTab === 'overview' ? '#018786' : '#64748b',
                    borderBottom: activeTab === 'overview' ? '2px solid #018786' : 'none',
                    marginRight: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  style={{
                    padding: '0.7rem 1rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: activeTab === 'settings' ? '#018786' : '#64748b',
                    borderBottom: activeTab === 'settings' ? '2px solid #018786' : 'none',
                    marginRight: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab('access')}
                  style={{
                    padding: '0.7rem 1rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: activeTab === 'access' ? '#018786' : '#64748b',
                    borderBottom: activeTab === 'access' ? '2px solid #018786' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Access Control
                </button>
              </div>
              
              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div>
                  <div style={{ 
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{ 
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#334155',
                      margin: '0 0 1rem 0'
                    }}>
                      Description
                    </h3>
                    <p style={{ 
                      color: '#475569',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {selectedPanel.description}
                    </p>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#334155',
                    margin: '0 0 1rem 0'
                  }}>
                    Quick Stats
                  </h3>
                  
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '1rem',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                    }}>
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#64748b',
                        marginBottom: '0.5rem'
                      }}>
                        Active Users
                      </div>
                      <div style={{ 
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#018786'
                      }}>
                        {selectedPanel.stats.users}
                      </div>
                    </div>
                    
                    <div style={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '1rem',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                    }}>
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#64748b',
                        marginBottom: '0.5rem'
                      }}>
                        Recent Changes
                      </div>
                      <div style={{ 
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#018786'
                      }}>
                        {selectedPanel.stats.changes}
                      </div>
                    </div>
                    
                    <div style={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '1rem',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                    }}>
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#64748b',
                        marginBottom: '0.5rem'
                      }}>
                        Active Alerts
                      </div>
                      <div style={{ 
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: selectedPanel.stats.alerts > 0 ? '#dc2626' : '#018786'
                      }}>
                        {selectedPanel.stats.alerts}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{ 
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#334155',
                      margin: '0 0 1rem 0'
                    }}>
                      Recent Activity
                    </h3>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.8rem 0',
                      borderBottom: '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#e6f7f7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#018786',
                        flexShrink: 0
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                          Configuration updated by <span style={{ fontWeight: '500' }}>Admin User</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          2 hours ago
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.8rem 0',
                      borderBottom: '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#e6f7f7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#018786',
                        flexShrink: 0
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                          New user permission added
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          Yesterday at 3:45 PM
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.8rem 0'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#e6f7f7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#018786',
                        flexShrink: 0
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                          System alert resolved
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          June 12, 2023
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h3 style={{ 
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#334155',
                    margin: '0 0 1rem 0'
                  }}>
                    Panel Configuration
                  </h3>
                  
                  <div style={{ 
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        color: '#334155',
                        marginBottom: '0.5rem'
                      }}>
                        Panel Name
                      </label>
                      <input 
                        type="text" 
                        value={selectedPanel.name}
                        style={{
                          width: '100%',
                          padding: '0.7rem 1rem',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          outline: 'none',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease',
                          ':focus': {
                            borderColor: '#018786',
                            boxShadow: '0 0 0 3px rgba(1, 135, 134, 0.1)'
                          }
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        color: '#334155',
                        marginBottom: '0.5rem'
                      }}>
                        Description
                      </label>
                      <textarea 
                        value={selectedPanel.description}
                        rows="3"
                        style={{
                          width: '100%',
                          padding: '0.7rem 1rem',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          outline: 'none',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease',
                          resize: 'vertical',
                          ':focus': {
                            borderColor: '#018786',
                            boxShadow: '0 0 0 3px rgba(1, 135, 134, 0.1)'
                          }
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        color: '#334155',
                        marginBottom: '0.5rem'
                      }}>
                        Status
                      </label>
                      <select 
                        value={selectedPanel.status}
                        style={{
                          width: '100%',
                          padding: '0.7rem 1rem',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          outline: 'none',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease',
                          ':focus': {
                            borderColor: '#018786',
                            boxShadow: '0 0 0 3px rgba(1, 135, 134, 0.1)'
                          }
                        }}
                      >
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'access' && (
                <div>
                  <h3 style={{ 
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#334155',
                    margin: '0 0 1rem 0'
                  }}>
                    Access Permissions
                  </h3>
                  
                  <div style={{ 
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        color: '#334155',
                        marginBottom: '0.5rem'
                      }}>
                        Access Level
                      </label>
                      <select 
                        value={selectedPanel.accessLevel}
                        style={{
                          width: '100%',
                          padding: '0.7rem 1rem',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          outline: 'none',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease',
                          ':focus': {
                            borderColor: '#018786',
                            boxShadow: '0 0 0 3px rgba(1, 135, 134, 0.1)'
                          }
                        }}
                      >
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        color: '#334155',
                        marginBottom: '0.5rem'
                      }}>
                        Allowed Users
                      </label>
                      <div style={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '0.5rem',
                        maxHeight: '200px',
                        overflow: 'auto'
                      }}>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          ':hover': {
                            backgroundColor: '#f8fafc'
                          }
                        }}>
                          <input 
                            type="checkbox" 
                            id="user1"
                            style={{
                              marginRight: '0.7rem'
                            }}
                          />
                          <label htmlFor="user1" style={{ fontSize: '0.9rem' }}>
                            Admin User (admin@example.com)
                          </label>
                        </div>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          ':hover': {
                            backgroundColor: '#f8fafc'
                          }
                        }}>
                          <input 
                            type="checkbox" 
                            id="user2"
                            checked
                            style={{
                              marginRight: '0.7rem'
                            }}
                          />
                          <label htmlFor="user2" style={{ fontSize: '0.9rem' }}>
                            Super Admin (super@example.com)
                          </label>
                        </div>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          ':hover': {
                            backgroundColor: '#f8fafc'
                          }
                        }}>
                          <input 
                            type="checkbox" 
                            id="user3"
                            style={{
                              marginRight: '0.7rem'
                            }}
                          />
                          <label htmlFor="user3" style={{ fontSize: '0.9rem' }}>
                            Manager (manager@example.com)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div style={{ 
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button 
                  onClick={() => setSelectedPanel(null)}
                  style={{
                    backgroundColor: 'white',
                    color: '#334155',
                    border: '1px solid #e2e8f0',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      backgroundColor: '#f8fafc',
                      borderColor: '#cbd5e1'
                    }
                  }}
                >
                  Cancel
                </button>
                
                <button 
                  onClick={() => handleOpenPanel(selectedPanel.id)}
                  style={{
                    backgroundColor: '#018786',
                    color: 'white',
                    border: 'none',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    ':hover': {
                      backgroundColor: '#016b6b',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}