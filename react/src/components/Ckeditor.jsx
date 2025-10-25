import React, { useEffect, useRef } from "react";

const Ckeditor = ({ value = "", onChange }) => {
  const editorRef = useRef(null);
  const idRef = useRef(`ckeditor-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!window.CKEDITOR || !editorRef.current) return;

    const id = idRef.current;

    // Destroy instance cũ nếu tồn tại
    if (window.CKEDITOR.instances[id]) {
      window.CKEDITOR.instances[id].destroy();
    }

    // Replace textarea bằng CKEditor
    window.CKEDITOR.replace(editorRef.current);

    // Lắng nghe thay đổi
    const editorInstance = window.CKEDITOR.instances[id];
    editorInstance.on("change", () => {
      onChange && onChange(editorInstance.getData());
    });

    // Cleanup khi unmount
    return () => {
      if (window.CKEDITOR.instances[id]) {
        window.CKEDITOR.instances[id].destroy();
      }
    };
  }, []);

  return <textarea ref={editorRef} id={idRef.current} defaultValue={value} />;
};

export default Ckeditor;
