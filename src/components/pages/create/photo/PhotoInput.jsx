import React, { useRef } from "react";

export default function PhotoInput({
  filePath,
  updateFilePath,
  updateTempPhoto,
  includeUserPhoto,
}) {
  const fileInput = useRef();

  const getUserPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (r) => {
      updateTempPhoto(r.target.result);
    };
    if (file) {
      //checks for file to solve error when filereader called and cancelled after already using to choose photo
      reader.readAsDataURL(file);
    }
  };

  const getPath = () => {
    if (fileInput.current.files[0]) {
      //stops attempt to update with filereader error
      const path = fileInput.current.files[0].name;
      updateFilePath(path);
    }
  };

  const handleInputChange = (e) => {
    getUserPhoto(e);
    getPath();
  };
  return (
    <>
      <input
        margin-top-medium
        placeholder={filePath}
        type="text"
        className="input--standard margin-top-extra-small"
        disabled={!includeUserPhoto}
      />
      <label htmlFor="browse" className="input__label">
        <div className="input--hidden-layer"></div>
      </label>
      <input
        ref={fileInput}
        id="browse"
        onChange={handleInputChange}
        type="file"
        accept="img/png, image/gif, image/jpeg"
        className="input--hidden-browse"
        hidden
        disabled={!includeUserPhoto}
      />
    </>
  );
}

//INPUT--HIDDEN-BROWSE WILL HAVE HIDDEN ATTRIBUTE **********************************************************
