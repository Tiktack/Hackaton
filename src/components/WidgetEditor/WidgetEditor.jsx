/* eslint-disable react/button-has-type */
import React, { Component } from "react";
import EditorJS from "@editorjs/editorjs";
import { parcer } from "../../helpers/widgetParcer";
import { slotWidget, headerOffer, meta } from "./constants";
import { saveObjectAsJson, formatExport } from "../../helpers/jsonHelper";
import Files from "react-files";
import { importFromJson } from "../../helpers/jsonHelper";

class WidgetEditor extends Component {
  constructor() {
    super();
    this.editor = undefined;
    this.state = {
      jsonFile: {}
    };

    this.fileReader = new FileReader();
    this.fileReader.onload = event => {
      this.setState(
        { jsonFile: importFromJson(JSON.parse(event.target.result)) },
        () => {
          console.log(this.state.jsonFile);
        }
      );
    };
  }

  save = () => {
    this.editor.save().then(output => {
      console.log(output);
      saveObjectAsJson(formatExport(output));
    });
  };

  componentWillUpdate = () => {
    var elem = document.querySelector("#editor");
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
  }
  };

  componentDidMount = () => {
    this.editor = new EditorJS({
      holder: "editor",
      autofocus: true,
      tools: {
        SlotWidget: {
          class: parcer.generateClassFromWidget(slotWidget)
        },
        headerOffer: {
          class: parcer.generateClassFromWidget(headerOffer)
        },
        meta: {
          class: parcer.generateClassFromWidget(meta)
        }
      },
      data: this.state.jsonFile
    });
  };

  componentDidUpdate = () => {
    this.editor = new EditorJS({
      holder: "editor",
      autofocus: true,
      tools: {
        SlotWidget: {
          class: parcer.generateClassFromWidget(slotWidget)
        },
        headerOffer: {
          class: parcer.generateClassFromWidget(headerOffer)
        },
        meta: {
          class: parcer.generateClassFromWidget(meta)
        }
      },
      data: this.state.jsonFile
    });
  };

  render() {
    return (
      <>
        <Files
          className="files-dropzone"
          onChange={file => {
            this.fileReader.readAsText(file[0]);
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
        <button onClick={() => this.save()}>save</button>
        <div id="editor" className="editor" />
      </>
    );
  }
}

export default WidgetEditor;
