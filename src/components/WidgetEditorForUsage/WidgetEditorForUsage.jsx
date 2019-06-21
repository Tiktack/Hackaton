/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
import EditorJS from "@editorjs/editorjs";
import { parcer } from "../../helpers/widgetParcer";
import { slotWidget, headerOffer, meta } from "../../constants";
import { formatExport } from "../../helpers/jsonHelper";

const WidgetEditorForUsage = forwardRef(({ data }, ref) => {
  const editor = useRef(undefined);

  useImperativeHandle(ref, () => ({
    async save() {
      return formatExport(await editor.current.save());
    }
  }));
  
  useEffect(() => {
    editor.current = new EditorJS({
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
      data
    });

    return () => {
      var elem = document.querySelector("#editor");
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    };
  });

  return <div id="editor" className="editor" />;
});

export default WidgetEditorForUsage;
