"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function propTrueType(v) {
    let result = {
        propType: '',
        isEnum: false,
        isArray: false,
        /**ts type definition */
        isType: false,
        ref: ''
    };
    if (v.$ref || (v.allOf && v.allOf[0])) {
        // 是引用类型
        result.propType = utils_1.refClassName(v.$ref || v.allOf[0].$ref);
        result.ref = result.propType;
    }
    //是个数组
    else if (v.items) {
        if (v.items.$ref || (v.items.allOf && v.items.allOf[0])) {
            // 是个引用类型
            result.ref = utils_1.refClassName(v.items.$ref || v.items.allOf[0].$ref);
            result.propType = result.ref + '[]';
        }
        else {
            if (v.items.type === "array") {
                const currentResult = propTrueType(v.items);
                result = Object.assign(Object.assign({}, result), currentResult);
            }
            else if (!!v.items.enum) {
                const currentResult = propTrueType(v.items);
                result = Object.assign(Object.assign({}, result), currentResult);
            }
            else {
                result.propType = utils_1.toBaseType(v.items.type) + '[]';
            }
        }
        result.isArray = true;
    }
    // 是枚举 并且是字符串类型
    else if (v.enum && v.type === 'string') {
        result.isEnum = true;
        result.propType = getEnums(v.enum).map(item => `'${item}'='${item}'`).join(',');
    }
    else if (v.enum) {
        result.isType = true;
        result.propType = v.type === 'string' ? getEnums(v.enum).map(item => `'${item}'`).join('|') : v.enum.join('|');
    }
    // 基本类型
    else {
        result.propType = utils_1.toBaseType(v.type);
    }
    return result;
}
exports.propTrueType = propTrueType;
function getEnums(enumObject) {
    return Object.prototype.toString.call(enumObject) === '[object Object]' ? Object.values(enumObject) : enumObject;
}
//# sourceMappingURL=propTrueType.js.map