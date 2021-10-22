import React from "react";
import { useLayoutEffect } from "react/cjs/react.development";
import { View } from "./create/create-index";

export default function Print({ user }) {
  useLayoutEffect(() => {
    setTimeout(window.print, 1000);
  });
  return (
    <>
      <View user={user} updateViewing={() => {}} mode="print" />
    </>
  );
}
