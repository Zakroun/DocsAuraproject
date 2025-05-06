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
  FaFileMedical,
  FaFileAlt,
  FaDownload,
  FaPlay
} from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import ReactPlayer from 'react-player'; // For video playback
import { useDispatch, useSelector } from "react-redux";
import { addFile, deleteFiles } from "../data/DocsauraSlice";

// Sample medical images (placeholder URLs)
const sampleMedicalImages = [
  "https://example.com/xray.jpg",
  "https://example.com/ultrasound.jpg",
  "https://example.com/mri-scan.jpg",
  "https://example.com/ct-scan.jpg"
];

// Sample medical videos (placeholder URLs)
const sampleMedicalVideos = [
  "https://example.com/ecg-recording.mp4",
  "https://example.com/ultrasound-scan.mp4",
  "https://example.com/endoscopy.mp4",
  "https://example.com/echocardiogram.mp4"
];

// Function to generate realistic medical file content
const generateMedicalContent = (fileType, fileName) => {
  const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Davis"];
  const facilities = ["City General Hospital", "Metro Health Center", "University Medical", "Parkview Clinic", "Sunrise Healthcare"];
  const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
  const randomFacility = facilities[Math.floor(Math.random() * facilities.length)];
  const date = new Date().toLocaleDateString();

  if (fileType === "pdf") {
    const reportTypes = {
      "Annual Checkup": `COMPREHENSIVE ANNUAL EXAMINATION REPORT\n\nPatient: [Patient Name]\nDate: ${date}\nFacility: ${randomFacility}\nAttending Physician: ${randomDoctor}\n\nFINDINGS:\n- Vital signs within normal limits\n- No abnormalities detected in physical examination\n- Blood pressure: 120/80 mmHg\n- Heart rate: 72 bpm\n- BMI: 24.5 (normal range)\n\nRECOMMENDATIONS:\n- Continue current healthy lifestyle\n- Follow up in one year\n- Routine blood work recommended`,
      "Blood Test": `LABORATORY REPORT - BLOOD ANALYSIS\n\nPatient: [Patient Name]\nDate: ${date}\nFacility: ${randomFacility}\nOrdering Physician: ${randomDoctor}\n\nRESULTS:\n- WBC: 6.5 K/μL (Normal)\n- RBC: 4.7 M/μL (Normal)\n- Hemoglobin: 14.2 g/dL (Normal)\n- Platelets: 250 K/μL (Normal)\n- Glucose: 92 mg/dL (Normal)\n\nINTERPRETATION:\nAll values within normal reference ranges. No abnormalities detected.`,
      "MRI Scan": `RADIOLOGY REPORT - MRI SCAN\n\nPatient: [Patient Name]\nDate: ${date}\nFacility: ${randomFacility}\nRadiologist: ${randomDoctor}\n\nIMPRESSION:\n- No evidence of acute intracranial abnormality\n- Normal brain parenchyma\n- No mass lesions or hemorrhage\n- Ventricular system normal in size and configuration\n\nRECOMMENDATION:\nNo follow-up needed unless clinically indicated.`
    };

    const reportType = fileName.includes("Checkup") ? "Annual Checkup" : 
                     fileName.includes("Blood") ? "Blood Test" : 
                     fileName.includes("MRI") ? "MRI Scan" : 
                     "Medical Report";
    
    return reportTypes[reportType] || `MEDICAL REPORT\n\nThis document contains important health information about your recent ${reportType.toLowerCase()}.\n\nDate: ${date}\nFacility: ${randomFacility}\nPhysician: ${randomDoctor}\n\nPlease consult with your healthcare provider for detailed interpretation.`;
  }
  else if (fileType === "docx") {
    return `PRESCRIPTION\n\nPatient: [Patient Name]\nDate: ${date}\nPrescribing Physician: ${randomDoctor}\n\nMEDICATIONS:\n1. Ibuprofen 400mg - Take 1 tablet every 6 hours as needed for pain\n2. Amoxicillin 500mg - Take 1 capsule every 12 hours for 7 days\n3. Loratadine 10mg - Take 1 tablet daily for allergies\n\nREFILLS: 1\n\nPHARMACY INSTRUCTIONS:\nMay substitute with generic equivalent\n\n${randomDoctor}\nLicense #: ${Math.floor(100000 + Math.random() * 900000)}\n${randomFacility}`;
  }
  else if (fileType === "img") {
    const randomImage = sampleMedicalImages[Math.floor(Math.random() * sampleMedicalImages.length)];
    return {
      url: randomImage,
      report: `MEDICAL IMAGE REPORT\n\n${fileName}\n\nDate: ${date}\nFacility: ${randomFacility}\nRadiologist: ${randomDoctor}\n\nFINDINGS:\n- No acute findings\n- Normal anatomical structures\n- No evidence of pathology\n\nIMPRESSION:\nUnremarkable study. No follow-up needed unless clinically indicated.`
    };
  }
  else if (fileType === "video") {
    const randomVideo = sampleMedicalVideos[Math.floor(Math.random() * sampleMedicalVideos.length)];
    return {
      url: randomVideo,
      report: `MEDICAL VIDEO REPORT\n\n${fileName}\n\nDate: ${date}\nFacility: ${randomFacility}\nTechnician: ${randomDoctor}\n\nPROCEDURE NOTES:\nThe recording shows normal physiological activity. No arrhythmias detected. Waveforms appear within normal limits.\n\nDURATION: ${Math.floor(1 + Math.random() * 5)} minutes\n\nINTERPRETATION:\nNormal study.`
    };
  }
  return `This is a ${fileType} file containing medical information about your recent visit to ${randomFacility}.`;
};

// Generate sample medical files with realistic content
const generateSampleFiles = () => {
  const fileTypes = ["pdf", "pdf", "pdf", "docx", "img", "img", "video", "video"];
  const categories = ["medical", "medical", "lab", "medical", "medical", "lab", "medical", "medical"];
  const prefixes = ["Annual Checkup", "Blood Test", "MRI Scan", "Prescription", "X-Ray", "Ultrasound", "ECG", "Endoscopy"];
  
  return Array.from({ length: 8 }, (_, i) => {
    const type = fileTypes[i];
    const prefix = prefixes[i];
    const name = `${prefix} ${type === "img" ? (prefix.includes("X-Ray") ? "Image" : "Scan") : type === "video" ? "Recording" : "Report"}.${type}`;
    const content = generateMedicalContent(type, name);
    
    return {
      id: i + 1,
      name,
      type,
      size: type === "pdf" ? `${(1.5 + Math.random() * 3).toFixed(1)} MB` : 
            type === "docx" ? `${(0.2 + Math.random() * 0.5).toFixed(1)} MB` : 
            type === "img" ? `${(2 + Math.random() * 4).toFixed(1)} MB` : 
            `${(5 + Math.random() * 10).toFixed(1)} MB`,
      category: categories[i],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      content: type === "img" || type === "video" ? content.report : content,
      mediaUrl: type === "img" || type === "video" ? content.url : null
    };
  });
};

const sampleMedicalFiles = generateSampleFiles();

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
  const filesData = useSelector((s) => s.Docsaura.files) || sampleMedicalFiles;
  const activityData = useSelector((s) => s.Docsaura.activity) || [
    "Dr. Smith uploaded Medical Report",
    "Lab updated Blood Test Results",
    "You downloaded Prescription",
    "You viewed X-Ray Scan",
    "Dr. Johnson added Consultation Notes"
  ];

  const [files, setFiles] = useState(filesData);
  const [activity, setActivity] = useState(activityData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [selectedFilesToDelete, setSelectedFilesToDelete] = useState([]);
  const [showAddFile, setShowAddFile] = useState(false);
  const [newFile, setNewFile] = useState({ name: "", type: "", size: "", category: "medical" });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [fileContent, setFileContent] = useState("");
  const [playingVideo, setPlayingVideo] = useState(false);

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
    setFileContent(file.content || generateMedicalContent(file.type, file.name));
    setPlayingVideo(false);
    
    if (file.type === "pdf") {
      setPreviewFile({ type: "pdf", content: file.content });
    } else if (file.type === "img") {
      setPreviewFile({ 
        type: "img", 
        url: file.mediaUrl || sampleMedicalImages[0],
        content: file.content
      });
    } else if (file.type === "video") {
      setPreviewFile({ 
        type: "video", 
        url: file.mediaUrl || sampleMedicalVideos[0],
        content: file.content
      });
    } else {
      setPreviewFile({ type: "text", content: file.content });
    }
    
    setActivity([`You viewed ${file.name}`, ...activity.slice(0, 9)]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop();
      const content = generateMedicalContent(fileType, file.name);
      
      setNewFile({
        name: file.name,
        type: fileType,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        category: "medical",
        content: fileType === "img" || fileType === "video" ? content.report : content,
        mediaUrl: fileType === "img" || fileType === "video" ? URL.createObjectURL(file) : null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFile.name && newFile.type && newFile.size) {
      const newFileWithId = {
        ...newFile,
        id: Math.max(...files.map(f => f.id)) + 1,
        date: new Date().toLocaleDateString()
      };
      
      dispatch(addFile(newFileWithId));
      setFiles([newFileWithId, ...files]);
      setActivity([`You uploaded "${newFile.name}"`, ...activity.slice(0, 9)]);
      setShowAddFile(false);
      setNewFile({ name: "", type: "", size: "", category: "medical" });
    }
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFilesToDelete((prevSelected) =>
      prevSelected.includes(fileId)
        ? prevSelected.filter((id) => id !== fileId)
        : [...prevSelected, fileId]
    );
  };

  const handleDeleteFiles = () => {
    dispatch(deleteFiles(selectedFilesToDelete));
    setFiles(files.filter(file => !selectedFilesToDelete.includes(file.id)));
    setActivity([`You deleted ${selectedFilesToDelete.length} files`, ...activity.slice(0, 9)]);
    setSelectedFilesToDelete([]);
  };

  const handleDownload = (file) => {
    const element = document.createElement("a");
    const textFile = new Blob([file.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(textFile);
    element.download = file.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setActivity([`You downloaded ${file.name}`, ...activity.slice(0, 9)]);
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
                <FaFileMedical /> <span>Medical Reports</span> <span>{files.filter(f => f.category === "medical").length} files</span>
              </div>
              <div className="file-stat">
                <FaFlask /> <span>Lab Results</span> <span>{files.filter(f => f.category === "lab").length} files</span>
              </div>
              <div className="file-stat">
                <FaFileAlt /> <span>Total Files</span> <span>{files.length} files</span>
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
            <div className="action-buttons">
              <button 
                className="upload-btn"
                onClick={() => setShowAddFile(true)}
              >
                <FaCloudUploadAlt /> Upload
              </button>
              {selectedFilesToDelete.length > 0 && (
                <button className="delete-btn" onClick={handleDeleteFiles}>
                  <FaTrash /> Delete ({selectedFilesToDelete.length})
                </button>
              )}
            </div>
          </div>

          {/* File grid */}
          <div className="file-grid">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => {
                const fileType = file.type in fileIcons ? file.type : "default";
                return (
                  <div
                    key={file.id}
                    className={`file-card ${selectedFilesToDelete.includes(file.id) ? "selected" : ""}`}
                    style={{ borderLeft: `4px solid ${fileIcons[fileType].color}` }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilesToDelete.includes(file.id)}
                      onChange={() => toggleFileSelection(file.id)}
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
                        <p className="file-date">Uploaded: {file.date}</p>
                      </div>
                    </div>
                    <button 
                      className="download-file-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(file);
                      }}
                    >
                      <FaDownload size={14} />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="no-files">
                <FaFile size={48} color="#ccc" />
                <p>No files found</p>
                <button 
                  className="upload-btn"
                  onClick={() => setShowAddFile(true)}
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
          <ul className="activity-list">
            {activity.map((act, index) => (
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
                  value={newFile.category}
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
                        e.target.src = "https://via.placeholder.com/400x300?text=Medical+Image";
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
              >
                <FaDownload /> Download
              </button>
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