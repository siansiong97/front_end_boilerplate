
import { isString } from 'lodash';
import moment from 'moment';


export function getFormatedDate(date, showTime) {
    if(date){
        return showTime ? moment(date).format('DD/MM/YYYY HH:MM:SS') : moment(date).format('DD/MM/YYYY')
    }

    return date
}