import axios from '@/utils/http'; // 导入http中创建的axios实例
const api = {
    downFile(msg) {
        return axios.post('/api/downFile', msg, {
            // headers: { responseType: 'blob', },
            responseType: 'blob'
        })
    },


}

export default api;