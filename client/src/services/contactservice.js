import api from '@/services/api'

export default {
    index () {
        return api().get('users')
    },
    show(userId) {
        return api().get(`users/${userId}`)
    }
}
