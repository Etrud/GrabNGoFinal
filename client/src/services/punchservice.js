import api from '@/services/api'

export default {
    registerPunch (credentials) {
        return api().post('punch', credentials)
    },
    index() {
        return api().get('punch/all')
    },
    show(userId) {
        return api().get(`punch/${userId}`)
    },
    deletePunch(punchId) {
        return api().post(`punch/delete/${punchId}`)
    }
}
