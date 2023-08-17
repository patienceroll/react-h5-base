import { useState, useCallback } from "react";

export default function (defaultValue: boolean = false) {
  const [show, setShow] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setShow(true);
  }, []);

  const setFalse = useCallback(() => {
    setShow(false);
  }, []);

  return {
    value: show,
    setTrue,
    setFalse,
  };
}
