import React from "react";
import { useEffect, useRef } from "react";

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const joditInstance = useRef(null);

  useEffect(() => {
    if (window.Jodit && editorRef.current && !joditInstance.current) {
      joditInstance.current = window.Jodit.make(editorRef.current, {
        height: 400,
        readonly: false,
        placeholder: "Write your blog content...",
      });

      joditInstance.current.value = value || "";

      joditInstance.current.events.on("change", () => {
        onChange(joditInstance.current.value);
      });
    }

    return () => {
      if (joditInstance.current) {
        joditInstance.current.destruct();
        joditInstance.current = null;
      }
    };
  }, []);

  return <textarea ref={editorRef} defaultValue={value}></textarea>;
};

export default RichTextEditor;
