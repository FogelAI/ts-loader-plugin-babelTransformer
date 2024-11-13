import * as ts from 'typescript';
import * as babel from '@babel/core';
interface TransformerOptions {
    babelPlugins: any;
    babelOptions?: babel.TransformOptions;
}
export declare function babelTransformer(options: TransformerOptions): ts.TransformerFactory<ts.SourceFile>;
export default babelTransformer;
