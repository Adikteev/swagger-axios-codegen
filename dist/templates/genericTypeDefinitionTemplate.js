"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function universalGenericTypeDefinition() {
    return `
    export interface IList<T> extends Array<T>{}
    export interface List<T> extends Array<T>{}
    export interface IDictionary<TValue>{
      [key: string]: TValue
    }
    export interface Dictionary<TValue> extends IDictionary<TValue>{
    
    }
  `;
}
exports.universalGenericTypeDefinition = universalGenericTypeDefinition;
function abpGenericTypeDefinition() {
    return `
export interface IListResult<T> {
  items?: T[]
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[]
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount: number
}

export class PagedResultDto<T> implements IPagedResult<T> {
  totalCount!: number
}
  `;
}
exports.abpGenericTypeDefinition = abpGenericTypeDefinition;
//# sourceMappingURL=genericTypeDefinitionTemplate.js.map