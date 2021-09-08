import React, { useRef } from "react";

export default function PhotoInput({
  filePath,
  updateFilePath,
  updateUserPhoto,
}) {
  const fileInput = useRef();

  const getUserPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (r) => {
      updateUserPhoto(r.target.result);
    };
    reader.readAsDataURL(file);
  };

  const getPath = () => {
    const path = fileInput.current.files[0].name;
    updateFilePath(path);
  };

  const handleInputChange = (e) => {
    getUserPhoto(e);
    getPath();
  };
  return (
    <>
      <label htmlFor="" className="input__label"></label>
      <input
        placeholder={filePath}
        type="text"
        className="input--standard"
        disabled
      />
      <input
        ref={fileInput}
        onChange={handleInputChange}
        type="file"
        accept="img/png, image/gif, image/jpeg"
        className="input--hidden-browse"
      />
    </>
  );
}

//input--hidden-browse will have hidden attribute
