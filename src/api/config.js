import { forIn } from "lodash";
import isPlainObject from "lodash.isplainobject"

export const serverDomain = 'https://api-1.ez-sight.com'
export const serverAPIUrl = serverDomain+'/api/app/pc'
export const serverAPIUrl1 = serverDomain+'/api/app/pv'


export function convertToFormData(data = {}) {

    let formData = new FormData();
    
    if(isPlainObject(data)){
        forIn(data, (value, key) => { 
          formData.append(key, value);
        })
    }else{
        formData.append('data', data)
    }

    return formData;

    
}