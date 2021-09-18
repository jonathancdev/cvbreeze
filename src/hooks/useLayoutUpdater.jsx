import { useEffect } from "react";

export default function useLayoutUpdater(layoutObj, callback) {
  useEffect(() => {
    callback(layoutObj);
    return () => {
      callback({
        section: "",
        headerText: "",
        toolTip: "",
      });
    };
  }, [callback, layoutObj]);
}
