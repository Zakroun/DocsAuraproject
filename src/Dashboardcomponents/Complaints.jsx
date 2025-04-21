import { useState } from 'react';

export default function Complaints() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    // Sample data
    const complaintsData = [
        {
            id: 1,
            title: "Late Appointment",
            user: "Patient 1",
            date: "2023-06-10",
            status: "Pending",
            description: "The doctor arrived 45 minutes late to the appointment causing inconvenience.",
            category: "Appointment"
        },
        {
            id: 2,
            title: "Billing Issue",
            user: "Patient 2",
            date: "2023-06-11",
            status: "In Progress",
            description: "Incorrect charges appeared on the final bill for the procedure.",
            category: "Billing"
        },
        {
            id: 3,
            title: "Rude Staff",
            user: "Patient 3",
            date: "2023-06-12",
            status: "Pending",
            description: "Receptionist was very rude during check-in process.",
            category: "Service"
        },
        {
            id: 4,
            title: "Prescription Error",
            user: "Patient 4",
            date: "2023-06-13",
            status: "Resolved",
            description: "Doctor prescribed wrong dosage of medication.",
            category: "Medical"
        },
        {
            id: 5,
            title: "Cleanliness Concern",
            user: "Patient 5",
            date: "2023-06-14",
            status: "In Progress",
            description: "Examining room was not properly cleaned before use.",
            category: "Facility"
        }
    ];

    // Filter complaints based on search term
    const filteredComplaints = complaintsData.filter(complaint => 
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const complaintsPerPage = 5;
    const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
    const currentComplaints = filteredComplaints.slice(
        (currentPage - 1) * complaintsPerPage,
        currentPage * complaintsPerPage
    );

    const handleViewDetails = (complaint) => {
        setSelectedComplaint(complaint);
    };

    const closeModal = () => {
        setSelectedComplaint(null);
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
                {/* Header */}
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
                        }}>Complaints Management</h1>
                        <p style={{
                            color: '#64748b',
                            marginTop: '0.5rem',
                            fontSize: '0.9rem'
                        }}>Track and resolve patient complaints efficiently</p>
                    </div>
                    
                    <div style={{
                        position: 'relative',
                        width: '300px'
                    }}>
                        <input 
                            type="text" 
                            placeholder="Search complaints..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
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
                </div>

                {/* Complaints List */}
                <div style={{
                    display: 'grid',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    {currentComplaints.length > 0 ? (
                        currentComplaints.map((complaint) => (
                            <div 
                                key={complaint.id}
                                style={{
                                    backgroundColor: 'white',
                                    padding: '1.5rem',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'all 0.3s ease',
                                    borderLeft: '4px solid #018786',
                                    ':hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)'
                                    }
                                }}
                            >
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
                                            {complaint.title}
                                        </h3>
                                        <span style={{
                                            backgroundColor: '#e6f7f7',
                                            color: '#018786',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '12px',
                                            fontSize: '0.7rem',
                                            fontWeight: '600'
                                        }}>
                                            {complaint.category}
                                        </span>
                                    </div>
                                    <div style={{ 
                                        fontSize: '0.85rem', 
                                        color: '#64748b',
                                        marginBottom: '0.5rem',
                                        display: 'flex',
                                        gap: '1rem'
                                    }}>
                                        <span>By: {complaint.user}</span>
                                        <span>Submitted: {complaint.date}</span>
                                    </div>
                                    <p style={{ 
                                        fontSize: '0.9rem', 
                                        color: '#475569',
                                        margin: 0,
                                        lineHeight: '1.5'
                                    }}>
                                        {complaint.description.length > 120 
                                            ? `${complaint.description.substring(0, 120)}...` 
                                            : complaint.description}
                                    </p>
                                </div>
                                
                                <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginLeft: '1rem'
                                }}>
                                    <span style={{
                                        backgroundColor: 
                                            complaint.status === 'Pending' ? '#fff4f4' :
                                            complaint.status === 'In Progress' ? '#fff8e6' :
                                            '#f0fdf4',
                                        color: 
                                            complaint.status === 'Pending' ? '#dc2626' :
                                            complaint.status === 'In Progress' ? '#d97706' :
                                            '#16a34a',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        textTransform: 'uppercase'
                                    }}>
                                        {complaint.status}
                                    </span>
                                    
                                    <button 
                                        onClick={() => handleViewDetails(complaint)}
                                        style={{
                                            backgroundColor: '#018786',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.6rem 1.2rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem',
                                            ':hover': {
                                                backgroundColor: '#016b6b',
                                                transform: 'translateY(-1px)'
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                        Details
                                    </button>
                                </div>
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
                            <h3 style={{ color: '#64748b', margin: '0.5rem 0' }}>No complaints found</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Try adjusting your search or filter</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #f1f5f9'
                }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Showing <span style={{ fontWeight: '600', color: '#334155' }}>{(currentPage - 1) * complaintsPerPage + 1}-{Math.min(currentPage * complaintsPerPage, filteredComplaints.length)}</span> of <span style={{ fontWeight: '600', color: '#334155' }}>{filteredComplaints.length}</span> complaints
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid #e2e8f0',
                                backgroundColor: 'white',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                fontSize: '0.85rem',
                                transition: 'all 0.2s ease',
                                ':disabled': {
                                    opacity: 0.5,
                                    cursor: 'not-allowed'
                                },
                                ':hover:not(:disabled)': {
                                    backgroundColor: '#f8fafc',
                                    borderColor: '#cbd5e1'
                                }
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                            Previous
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        border: currentPage === pageNum ? '1px solid #018786' : '1px solid #e2e8f0',
                                        backgroundColor: currentPage === pageNum ? '#018786' : 'white',
                                        color: currentPage === pageNum ? 'white' : '#334155',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        transition: 'all 0.2s ease',
                                        ':hover': {
                                            backgroundColor: currentPage === pageNum ? '#016b6b' : '#f8fafc',
                                            borderColor: currentPage === pageNum ? '#018786' : '#cbd5e1'
                                        }
                                    }}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        
                        {totalPages > 5 && (
                            <span style={{
                                padding: '0.5rem',
                                color: '#64748b',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                ...
                            </span>
                        )}
                        
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid #e2e8f0',
                                backgroundColor: 'white',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                fontSize: '0.85rem',
                                transition: 'all 0.2s ease',
                                ':disabled': {
                                    opacity: 0.5,
                                    cursor: 'not-allowed'
                                },
                                ':hover:not(:disabled)': {
                                    backgroundColor: '#f8fafc',
                                    borderColor: '#cbd5e1'
                                }
                            }}
                        >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Complaint Details Modal */}
            {selectedComplaint && (
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
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        position: 'relative'
                    }}>
                        <button 
                            onClick={closeModal}
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
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '1.5rem'
                            }}>
                                <div>
                                    <h2 style={{ 
                                        fontSize: '1.5rem',
                                        fontWeight: '600',
                                        color: '#018786',
                                        margin: '0 0 0.5rem 0'
                                    }}>
                                        {selectedComplaint.title}
                                    </h2>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                                        <span style={{
                                            backgroundColor: '#e6f7f7',
                                            color: '#018786',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {selectedComplaint.category}
                                        </span>
                                        <span style={{
                                            backgroundColor: 
                                                selectedComplaint.status === 'Pending' ? '#fff4f4' :
                                                selectedComplaint.status === 'In Progress' ? '#fff8e6' :
                                                '#f0fdf4',
                                            color: 
                                                selectedComplaint.status === 'Pending' ? '#dc2626' :
                                                selectedComplaint.status === 'In Progress' ? '#d97706' :
                                                '#16a34a',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            textTransform: 'uppercase'
                                        }}>
                                            {selectedComplaint.status}
                                        </span>
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
                                    Complaint Details
                                </h3>
                                <p style={{ 
                                    color: '#475569',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {selectedComplaint.description}
                                </p>
                            </div>
                            
                            <div style={{ 
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div>
                                    <h4 style={{ 
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        color: '#64748b',
                                        margin: '0 0 0.3rem 0',
                                        textTransform: 'uppercase'
                                    }}>
                                        Submitted By
                                    </h4>
                                    <p style={{ 
                                        color: '#334155',
                                        margin: 0,
                                        fontWeight: '500'
                                    }}>
                                        {selectedComplaint.user}
                                    </p>
                                </div>
                                
                                <div>
                                    <h4 style={{ 
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        color: '#64748b',
                                        margin: '0 0 0.3rem 0',
                                        textTransform: 'uppercase'
                                    }}>
                                        Date Submitted
                                    </h4>
                                    <p style={{ 
                                        color: '#334155',
                                        margin: 0,
                                        fontWeight: '500'
                                    }}>
                                        {selectedComplaint.date}
                                    </p>
                                </div>
                                
                                <div>
                                    <h4 style={{ 
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        color: '#64748b',
                                        margin: '0 0 0.3rem 0',
                                        textTransform: 'uppercase'
                                    }}>
                                        Priority
                                    </h4>
                                    <p style={{ 
                                        color: '#334155',
                                        margin: 0,
                                        fontWeight: '500'
                                    }}>
                                        {selectedComplaint.status === 'Pending' ? 'Medium' : 
                                         selectedComplaint.status === 'In Progress' ? 'High' : 'Low'}
                                    </p>
                                </div>
                                
                                <div>
                                    <h4 style={{ 
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        color: '#64748b',
                                        margin: '0 0 0.3rem 0',
                                        textTransform: 'uppercase'
                                    }}>
                                        Reference ID
                                    </h4>
                                    <p style={{ 
                                        color: '#334155',
                                        margin: 0,
                                        fontWeight: '500'
                                    }}>
                                        COMP-{selectedComplaint.id.toString().padStart(4, '0')}
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <h3 style={{ 
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#334155',
                                    margin: '0 0 1rem 0'
                                }}>
                                    Resolution Actions
                                </h3>
                                
                                <div style={{ 
                                    display: 'flex',
                                    gap: '1rem',
                                    marginTop: '1.5rem'
                                }}>
                                    <button style={{
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
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                        Mark as Resolved
                                    </button>
                                    
                                    <button style={{
                                        backgroundColor: 'white',
                                        color: '#334155',
                                        border: '1px solid #e2e8f0',
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
                                            backgroundColor: '#f8fafc',
                                            borderColor: '#cbd5e1'
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        Add Comment
                                    </button>
                                    
                                    <button style={{
                                        backgroundColor: 'white',
                                        color: '#dc2626',
                                        border: '1px solid #fee2e2',
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
                                            backgroundColor: '#fef2f2',
                                            borderColor: '#fecaca'
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}