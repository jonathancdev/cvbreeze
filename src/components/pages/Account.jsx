import React from "react";
import Layout from "../layout/Layout";
import InputEditable from "../InputEditable";
import { useHistory } from "react-router-dom";

export default function Account({
  user,
  sessionActive,
  logUserIn,
  logUserOut,
  openConfirm,
}) {
  const history = useHistory();
  const updateUserInformation = (key, value) => {
    user[key] = value;
    localStorage.setObject(user.storageKey, user);
    logUserIn({ ...user });
  };

  const handleSignOut = () => {
    openConfirm(
      "are you sure you want to sign out?",
      () => confirmSignOut,
      () => noop
    );
  };
  const handleDeleteAccount = () => {
    openConfirm(
      "are you sure you want to permanently delete your account?",
      () => confirmDelete,
      () => noop
    );
  };
  const confirmDelete = () => {
    const userKeys = Object.keys(localStorage).filter((obj) =>
      obj.includes(user.userId)
    );
    localStorage.removeItem(user.storageKey);
    localStorage.removeItem("currentUser");
    userKeys.forEach((key) => localStorage.removeItem(key));
    logUserOut();
    history.push("/signup");
  };
  const confirmSignOut = () => {
    logUserOut();
    history.push("/signin");
  };
  const noop = () => {};
  return (
    <Layout sessionActive={sessionActive} logUserOut={logUserOut} user={user}>
      <section className="account">
        <h2 className="heading-secondary margin-top-extra-small margin-bottom-extra-small">
          Account information
        </h2>
        {sessionActive ? (
          <div>
            <div className="margin-bottom-large">
              <InputEditable
                inputType="text"
                userKey="firstName"
                userInfo="first name"
                rules={{ type: "regex", rule: /^[A-Za-z]+$/ }}
                errorMessage={"enter a valid first name"}
                defaultValue={user.firstName}
                updateUserInformation={updateUserInformation}
                openConfirm={openConfirm}
              />
              <InputEditable
                inputType="text"
                userKey="lastName"
                userInfo="last name"
                rules={{ type: "regex", rule: /^[A-Za-z]+$/ }}
                errorMessage={"enter a valid last name"}
                defaultValue={user.lastName}
                updateUserInformation={updateUserInformation}
                openConfirm={openConfirm}
              />
              <InputEditable
                inputType="text"
                userKey="profession"
                userInfo="profession"
                rules={null}
                errorMessage={null}
                defaultValue={user.profession}
                updateUserInformation={updateUserInformation}
                openConfirm={openConfirm}
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
                openConfirm={openConfirm}
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
                openConfirm={openConfirm}
              />
            </div>

            <button
              className="btn btn--create-navlink margin-top-medium"
              onClick={handleSignOut}
            >
              sign out
            </button>
            <button
              className="btn btn--create-navlink margin-top-extra-small"
              onClick={handleDeleteAccount}
            >
              delete account
            </button>
          </div>
        ) : (
          "sign in to access your account information"
        )}
      </section>
    </Layout>
  );
}
