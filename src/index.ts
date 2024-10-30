import * as webpack from "webpack";
import path from "path";
import { bundleMDX } from "@puzzlet/templatedx";
import fs from "fs";

export default async function promptdxLoader(
  this: webpack.LoaderContext<{}>,
  content: string
) {
  const callback = this.async();
  const baseDir = path.dirname(this.resourcePath);
  try {
    const ast = await bundleMDX(content, baseDir, async (modulePath) => {
      const content = await fs.promises.readFile(modulePath, 'utf-8');
      return content;
    });

    return callback(null, `export default ${JSON.stringify(ast)};`);
  } catch (error: any) {
    console.error(error);
    return callback(error);
  }
}
