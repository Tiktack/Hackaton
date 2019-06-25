import * as React from "jsx-dom";
import {
  stringType,
  arrayType,
  boolType,
  campaignImageType,
  dateType,
  imageType
} from "./types";
import {
  inputSelect,
  imageSelect,
  descriptionSelect,
  dateSelect,
  boolSelect,
  arraySelector
} from "./selectors";

const generateProperty = (
  { name, displayName, type, validation, subType },
  value
) => {
  switch (type) {
    case "string":
      return stringType(name, displayName, value, validation);
    case "image":
      return imageType(name, displayName, value);
    case "boolean":
      return boolType(name, displayName, value);
    case "date":
      return dateType(name, displayName, value);
    case "campaignImage":
      return campaignImageType(name, displayName, value);
    case "array":
      return arrayType(name, displayName, value, subType);
    default:
      throw new Error("unrecognized type");
  }
};

const getValue = (element, data) => {
  if (!data["props"]) {
    if (element.default) {
      return element.default;
    }
    return null;
  }
  return data.props[element.name];
};
/**
 * @param {Object} widgetObject object that should contain componentName displayName props
 */
const parceWidgetObjectView = ({ componentName, displayName, props }, data) => {
  const toggleWidget = e => {
    widgetProps.classList.toggle("hide");
    arrow.classList.toggle("active");
  };
  const makeContentEditable = e => {
    e.target.contentEditable = true;
    e.target.focus();
  };
  const makeContentNotEditable = e => {
    e.target.contentEditable = false;
  };

  const widgetProps = <div className="widgetProps" />;

  props.forEach(element => {
    widgetProps.appendChild(generateProperty(element, getValue(element, data)));
  });
  const arrow = <div class="arrow-down" />;

  const widget = (
    <div className={`widget widget-${componentName}`}>
      <div className="widgetHeader">
        <label onclick={toggleWidget} className="arrow-widgetName">
          {arrow}
          <div className="widgetName">{displayName}</div>
        </label>
        <div className="vr" />
        <div
          name="description"
          className="widgetDescription"
          ondblclick={makeContentEditable}
          onblur={makeContentNotEditable}
        >
          {data.description}
        </div>
      </div>
    </div>
  );
  widget.appendChild(widgetProps);
  return widget;
};

const selectDataFromProperty = (blockContent, { name, type, subType }) => {
  switch (type) {
    case "string":
      return inputSelect(blockContent, name);
    case "image":
      return imageSelect(blockContent, name);
    case "campaignImage":
      return imageSelect(blockContent, name);
    case "boolean":
      return boolSelect(blockContent, name);
    case "date":
      return dateSelect(blockContent, name);
    case "description":
      return descriptionSelect(blockContent);
    case "array":
      return arraySelector(blockContent, subType, name)
    default:
      throw new Error("unrecognized type");
  }
};

const parceWidgetObjectSave = (blockContent, { componentName, props }) => {
  const result = {
    componentName,
    description: selectDataFromProperty(blockContent, { type: "description" }),
    props: {}
  };
  for (const key of props) {
    result.props[key.name] = selectDataFromProperty(blockContent, key);
  }
  return result;
};

const generateClassFromWidget = widgetObject => {
  class WidgetClass {
    static get toolbox() {
      return {
        title: widgetObject.displayName,
        icon:
          '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
      };
    }

    constructor({ data, api }) {
      this.data = data;
      this.widget = widgetObject;
      this.api = api;
      this.settings = [
        {
          name: "withBorder",
          icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`
        }
      ];
    }

    insertBelow = () => {
      this.api.blocks.insertNewBlock();
    };

    render = () => parceWidgetObjectView(this.widget, this.data);

    save = blockContent => parceWidgetObjectSave(blockContent, this.widget);

    renderSettings = () => {
      const wrapper = <div />;

      this.settings.forEach(tune => {
        const button = <div onclick={this.insertBelow} />;
        button.classList.add("cdx-settings-button");
        button.innerHTML = tune.icon;
        wrapper.appendChild(button);
      });

      return wrapper;
    };
  }

  return WidgetClass;
};

export const parcer = {
  generateProperty,
  parceWidgetObjectView,
  selectDataFromProperty,
  parceWidgetObjectSave,
  generateClassFromWidget
};
