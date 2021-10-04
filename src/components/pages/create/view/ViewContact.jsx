import React from "react";

export default function ViewContact({ user, section }) {
  const obj = localStorage.getObject(user.userId + section);
  const { address, email, telephone, website } = obj;

  return (
    <section className="view__contact margin-bottom-extra-small">
      <p className="contact__text">{telephone}</p>
      <p className="contact__text">{email}</p>
      <p className="contact__text">{address}</p>
      <p className="contact__text">{website}</p>
    </section>
  );
}
