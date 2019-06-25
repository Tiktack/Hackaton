export const slotWidget = {
  componentName: "SlotWidget",
  displayName: "Slot widget",
  props: [
    {
      name: "smallTitle",
      displayName: "small title",
      type: "string",
      default: "Here some default value for this string",
      validation: "[A-z]{3}"
    },
    {
      name: "bigTitle",
      displayName: "big title",
      type: "string"
    },
    {
      name: "image",
      displayName: "image",
      type: "image"
    },
    {
      name: "linkUrl",
      displayName: "link url",
      type: "string"
    },
    {
      name: "ribbon",
      displayName: "ribbon",
      type: "string"
    },
    {
      name: "showAsterisk",
      displayName: "show asterisk",
      type: "boolean"
    },
    {
      name: "farecacheDeparture",
      displayName: "farecache departure",
      type: "string"
    },
    {
      name: "farecacheDestination",
      displayName: "farecache destination",
      type: "string"
    },
    {
      name: "showDate",
      displayName: "show date",
      type: "date"
    },
    {
      name: "hideDate",
      displayName: "hide date",
      type: "date"
    },
    {
      name: "sizes",
      displayName: "sizes",
      type: "string"
    }
  ]
};

export const headerOffer = {
  componentName: "headerOffer",
  displayName: "Header offer",
  props: [
    {
      name: "background",
      displayName: "background",
      type: "image"
    },
    {
      name: "campaignLogo",
      displayName: "campaign logo",
      type: "campaignImage"
    },
    {
      name: "smallTitle",
      displayName: "small title",
      type: "string"
    },
    {
      name: "bigTitle",
      displayName: "big title",
      type: "string"
    },
    {
      name: "priceCaption",
      displayName: "price caption",
      type: "string"
    },
    {
      name: "linkUrl",
      displayName: "link url",
      type: "string"
    },
    {
      name: "showApplePayCampaign",
      displayName: "show apple pay campaign",
      type: "boolean"
    },
    {
      name: "showAsterisk",
      displayName: "show asterisk",
      type: "boolean"
    },
    {
      name: "farecacheDeparture",
      displayName: "farecache departure",
      type: "string"
    },
    {
      name: "farecacheDestination",
      displayName: "farecache destination",
      type: "string"
    },
    {
      name: "showDate",
      displayName: "show date",
      type: "date"
    },
    {
      name: "hideDate",
      displayName: "hide date",
      type: "date"
    }
  ]
};

export const meta = {
  componentName: "meta",
  displayName: "Meta information",
  props: [
    {
      name: "title",
      displayName: "title",
      type: "string"
    },
    {
      name: "metaTags",
      displayName: "meta tags",
      type: "string"
    },
    {
      name: "slogan",
      displayName: "Slogan",
      type: "string"
    }
  ]
};

export const TopListWidget = {
  componentName: "TopListWidget",
  displayName: "Top List Widget",
  props: [
    {
      name: "bottomTitle",
      displayName: "bottom title",
      type: "string"
    },
    {
      name: "farecacheDeparture",
      displayName: "farecache departure",
      type: "string"
    },
    {
      name: "infoIconEnabled",
      displayName: "info icon enabled",
      type: "boolean"
    },
    {
      name: "linkUrl",
      displayName: "link url",
      type: "string"
    },
    {
      name: "sizes",
      displayName: "sizes",
      type: "string"
    },
    {
      name: "tooltipMessage",
      displayName: "tooltip Message",
      type: "string"
    },
    {
      name: "topTitle",
      displayName: "top title",
      type: "string"
    },
    {
      name: "items",
      displayName: "items",
      type: "array",
      subType: "abbrevations"
    }
  ]
};
