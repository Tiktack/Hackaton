import * as React from "jsx-dom";

const stringType = (name, displayName, value) => (
  <div className="property">
    <div className="property-label">{displayName}</div>
    <div className="property-input">
      <input type="text" name={name} value={value} />
    </div>
  </div>
);

const imageType = (name, displayName, value) => (
  <div className="property">
    <div className="property-label">{displayName}</div>
    <div className="property-input">
      <button name={name} onClick={() => console.log("buttonClicked")}>
        Select an image
      </button>
    </div>
  </div>
);

const campaignImageType = (name, displayName, value) => (
  <div className="property">
    <div className="property-label">{displayName}</div>
    <div className="property-input">
      <button name={name} onClick={() => console.log("buttonClicked")}>
        Select a logo
      </button>
    </div>
  </div>
);

const boolType = (name, displayName, value) => (
  <div className="property">
    <div className="property-label">{displayName}</div>
    <div className="property-input">
      <label class="form-switch">
        <input type="checkbox" name={name} checked={value} />
        <i />
      </label>
    </div>
  </div>
);

const dateType = (name, displayName, value) => (
  <div className="property">
    <div className="property-label">{displayName}</div>
    <div className="property-input">
      <input type="datetime-local" name={name} value={value} />
    </div>
  </div>
);

const generateProperty = ({ name, displayName, type }, value) => {
  switch (type) {
    case "string":
      return stringType(name, displayName, value);
    case "image":
      return imageType(name, displayName, value);
    case "boolean":
      return boolType(name, displayName, value);
    case "date":
      return dateType(name, displayName, value);
    case "campaignImage":
      return campaignImageType(name, displayName, value);
    default:
      throw new Error("unrecognized type");
  }
};

/**
 * @param {Object} widgetObject object that should contain componentName displayName props
 */
const parceWidgetObjectView = ({ componentName, displayName, props }, data) => {
  const toggleWidget = e => {
    console.log(e);
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
    widgetProps.appendChild(generateProperty(element, data[element.name]));
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
        />
      </div>
    </div>
  );
  widget.appendChild(widgetProps);
  return widget;
};

const inputSelect = (blockContent, name) =>
  blockContent.querySelector(`[name=${name}]`).value;

const dateSelect = (blockContent, name) =>
  blockContent.querySelector(`[name=${name}]`).value;
const imageSelect = (blockContent, name) => {
  return "Image";
};

const boolSelect = (blockContent, name) =>
  blockContent.querySelector(`[name=${name}]`).checked;

const descriptionSelect = blockContent =>
  blockContent.querySelector(`[name=description]`).textContent;

const selectDataFromProperty = (blockContent, { name, type }) => {
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

    constructor({ data }) {
      this.data = data;
      this.widget = widgetObject;
    }

    render = () => parceWidgetObjectView(this.widget, this.data);

    save = blockContent => parceWidgetObjectSave(blockContent, this.widget);
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
