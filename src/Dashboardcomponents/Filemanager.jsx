import React, { useState, useEffect } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileVideo,
  FaFile,
  FaTrash,
  FaSearch,
  FaCloudUploadAlt,
  FaTimes,
  FaUser,
  FaFlask,
  FaFileMedical,
  FaFileAlt,
  FaDownload,
  FaPlay,
} from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import ReactPlayer from "react-player";
import axios from "axios";

const fileIcons = {
  pdf: { icon: <FaFilePdf size={24} color="red" />, color: "#FF0000" },
  docx: { icon: <FaFileWord size={24} color="blue" />, color: "#2563EB" },
  img: { icon: <FaFileImage size={24} color="green" />, color: "#008000" },
  video: { icon: <FaFileVideo size={24} color="purple" />, color: "#800080" },
  medical: {
    icon: <FaFileMedical size={24} color="#E67E22" />,
    color: "#E67E22",
  },
  lab: { icon: <FaFlask size={24} color="#9B59B6" />, color: "#9B59B6" },
  default: {
    icon: <FaFile size={24} color="#007180" />,
    color: "#007180",
  },
};

export default function FileManager() {
  // User state
  const [userId, setUserId] = useState(null);

  // Component state
  const [files, setFiles] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [selectedFilesToDelete, setSelectedFilesToDelete] = useState([]);
  const [showAddFile, setShowAddFile] = useState(false);
  const [newFile, setNewFile] = useState({
    name: "",
    type: "",
    category: "medical",
    file: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [fileContent, setFileContent] = useState("");
  const [playingVideo, setPlayingVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize user
  useEffect(() => {
    const initializeUser = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setUserId(user?.id || null);
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        setError("Failed to load user data");
      }
    };
    initializeUser();
  }, []);

  // Fetch data when userId changes
  useEffect(() => {
    if (userId) {
      fetchFiles();
      fetchActivities();
    }
  }, [userId]);

  // API functions
  const fetchFiles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/files", {
        params: { user_id: userId },
      });
      setFiles(response.data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to load files");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/activities", {
        params: { user_id: userId },
      });
      setActivities(response.data || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Failed to load activities");
    }
  };

  // File operations
  // const handleFilePreview = async (file) => {
  //   setSelectedFile(file);
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/api/files/${file.id}/preview`,
  //       {
  //         params: { user_id: userId },
  //       }
  //     );

  //     if (file.type === "pdf" || file.type === "docx") {
  //       setPreviewFile({ type: file.type, content: response.data.content });
  //       setFileContent(response.data.content || "No content available");
  //     } else if (file.type === "img" || file.type === "video") {
  //       setPreviewFile({
  //         type: file.type,
  //         url: response.data.url,
  //         content: file.description || "Medical file content",
  //       });
  //       setFileContent(file.description || "Medical file content");
  //     }
  //   } catch (error) {
  //     console.error("Error previewing file:", error);
  //     setError("Failed to preview file");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileType = file.name.split(".").pop();
  //     setNewFile({
  //       ...newFile,
  //       file: file,
  //       type: fileType,
  //       name: file.name,
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFile.file || !userId) {
      setError("Please select a file and make sure you are logged in");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", newFile.file);
    formData.append("name", newFile.name);
    formData.append("type", newFile.type);
    formData.append("category", newFile.category);
    formData.append("user_id", userId);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.file) {
        setFiles((prev) => [response.data.file, ...prev]);
      }
      if (response.data?.activity) {
        setActivities((prev) => [response.data.activity, ...prev]);
      } else {
        await fetchActivities();
      }

      setShowAddFile(false);
      setNewFile({ name: "", type: "", category: "medical", file: null });
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.response?.data?.message || "Failed to upload file");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFilesToDelete((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteFiles = async () => {
    if (selectedFilesToDelete.length === 0 || !userId) {
      setError("No files selected or user not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting to delete:", {
        file_ids: selectedFilesToDelete,
        user_id: userId,
      });

      const response = await axios.delete("http://localhost:8000/api/files", {
        data: {
          file_ids: selectedFilesToDelete,
          user_id: userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response:", response.data);

      if (response.data.success_count > 0) {
        setFiles((prev) =>
          prev.filter((file) => !response.data.deleted_ids.includes(file.id))
        );

        // Show success message
        alert(`${response.data.success_count} files deleted successfully`);
      }

      if (response.data.failed_count > 0) {
        setError(`${response.data.failed_count} files failed to delete`);
        console.error("Delete errors:", response.data.errors);
      }

      setSelectedFilesToDelete([]);
      fetchActivities();
    } catch (error) {
      console.error("Delete error:", {
        error: error.response?.data || error.message,
        config: error.config,
      });

      let errorMessage = "Failed to delete files";
      if (error.response) {
        errorMessage += `: ${JSON.stringify(error.response.data)}`;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (fileId) => {
  setIsLoading(true);
  setError(null);

  try {
    // 1. Get file info from backend
    const response = await axios.get(`http://localhost:8000/api/files/${fileId}/info`);
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const { name, type } = response.data;

    // 2. Create dummy content based on file type
    let content = '';
    if (type === 'pdf') {
      content = '%PDF-1.4\n...'; // Minimal PDF header
    } else if (type === 'csv') {
      content = 'data,example\n1,sample\n2,content';
    } // Add other file types as needed

    // 3. Create download URL
    const blob = new Blob([content], { type: `application/${type}` });
    const url = URL.createObjectURL(blob);

    // 4. Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // 5. Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

  } catch (error) {
    console.error('Download failed:', error);
    setError(`Cannot download file: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};

  // Filter files based on search and active tab
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && file.category === activeTab;
  });

  // Render helpers
  const renderFileIcon = (file) => {
    const fileType = file.type in fileIcons ? file.type : "default";
    return fileIcons[fileType].icon;
  };

  const renderActivities = () => {
    if (isLoading && activities.length === 0) {
      return <li className="activity-item">Loading activities...</li>;
    }

    if (!activities || activities.length === 0) {
      return <li className="activity-item">No activities found</li>;
    }

    return activities.slice(0, 10).map((activity) => (
      <li key={activity.id} className="activity-item">
        <IoCheckmarkDoneCircleSharp className="activity-icon" />
        <span className="activity-text">
          {activity?.description || "Activity logged"}
        </span>
        <span className="activity-time">
          {activity?.created_at
            ? new Date(activity.created_at).toLocaleString()
            : "Recently"}
        </span>
      </li>
    ));
  };

  return (
    <div className="file-manager-container">
      {/* Loading and error indicators */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Main content */}
      <div className="file-manager-content">
        {/* Sidebar */}
        <div className="file-manager-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul>
              <li
                className={activeTab === "all" ? "active" : ""}
                onClick={() => setActiveTab("all")}
              >
                <FaFile /> All Files
              </li>
              <li
                className={activeTab === "medical" ? "active" : ""}
                onClick={() => setActiveTab("medical")}
              >
                <FaFileMedical /> Medical Reports
              </li>
              <li
                className={activeTab === "lab" ? "active" : ""}
                onClick={() => setActiveTab("lab")}
              >
                <FaFlask /> Lab Results
              </li>
              <li
                className={activeTab === "personal" ? "active" : ""}
                onClick={() => setActiveTab("personal")}
              >
                <FaUser /> Personal Files
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>My Files</h3>
            <div className="my-files-stats">
              <div className="file-stat">
                <FaFileMedical /> <span>Medical</span>
                <span>
                  {files.filter((f) => f.category === "medical").length}
                </span>
              </div>
              <div className="file-stat">
                <FaFlask /> <span>Lab</span>
                <span>{files.filter((f) => f.category === "lab").length}</span>
              </div>
              <div className="file-stat">
                <FaFileAlt /> <span>Total</span>
                <span>{files.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="file-manager-main-panel">
          {/* Search and actions */}
          <div className="file-actions">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="action-buttons">
              <button
                className="upload-btn"
                onClick={() => setShowAddFile(true)}
                disabled={isLoading}
              >
                <FaCloudUploadAlt /> Upload
              </button>
              {selectedFilesToDelete.length > 0 && (
                <button
                  className="delete-btn"
                  onClick={handleDeleteFiles}
                  disabled={isLoading}
                >
                  <FaTrash /> Delete ({selectedFilesToDelete.length})
                </button>
              )}
            </div>
          </div>

          {/* File grid */}
          <div className="file-grid">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`file-card ${
                    selectedFilesToDelete.includes(file.id) ? "selected" : ""
                  }`}
                  style={{
                    borderLeft: `4px solid ${
                      fileIcons[file.type in fileIcons ? file.type : "default"]
                        .color
                    }`,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFilesToDelete.includes(file.id)}
                    onChange={() => toggleFileSelection(file.id)}
                    className="file-checkbox"
                    disabled={isLoading}
                  />
                  <div
                    className="file-content"
                    // onClick={() => !isLoading && handleFilePreview(file)}
                  >
                    <div className="file-icon">{renderFileIcon(file)}</div>
                    <div className="file-info">
                      <h4 className="file-name">{file.name}</h4>
                      <p className="file-size">
                        {Math.round(file.size / 1024)} KB
                      </p>
                      <p className="file-date">
                        {new Date(file.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    className="download-file-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file.id);
                    }}
                    disabled={isLoading}
                  >
                    <FaDownload size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="no-files">
                <FaFile size={48} color="#ccc" />
                <p>No files found</p>
                <button
                  className="upload-btn"
                  onClick={() => setShowAddFile(true)}
                  disabled={isLoading}
                >
                  <FaCloudUploadAlt /> Upload your first file
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activity panel */}
        <div className="activity-panel">
          <h3>Recent Activity</h3>
          <ul className="activity-list">{renderActivities()}</ul>
        </div>
      </div>

      {/* Add file modal */}
      {showAddFile && (
        <div className="add-file-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Upload New File</h3>
              <button
                onClick={() => setShowAddFile(false)}
                disabled={isLoading}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>File Name</label>
                <input
                  type="text"
                  value={newFile.name}
                  onChange={(e) =>
                    setNewFile({ ...newFile, name: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>File Type</label>
                <select
                  value={newFile.type}
                  onChange={(e) =>
                    setNewFile({ ...newFile, type: e.target.value })
                  }
                  required
                  disabled={isLoading}
                >
                  <option value="">Select Type</option>
                  <option value="pdf">PDF</option>
                  <option value="docx">DOCX</option>
                  <option value="img">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newFile.category}
                  onChange={(e) =>
                    setNewFile({ ...newFile, category: e.target.value })
                  }
                  disabled={isLoading}
                >
                  <option value="medical">Medical Report</option>
                  <option value="lab">Lab Results</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
              <div className="form-group file-upload">
                <label>
                  <FaCloudUploadAlt /> Choose File
                  <input
                    type="file"
                    //onChange={handleFileUpload}
                    required
                    hidden
                    disabled={isLoading}
                  />
                </label>
                {newFile.name && (
                  <span className="file-name">{newFile.name}</span>
                )}
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowAddFile(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File preview modal
      {previewFile && (
        <div className="file-preview-modal">
          <div className="preview-content">
            <div className="preview-header">
              <h3>{selectedFile?.name}</h3>
              <button onClick={() => setPreviewFile(null)} disabled={isLoading}>
                <FaTimes />
              </button>
            </div>
            <div className="preview-body">
              {previewFile.type === "pdf" && (
                <div className="pdf-preview">
                  <div className="pdf-content">
                    <pre>{fileContent}</pre>
                  </div>
                </div>
              )}
              {previewFile.type === "img" && (
                <div className="image-preview">
                  <div className="image-container">
                    <img
                      src={previewFile.url}
                      alt="Medical scan"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Medical+Image";
                      }}
                    />
                  </div>
                  <div className="image-report">
                    <pre>{fileContent}</pre>
                  </div>
                </div>
              )}
              {previewFile.type === "video" && (
                <div className="video-preview">
                  <div className="video-container">
                    <ReactPlayer
                      url={previewFile.url}
                      playing={playingVideo}
                      controls={true}
                      width="100%"
                      height="100%"
                      onPlay={() => setPlayingVideo(true)}
                      onPause={() => setPlayingVideo(false)}
                    />
                    {!playingVideo && (
                      <button
                        className="play-button"
                        onClick={() => setPlayingVideo(true)}
                      >
                        <FaPlay size={24} />
                      </button>
                    )}
                  </div>
                  <div className="video-report">
                    <pre>{fileContent}</pre>
                  </div>
                </div>
              )}
              {previewFile.type === "text" && (
                <div className="text-preview">
                  <div className="file-content-text">
                    <pre>{fileContent}</pre>
                  </div>
                </div>
              )}
            </div>
            <div className="preview-footer">
              <button
                className="download-btn"
                onClick={() => handleDownload(selectedFile)}
                disabled={isLoading}
              >
                <FaDownload /> Download
              </button>
              <button
                className="close-btn"
                onClick={() => setPreviewFile(null)}
                disabled={isLoading}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
