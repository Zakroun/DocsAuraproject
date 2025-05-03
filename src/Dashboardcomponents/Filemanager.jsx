import React, { useState, useEffect } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileVideo,
  FaFile,
  FaPlus,
  FaTasks,
  FaTrash,
  FaSearch,
  FaCloudUploadAlt,
  FaTimes,
  FaUser,
  FaFlask,
  FaFileMedical
} from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addFile, deleteFiles } from "../data/DocsauraSlice";

const fileIcons = {
  pdf: { icon: <FaFilePdf size={24} color="red" />, color: "#FF0000" },
  docx: { icon: <FaFileWord size={24} color="blue" />, color: "#2563EB" },
  img: { icon: <FaFileImage size={24} color="green" />, color: "#008000" },
  video: { icon: <FaFileVideo size={24} color="purple" />, color: "#800080" },
  medical: { icon: <FaFileMedical size={24} color="#E67E22" />, color: "#E67E22" },
  lab: { icon: <FaFlask size={24} color="#9B59B6" />, color: "#9B59B6" },
  default: {
    icon: <FaFile size={24} color="#007180" />,
    color: "#007180",
  },
};

export default function FileManager() {
  const dispatch = useDispatch();
  const filesData = useSelector((s) => s.Docsaura.files);
  const activityData = useSelector((s) => s.Docsaura.activity);

  const [files, setFiles] = useState(filesData || []);
  const [activity, setActivity] = useState(activityData || []);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [selectedFilesToDelete, setSelectedFilesToDelete] = useState([]);
  const [showAddFile, setShowAddFile] = useState(false);
  const [newFile, setNewFile] = useState({ name: "", type: "", size: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setFiles(filesData);
    setActivity(activityData);
  }, [filesData, activityData]);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "medical") return matchesSearch && file.category === "medical";
    if (activeTab === "lab") return matchesSearch && file.category === "lab";
    if (activeTab === "personal") return matchesSearch && file.category === "personal";
    return matchesSearch;
  });

  const handleFilePreview = (file) => {
    setSelectedFile(file);
    const fileType = file.type.split("/")[0];
    
    if (fileType === "application" && file.type === "application/pdf") {
      setPreviewFile({ type: "pdf", url: URL.createObjectURL(file) });
    } else if (fileType === "image") {
      setPreviewFile({ type: "img", url: URL.createObjectURL(file) });
    } else if (fileType === "video") {
      setPreviewFile({ type: "video", url: URL.createObjectURL(file) });
    } else {
      console.error("Unsupported file type:", file.type);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile({
        name: file.name,
        type: file.type.split("/")[1],
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        category: "personal" // Default category
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFile.name && newFile.type && newFile.size) {
      dispatch(addFile(newFile));
      setActivity([`You uploaded "${newFile.name}"`, ...activity]);
      setShowAddFile(false);
      setNewFile({ name: "", type: "", size: "" });
    }
  };

  const toggleFileSelection = (fileName) => {
    setSelectedFilesToDelete((prevSelected) =>
      prevSelected.includes(fileName)
        ? prevSelected.filter((name) => name !== fileName)
        : [...prevSelected, fileName]
    );
  };

  const handleDeleteFiles = () => {
    dispatch(deleteFiles(selectedFilesToDelete));
    setActivity([`You deleted ${selectedFilesToDelete.length} files`, ...activity]);
    setSelectedFilesToDelete([]);
  };

  return (
    <div className="file-manager-container">
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
                <FaFileMedical /> <span>Medical Report</span> <span>5 MB</span>
              </div>
              <div className="file-stat">
                <FaFlask /> <span>Lab Results</span> <span>2 MB</span>
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
              />
            </div>
            <button 
              className="upload-btn"
              onClick={() => setShowAddFile(true)}
            >
              <FaCloudUploadAlt /> Upload
            </button>
          </div>

          {/* File grid */}
          <div className="file-grid">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file, index) => {
                const fileType = file.type in fileIcons ? file.type : "default";
                return (
                  <div
                    key={index}
                    className={`file-card ${selectedFilesToDelete.includes(file.name) ? "selected" : ""}`}
                    style={{ borderLeft: `4px solid ${fileIcons[fileType].color}` }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilesToDelete.includes(file.name)}
                      onChange={() => toggleFileSelection(file.name)}
                      className="file-checkbox"
                    />
                    <div 
                      className="file-content"
                      onClick={() => handleFilePreview(file)}
                    >
                      <div className="file-icon">
                        {fileIcons[fileType].icon}
                      </div>
                      <div className="file-info">
                        <h4 className="file-name">{file.name}</h4>
                        <p className="file-size">{file.size}</p>
                        <p className="file-date">Uploaded: {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-files">
                <FaFile size={48} color="#ccc" />
                <p>No files found</p>
              </div>
            )}
          </div>

          {/* Delete button (visible when files are selected) */}
          {selectedFilesToDelete.length > 0 && (
            <button className="delete-selected-btn" onClick={handleDeleteFiles}>
              <FaTrash /> Delete ({selectedFilesToDelete.length})
            </button>
          )}
        </div>

        {/* Activity panel */}
        <div className="activity-panel">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            {activity.slice(0, 8).map((act, index) => (
              <li key={index} className="activity-item">
                <IoCheckmarkDoneCircleSharp className="activity-icon"/>
                <span className="activity-text">{act}</span>
                <span className="activity-time">Just now</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add file modal */}
      {showAddFile && (
        <div className="add-file-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Upload New File</h3>
              <button onClick={() => setShowAddFile(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>File Name</label>
                <input
                  type="text"
                  value={newFile.name}
                  onChange={(e) => setNewFile({...newFile, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>File Type</label>
                <select
                  value={newFile.type}
                  onChange={(e) => setNewFile({...newFile, type: e.target.value})}
                  required
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
                  value={newFile.category || "personal"}
                  onChange={(e) => setNewFile({...newFile, category: e.target.value})}
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
                    onChange={handleFileUpload}
                    required
                    hidden
                  />
                </label>
                {newFile.name && <span className="file-name">{newFile.name}</span>}
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddFile(false)}>
                  Cancel
                </button>
                <button type="submit">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File preview modal */}
      {previewFile && (
        <div className="file-preview-modal">
          <div className="preview-content">
            <div className="preview-header">
              <h3>{selectedFile?.name}</h3>
              <button onClick={() => setPreviewFile(null)}>
                <FaTimes />
              </button>
            </div>
            <div className="preview-body">
              {previewFile.type === "pdf" && (
                <embed src={previewFile.url} width="100%" height="500px" />
              )}
              {previewFile.type === "img" && (
                <img src={previewFile.url} alt="Preview" className="preview-image" />
              )}
              {previewFile.type === "video" && (
                <video src={previewFile.url} controls className="preview-video" />
              )}
            </div>
            <div className="preview-footer">
              <button className="download-btn">Download</button>
              <button className="close-btn" onClick={() => setPreviewFile(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}