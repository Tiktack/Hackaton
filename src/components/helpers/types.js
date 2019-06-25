import * as React from "jsx-dom";

export const stringType = (name, displayName, value, validation) => (
  <div className="property">
    <div className="property-label">{displayName}</div>
    <div className="property-input">
      <input type="text" name={name} value={value} pattern={validation} />
    </div>
  </div>
);

export const imageType = (name, displayName, value) => (
  <div className="property">
    <div className="property-label">{displayName}</div>
    <div className="property-input">
      <button name={name} onClick={() => console.log("buttonClicked")}>
        Select an image
      </button>
    </div>
  </div>
);

export const campaignImageType = (name, displayName, value) => (
  <div className="property">
    <div className="property-label">{displayName}</div>
    <div className="property-input">
      <button name={name} onClick={() => console.log("buttonClicked")}>
        Select a logo
      </button>
    </div>
  </div>
);

export const boolType = (name, displayName, value) => (
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

export const dateType = (name, displayName, value) => (
  <div className="property">
    <div className="property-label">{displayName}</div>
    <div className="property-input">
      <input type="datetime-local" name={name} value={value} />
    </div>
  </div>
);

export const abbrevationsType = (name, displayName, value) => {
  console.log(value);
  const array = value || new Array(5).fill({});
  console.log(array);
  return (
    <div className="property">
      <div className="property-label">{displayName}</div>
      <div className="property-input">
        {array.map((element, i) => (
          <div className="abbrevation">
            <div className="abbrevation-index">{i + 1}</div>
            <div clasName="abbrevation-inputs">
              <div className="abbrevation-nameInput">
                <div className="abbrevation-label">Name</div>
                <input
                  className="abbrevationName"
                  type="text"
                  value={element.name}
                  name={`${name}-name`}
                />
              </div>
              <div className="abbrevation-farecacheDestinationInput">
                <div className="abbrevation-label">Farecache destination</div>
                <input
                  type="text"
                  value={element.farecacheDestination}
                  name={`${name}-farecacheDestination`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const arrayType = (name, displayName, value, subType) => {
  switch (subType) {
    case "abbrevations":
      return abbrevationsType(name, displayName, value);
    default:
      throw new Error("unrecognized sub type");
  }
};
