import React, { useEffect, useRef, useImperativeHandle } from "react";
import EditorJS from "@editorjs/editorjs";
import { formatExport, importFromJson } from "../helpers/jsonHelper";
import { createConfig } from "../helpers/configCreator";

const WidgetEditor = ({ data, types }, ref) => {
  const editor = useRef();

  useImperativeHandle(ref, () => ({
    async save() {
      return formatExport(await editor.current.save());
    }
  }));

  useEffect(() => {
    editor.current = new EditorJS(createConfig(importFromJson(data), types));

    return () => {
      var elem = document.querySelector("#editor");
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    };
  });

  return <div id="editor" className="editor" />;
};

export default React.forwardRef(WidgetEditor);
