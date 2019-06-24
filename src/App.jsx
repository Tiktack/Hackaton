import React, { useRef, useState, useEffect } from "react";
import "./App.scss";
import Files from "react-files";
import { saveJsonAsFile } from "./components/helpers/jsonHelper";
import { slotWidget, headerOffer, meta } from "./constants";
import WidgetEditorClass from "./components/WidgetEditorClass";
import WidgetEditor from "./components/WidgetEditor";

function App() {
  const editor = useRef();
  const [data, setData] = useState({ meta: {}, headerOffer: {}, body: [] });
  const [fileReader] = useState(new FileReader());

  useEffect(() => {
    fileReader.onload = event => {
      setData(JSON.parse(event.target.result));
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
      <WidgetEditor
        ref={editor}
        data={data}
        types={[slotWidget, meta, headerOffer]}
      />
    </>
  );
}

export default App;
