import axios from 'axios';

export default {

    selectList() {
        return axios.get('app/userSelectList');
    },
    userInfo(){
        return axios.get('app/userInfo');
    }
}
