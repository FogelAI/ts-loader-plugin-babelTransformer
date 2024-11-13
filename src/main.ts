import * as ts from 'typescript';
import * as babel from '@babel/core';

interface TransformerOptions {
  babelPlugins: any;
  babelOptions?: babel.TransformOptions;
}

export function babelTransformer(options: TransformerOptions): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      const tsCode = sourceFile.getFullText();
      const result = babel.transformSync(tsCode, {
        filename: sourceFile.fileName,
        plugins: options.babelPlugins,
        ...options.babelOptions,
      });
      if (result && result.code) {
        const newSourceFile = ts.createSourceFile(
          sourceFile.fileName,
          result.code,
          sourceFile.languageVersion,
          true,
          ts.ScriptKind.JS
        );
        return newSourceFile;
      }
      return sourceFile;
    };
  };
}

export default babelTransformer;