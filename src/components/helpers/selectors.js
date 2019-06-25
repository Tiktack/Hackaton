export const inputSelect = (blockContent, name) =>
  blockContent.querySelector(`[name=${name}]`).value;

export const dateSelect = (blockContent, name) =>
  blockContent.querySelector(`[name=${name}]`).value;

export const imageSelect = (blockContent, name) => {
  return "Image";
};

export const boolSelect = (blockContent, name) =>
  blockContent.querySelector(`[name=${name}]`).checked;

export const descriptionSelect = blockContent =>
  blockContent.querySelector(`[name=description]`).textContent;

const abbrevationsSelector = (blockContent, name) => {
  const result = [];
  const names = blockContent.querySelectorAll(`[name=${name}-name]`);
  const farecacheDestinations = blockContent.querySelectorAll(
    `[name=${name}-farecacheDestination]`
  );
  names.forEach((x, i) => {
    result.push({
      name: x.value,
      farecacheDestination: farecacheDestinations[i].value
    });
  });
  return result;
};

export const arraySelector = (blockContent, subType, name) => {
  switch (subType) {
    case "abbrevations":
      return abbrevationsSelector(blockContent, name);
    default:
      throw new Error("unrecognized sub type");
  }
};
