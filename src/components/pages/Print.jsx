import React from "react";
import { useEffect } from "react/cjs/react.development";
import { View } from "./create/create-index";

export default function Print({ user, openAlert }) {
  useEffect(() => {
    setTimeout(printPage, 1000);
  }, []);
  const printPage = () => {
    window.print();
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
