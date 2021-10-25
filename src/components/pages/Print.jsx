import React from "react";
import { useEffect } from "react/cjs/react.development";
import { View } from "./create/create-index";

export default function Print({ user, openAlert }) {
  useEffect(() => {
    printPage();
  }, []);
  const printPage = () => {
    setTimeout(window.print, 1000);
  };
  console.log(user);
  return (
    <>
      <View
        user={user}
        updateViewing={() => {}}
        mode="print"
        openAlert={openAlert}
      />
    </>
  );
}
