import FileSaver from "file-saver";

export const saveObjectAsJson = (data, fileName = "cms-output.json") => {
  const json = JSON.stringify(data, null, "\t");
  const blob = new Blob([json], { type: "application/json" });
  FileSaver.saveAs(blob, fileName);
};

export const formatExport = data => {
  console.log(data);
  const array = data.blocks;
  let result = {};
  result["meta"] = array[0].data;
  result["headerOffer"] = array[1].data;
  result = { ...result, body: [] };
  for (let i = 2; i < array.length; i++) {
    result.body.push({ componentName: array[i].type, props: array[i].data });
  }
  return result;
};

export const importFromJson = json => {
  const result = {
    time: 0,
    version: "2.14.0",
    blocks: []
  };
  result.blocks.push({ type: "meta", data: json.meta });
  result.blocks.push({ type: "headerOffer", data: json.headerOffer });
  json.body.forEach(item=>{
    result.blocks.push({type: item.componentName, data: item.props})
  })
  return result;
};
