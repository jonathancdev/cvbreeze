import React, { useLayoutEffect, useState } from "react";
import testUserPhoto from "../../../../img/AI_photo.jpg";

export default function ViewPhoto({ user, section }) {
  const { userPhoto, filePath } = localStorage.getObject(user.userId + section);
  const [photo, setPhoto] = useState(null);
  useLayoutEffect(() => {
    if (userPhoto) {
      if (userPhoto === "test user") {
        setPhoto(testUserPhoto);
      } else {
        setPhoto(userPhoto);
      }
    } else {
      setPhoto(null);
    }
  });
  return (
    <section className="view__photo">
      <div className="view__photo--shape">
        <img src={photo} alt="cv user photo" className="view__photo--file" />
      </div>
    </section>
  );
}
