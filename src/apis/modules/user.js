import axios from 'axios';

export default {

    selectList() {
        return axios.get('app/userSelectList');
    },
}
