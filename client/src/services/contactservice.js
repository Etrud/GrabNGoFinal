import api from '@/services/api'

export default {
    index () {
        return api().get('users')
    },
    show(userId) {
        return api().get(`users/${userId}`)
    },
    deleteUser(userId) {
        return api().post(`users/delete/${userId}`)
    },
    updateUser(userId, creds) {
        return api().post(`users/edit/${userId}`, creds)
    }
}
