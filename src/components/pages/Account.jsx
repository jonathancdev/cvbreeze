import React, { useState, useRef } from "react";
import InputEditable from "../InputEditable";
import { Link, useHistory } from "react-router-dom";

export default function Account({
  user,
  sessionActive,
  logUserIn,
  logUserOut,
}) {
  const history = useHistory();
  const updateUserInformation = (key, value) => {
    user[key] = value;
    localStorage.setObject(user.storageKey, user);
    logUserIn({ ...user });
  };

  const handleSignOut = () => {
    alert("are you sure you want to sign out?");
    logUserOut();
    history.push("/signin");
  };
  const handleDeleteAccount = () => {
    const userKeys = Object.keys(localStorage).filter((obj) =>
      obj.includes(user.userId)
    );
    alert("are you sure you want to permanently delete your account?");
    localStorage.removeItem(user.storageKey);
    localStorage.removeItem("currentUser");
    userKeys.forEach((key) => localStorage.removeItem(key));
    logUserOut();
    history.push("/signup");
  };

  return (
    <div>
      {sessionActive ? (
        <div>
          <div>
            <InputEditable
              inputType="text"
              userKey="firstName"
              userInfo="first name"
              rules={{ type: "regex", rule: /^[A-Za-z]+$/ }}
              errorMessage={"enter a valid first name"}
              defaultValue={user.firstName}
              updateUserInformation={updateUserInformation}
            />
            <InputEditable
              inputType="text"
              userKey="lastName"
              userInfo="last name"
              rules={{ type: "regex", rule: /^[A-Za-z]+$/ }}
              errorMessage={"enter a valid last name"}
              defaultValue={user.lastName}
              updateUserInformation={updateUserInformation}
            />
            <InputEditable
              inputType="text"
              userKey="profession"
              userInfo="profession"
              rules={null}
              errorMessage={null}
              defaultValue={user.profession}
              updateUserInformation={updateUserInformation}
            />
            <InputEditable
              inputType="email"
              userKey="email"
              userInfo="email"
              rules={{
                type: "regex",
                rule: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              }}
              errorMessage={"enter a valid email"}
              defaultValue={user.email}
              updateUserInformation={updateUserInformation}
            />
            <InputEditable
              inputType="password"
              userKey="password"
              userInfo="password"
              rules={{
                type: "minLength",
                rule: 8,
              }}
              errorMessage={"password must be at least 8 characters"}
              defaultValue={user.password}
              updateUserInformation={updateUserInformation}
            />
          </div>
          <div>
            <button onClick={handleSignOut}>sign out</button>
            <button onClick={handleDeleteAccount}>delete account</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
