import React, { useLayoutEffect, useState } from "react";
import testUserPhoto from "../../../../img/AI_photo.jpg";

export default function ViewPhoto({ user, section }) {
  const { userPhoto } = localStorage.getObject(user.userId + section);
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
  }, [userPhoto]);
  return (
    <section className="view__photo">
      <div className="view__photo--shape">
        {photo ? (
          <img src={photo} alt="user" className="view__photo--file" />
        ) : (
          <div className="view__initials">
            {user.firstName[0] + user.lastName[0]}
          </div>
        )}
      </div>
    </section>
  );
}
