import axios from 'axios';

export default {

    productSelectList() {
        return axios.get('app/productSelectList');
    },

    operation(params){
        return axios.post('app/operationRecord',params)
    }
}
