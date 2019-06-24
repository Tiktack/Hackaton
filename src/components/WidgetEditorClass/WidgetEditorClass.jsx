import React from "react";
import EditorJS from "@editorjs/editorjs";
import { formatExport, importFromJson } from "../helpers/jsonHelper";
import { createConfig } from "../helpers/configCreator";

class WidgetEditorClass extends React.Component {
  constructor(props) {
    super(props);
    this.editor = new EditorJS(
      createConfig(importFromJson(props.data), props.types)
    );
  }

  async save() {
    return formatExport(await this.editor.save());
  }

  componentWillUpdate = () => {
    var elem = document.querySelector("#editor");
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  };

  componentWillReceiveProps = ({ data, types }) => {
    this.editor = new EditorJS(createConfig(importFromJson(data), types));
  };

  render = () => <div id="editor" className="editor" />;
}

export default WidgetEditorClass;
