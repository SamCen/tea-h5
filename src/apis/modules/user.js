import axios from 'axios';

export default {
    /**
     *
     * @returns {*}
     */
    selectList() {
        return axios.get('app/userSelectList');
    },
}
