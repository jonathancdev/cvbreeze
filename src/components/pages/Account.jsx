import React, { useState, useRef } from "react";
import InputEditable from "../InputEditable";

export default function Account({ user, logUserIn, logUserOut }) {
  console.log(user.storageKey);

  //state
  const [tempUser, setTempUser] = useState(user);

  //refs
  const firstName = useRef(null);

  const updateUserInformation = (key, value) => {
    user[key] = value;
    localStorage.setObject(user.storageKey, user);
    logUserIn({ ...user });
  };

  console.log(tempUser);
  return (
    <div>
      <div>
        <p>account</p>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.profession}</p>
        <p>{user.email}</p>
        <p>{user.password}</p>
      </div>
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
    </div>
  );
}
