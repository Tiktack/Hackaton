import React, { useRef, useState, useEffect } from "react";
import "./App.scss";
import WidgetEditorForUsage from "./components/WidgetEditorForUsage/WidgetEditorForUsage.jsx";
import Files from "react-files";
import { importFromJson, saveJsonAsFile } from "./helpers/jsonHelper";

function UsageExample() {
  const editor = useRef();
  const [data, setData] = useState({});
  const [fileReader] = useState(new FileReader());

  useEffect(() => {
    fileReader.onload = event => {
      console.log(editor);
      setData(importFromJson(JSON.parse(event.target.result)));
    };
  }, [fileReader.onload]);

  const handleSave = async () => {
    saveJsonAsFile(await editor.current.save());
  };

  return (
    <>
      <Files
        className="files-dropzone"
        onChange={file => {
          fileReader.readAsText(file[0]);
        }}
        onError={err => console.log(err)}
        accepts={[".json"]}
        multiple
        maxFiles={3}
        maxFileSize={10000000}
        minFileSize={0}
        clickable
      >
        Drop files here or click to upload
      </Files>
      <button onClick={handleSave}>Save as JSON</button>
      <WidgetEditorForUsage ref={editor} data={data} />
    </>
  );
}

export default UsageExample;
