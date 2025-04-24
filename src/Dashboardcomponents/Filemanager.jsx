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
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addFile, deleteFiles } from "../data/DocsauraSlice";

const fileIcons = {
  pdf: { icon: <FaFilePdf size={32} color="red" />, color: "#FF0000" },
  docx: { icon: <FaFileWord size={32} color="blue" />, color: "#2563EB" },
  img: { icon: <FaFileImage size={32} color="green" />, color: "#008000" },
  video: { icon: <FaFileVideo size={32} color="purple" />, color: "#800080" },
  default: {
    icon: <FaFile size={32} color="rgb(0, 113, 128)" />,
    color: "rgb(0, 113, 128)",
  },
};

export default function FileManager() {
  const dispatch = useDispatch();
  const filesData = useSelector((s) => s.Docsaura.files);
  const activityData = useSelector((s) => s.Docsaura.activity);

  const [files, setFiles] = useState(filesData || []);
  const [activity, setActivity] = useState(activityData || []);
  const [selectedFile, setSelectedFile] = useState(null); // File selected for preview
  const [previewFile, setPreviewFile] = useState(null);
  const [selectedFilesToDelete, setSelectedFilesToDelete] = useState([]);
  const [AddFile, setAddFile] = useState(false);
  const [newFile, setNewFile] = useState({ name: "", type: "", size: "" });

  useEffect(() => {
    setFiles(filesData);
    setActivity(activityData);
  }, [filesData, activityData]);

  // Handle preview of the selected file
// Handle preview of the selected file
const handleFilePreview = (file) => {
  setSelectedFile(file);
  const fileType = file.type.split("/")[0]; // Extracts the type (e.g., "application", "image", etc.)

  if (fileType === "application" && file.type === "application/pdf") {
    // If it's a PDF file, handle it correctly
    setPreviewFile({ type: "pdf", url: URL.createObjectURL(file) });
  } else if (fileType === "image") {
    // If it's an image, handle it accordingly
    setPreviewFile({ type: "img", url: URL.createObjectURL(file) });
  } else if (fileType === "video") {
    // If it's a video, handle it accordingly
    setPreviewFile({ type: "video", url: URL.createObjectURL(file) });
  } else {
    // In case the file type is not supported, you can choose to show a message or error
    console.error("Unsupported file type:", file.type);
  }
};


  // Handle file upload change
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile((prevFile) => ({
        ...prevFile,
        name: file.name,
        type: file.type.split("/")[1],
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      }));
    }
  };

  // Add file to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFile.name && newFile.type && newFile.size) {
      setFiles((prevFiles) => [...prevFiles, newFile]);
      setActivity((prevActivity) => [
        ...prevActivity,
        `File "${newFile.name}" uploaded`,
      ]);
      setAddFile(false);
      setNewFile({ name: "", type: "", size: "" });
    }
  };

  // Toggle file selection for deletion
  const toggleFileSelection = (fileName) => {
    setSelectedFilesToDelete((prevSelected) =>
      prevSelected.includes(fileName)
        ? prevSelected.filter((name) => name !== fileName)
        : [...prevSelected, fileName]
    );
  };

  // Delete selected files
  const handleDeleteFiles = () => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => !selectedFilesToDelete.includes(file.name))
    );
    setActivity((prevActivity) => [
      ...prevActivity,
      `Deleted ${selectedFilesToDelete.length} files`,
    ]);
    setSelectedFilesToDelete([]);
  };

  return (
    <div className="file-manager-wrapper">
      {!AddFile ? (
        <>
          <main className="file-manager-main">
            <div className="file-manager-header">
              <h2 className="file-manager-title">Files</h2>
              <input
                type="text"
                className="file-manager-search"
                placeholder="Search files"
                onChange={(e) => {
                  setFiles(
                    filesData.filter((file) =>
                      file.name.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                  );
                }}
              />
              <button
                className="file-manager-add-button"
                onClick={() => setAddFile(true)}
              >
                <FaPlus size={16} className="file-manager-icon" /> Add File
              </button>
            </div>

            <div className="file-manager-grid">
              {files.map((file, index) => {
                const fileType = file.type in fileIcons ? file.type : "default";
                return (
                  <div
                    key={index}
                    className="file-manager-card"
                    style={{ borderColor: fileIcons[fileType].color }}
                    onClick={() => handleFilePreview(file)} // Click to preview
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilesToDelete.includes(file.name)}
                      onChange={() => toggleFileSelection(file.name)}
                      className="file-checkbox"
                    />
                    <div className="file-manager-content">
                      {fileIcons[fileType].icon}
                      <p
                        className="file-manager-file-name"
                        style={{ color: fileIcons[fileType].color }}
                      >
                        {file.name}
                      </p>
                      <p className="file-manager-file-size">{file.size}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedFilesToDelete.length > 0 && (
              <button
                className="file-manager-delete-button"
                onClick={handleDeleteFiles}
              >
                <FaTrash size={16} className="file-manager-icon" /> Delete Selected ({selectedFilesToDelete.length})
              </button>
            )}
          </main>

          <aside className="file-manager-activity-panel">
            <h2 className="file-manager-activity-title">Recent Activity</h2>
            <ul className="file-manager-activity-list">
              {activity.map((act, index) => (
                <li key={index} className="file-manager-activity-item">
                  <FaTasks size={18} className="file-manager-activity-icon" />
                  <span>
                    {act.length > 40 ? act.slice(0, 30) + "..." : act}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </>
      ) : (
        <div className="file-manager-add-file-form">
          <h2>Add New File</h2>
          <form onSubmit={handleSubmit}>
            <div className="file-manager-form-group">
              <label>File Name:</label>
              <input
                type="text"
                name="name"
                value={newFile.name}
                onChange={(e) =>
                  setNewFile((prevFile) => ({
                    ...prevFile,
                    name: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="file-manager-form-group">
              <label>File Type:</label>
              <select
                name="type"
                value={newFile.type}
                onChange={(e) =>
                  setNewFile((prevFile) => ({
                    ...prevFile,
                    type: e.target.value,
                  }))
                }
                required
              >
                <option value="">Select Type</option>
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="img">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="file-manager-form-group">
              <label>Upload File:</label>
              <input
                type="file"
                name="file"
                onChange={handleFileUpload}
                required
              />
            </div>
            <button type="submit" className="file-manager-submit-button">
              Add File
            </button>
          </form>
        </div>
      )}

      {previewFile && (
        <div className="file-preview">
          <h3>File Preview</h3>
          {previewFile.type === "pdf" && (
            <embed src={previewFile.url} width="100%" height="500px" />
          )}
          {previewFile.type === "img" && (
            <img src={previewFile.url} alt="Preview" width="100%" />
          )}
          {previewFile.type === "video" && (
            <video src={previewFile.url} controls width="100%" />
          )}
        </div>
      )}
    </div>
  );
}
