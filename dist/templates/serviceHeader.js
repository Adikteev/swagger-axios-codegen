"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const genericTypeDefinitionTemplate_1 = require("./genericTypeDefinitionTemplate");
function serviceHeader(options) {
    const classTransformerImport = options.useClassTransformer
        ? `import { Expose, Transform, Type, plainToClass } from 'class-transformer';
  ` : '';
    return `/** Generate by swagger-axios-codegen */
  // tslint:disable
  /* eslint-disable */
  import axiosStatic, { AxiosInstance } from 'axios';

  ${classTransformerImport}

  export interface IRequestOptions {
    headers?: any;
    baseURL?: string;
    responseType?: string;
  }

  export interface IRequestConfig {
    method?: any;
    headers?: any;
    url?: any;
    data?: any;
    params?: any;
  }

  // Add options interface
  export interface ServiceOptions {
    axios?: AxiosInstance,
  }

  ${requestHeader()}
  ${definitionHeader(options.extendDefinitionFile)}
  `;
}
exports.serviceHeader = serviceHeader;
function customerServiceHeader(options) {
    return `/** Generate by swagger-axios-codegen */
  // tslint:disable
  /* eslint-disable */
  export interface IRequestOptions {
    headers?: any;
  }

  export interface IRequestPromise<T=any> extends Promise<IRequestResponse<T>> {}

  export interface IRequestResponse<T=any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
  }

  export interface IRequestInstance {
    (config: any): IRequestPromise;
    (url: string, config?: any): IRequestPromise;
    request<T = any>(config: any): IRequestPromise<T>;
  }

  export interface IRequestConfig {
    method?: any;
    headers?: any;
    url?: any;
    data?: any;
    params?: any;
  }

  // Add options interface
  export interface ServiceOptions {
    axios?: IRequestInstance,
  }

  ${requestHeader()}
  ${definitionHeader(options.extendDefinitionFile)}
  `;
}
exports.customerServiceHeader = customerServiceHeader;
function requestHeader() {
    return `

  // Add default options
  export const serviceOptions: ServiceOptions = {
  };

  // Instance selector
  export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
    if (serviceOptions.axios) {
      return serviceOptions.axios.request(configs).then(res => {
        resolve(res.data);
      })
        .catch(err => {
          reject(err);
        });
    } else {
      throw new Error('please inject yourself instance like axios  ')
    }
  }
  
  export function getConfigs(method: string, contentType: string, url: string,options: any):IRequestConfig {
    const configs: IRequestConfig = { ...options, method, url };
    configs.headers = {
      ...options.headers,
      'Content-Type': contentType,
    };
    return configs
  }
  `;
}
function definitionHeader(fileDir) {
    let fileStr = '// empty ';
    if (!!fileDir) {
        console.log('extendDefinitionFile url : ', path.resolve(fileDir));
        if (fs.existsSync(path.resolve(fileDir))) {
            const buffs = fs.readFileSync(path.resolve(fileDir));
            fileStr = buffs.toString('utf8');
        }
    }
    return `
  ${genericTypeDefinitionTemplate_1.universalGenericTypeDefinition()}
  ${genericTypeDefinitionTemplate_1.abpGenericTypeDefinition()}
  // customer definition
  ${fileStr}
  `;
}
//# sourceMappingURL=serviceHeader.js.map