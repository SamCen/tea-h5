import axios from 'axios';

export default {

    sumStatistics(params) {
        return axios.get('common/sumStatistics',{
            params:params,
        });
    },
}
