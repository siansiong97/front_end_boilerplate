
import localStorage from "local-storage";
import { isEmpty } from "lodash";
import isPlainObject from "lodash.isplainobject";

export function persistRedux(reducer, data) {

    if (reducer && isPlainObject(data) && !isEmpty(data)) {
        let reduxStates = localStorage.get('redux');
        if (!isPlainObject(reduxStates)) {
            reduxStates = {};
        }
        reduxStates[reducer] = data;

        localStorage.set('redux', reduxStates);
    }
}
