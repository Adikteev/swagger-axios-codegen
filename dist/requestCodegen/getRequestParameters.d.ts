import { IParameter } from '../swaggerInterfaces';
/**
 * 生成参数
 * @param params
 */
export declare function getRequestParameters(params: IParameter[]): {
    requestParameters: string;
    requestFormData: string;
    requestPathReplace: string;
    queryParameters: string[];
    bodyParameter: string;
    imports: string[];
};
