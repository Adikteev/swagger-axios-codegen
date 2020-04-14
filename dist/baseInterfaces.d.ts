export interface ISwaggerOptions {
    serviceNameSuffix?: string;
    enumNamePrefix?: string;
    methodNameMode?: 'operationId' | 'path';
    outputDir?: string;
    fileName?: string;
    remoteUrl?: string;
    source?: any;
    useStaticMethod?: boolean | undefined;
    useCustomerRequestInstance?: boolean | undefined;
    include?: Array<string | IInclude>;
    format?: (s: string) => string;
    /** match with tsconfig */
    strictNullChecks?: boolean | undefined;
    /** definition Class mode */
    modelMode?: 'class' | 'interface';
    /** use class-transformer to transform the results */
    useClassTransformer?: boolean;
    openApi?: string | undefined;
    extendDefinitionFile?: string | undefined;
    extendGenericType?: string[] | undefined;
    generateValidationModel?: boolean;
    multipleFileMode?: boolean | undefined;
}
export interface IPropDef {
    name: string;
    type: string;
    format?: string;
    desc: string;
    isType: boolean;
    isEnum: boolean;
    validationModel: object;
}
export interface IInclude {
    [key: string]: string[];
}
export interface IClassDef {
    name: string;
    props: IPropDef[];
    imports: string[];
}
export interface IDefinitionClass {
    value: IClassDef;
    name: string;
}
export interface IDefinitionClasses {
    [key: string]: IDefinitionClass;
}
export interface IEnumDef {
    name: string;
    enumProps: string;
    type: string;
}
export interface IDefinitionEnum {
    name: string;
    value?: IEnumDef | null | undefined;
    content?: string | null | undefined;
}
export interface IDefinitionEnums {
    [key: string]: IDefinitionEnum;
}
