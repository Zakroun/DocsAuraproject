import filesData from "../data/data";
import React, { useState } from "react";
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
  const [files, setFiles] = useState(filesData.files);
  const [recentActivity, setRecentActivity] = useState(filesData.activity);
  const [selectedFile, setSelectedFile] = useState("");
  const [AddFile, setAddFile] = useState(false);
  const [newFile, setNewFile] = useState({ name: "", type: "", size: "" });
  const [selectedFilesToDelete, setSelectedFilesToDelete] = useState([]);

  const Search = (e) => {
    setSelectedFile(e);
    setFiles(
      filesData.files.filter((file) =>
        file.name.toLowerCase().includes(e.toLowerCase())
      )
    );
  };

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

  const changetoaddfile = () => {
    setAddFile(true);
  };

  const handleFileChange = (e) => {
    const { name, value } = e.target;
    setNewFile((prevFile) => ({
      ...prevFile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFile.name && newFile.type && newFile.size) {
      setFiles((prevFiles) => [...prevFiles, newFile]);
      setRecentActivity((prevActivity) => [
        ...prevActivity,
        `File "${newFile.name}" uploaded`,
      ]);
      setAddFile(false);
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
    setFiles((prevFiles) =>
      prevFiles.filter((file) => !selectedFilesToDelete.includes(file.name))
    );
    setRecentActivity((prevActivity) => [
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
                value={selectedFile}
                onChange={(e) => Search(e.target.value)}
              />
              <button
                className="file-manager-add-button"
                onClick={changetoaddfile}
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
              {recentActivity.map((activity, index) => (
                <li key={index} className="file-manager-activity-item">
                  <FaTasks size={16} className="file-manager-activity-icon" />
                  <span>
                    {activity.length > 40
                      ? activity.slice(0, 30) + "..."
                      : activity}
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
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="file-manager-form-group">
              <label>File Type:</label>
              <select
                name="type"
                value={newFile.type}
                onChange={handleFileChange}
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
              <input type="file" name="file" onChange={handleFileUpload} required />
            </div>
            <button type="submit" className="file-manager-submit-button">
              Add File
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
