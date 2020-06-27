import DataUri from "datauri/parser";
const dataUriChild = new DataUri();
import path from "path";

export default (originalName, buffer) => {
  const extName = path.extname(originalName);
  return dataUriChild.format(extName, buffer).content;
};
