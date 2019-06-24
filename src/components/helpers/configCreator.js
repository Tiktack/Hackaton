import { parcer } from "./widgetParcer";

const generateTools = types => {
  const tools = {};
  types.forEach(
    x =>
      (tools[x.componentName] = {
        class: parcer.generateClassFromWidget(x)
      })
  );
  return tools;
};

export const createConfig = (data, types = []) => {
  return {
    holder: "editor",
    autofocus: true,
    tools: generateTools(types),
    data
  };
};
