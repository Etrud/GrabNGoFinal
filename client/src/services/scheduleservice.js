import api from '@/services/api'

export default {
    registerSchedule (credentials) {
        return api().post('schedule', credentials)
    },
    index() {
        return api().get('schedule/all')
    },
    show(userId) {
        return api().get(`schedule/${userId}`)
    },
    showNext(userId) {
        return api().get(`schedule/next/${userId}`)
    },
    deleteSchedule(scheduleId) {
        return api().post(`schedule/delete/${scheduleId}`)
    },
    editSchedule(scheduleId, credentials) {
        return api().post(`schedule/edit/${scheduleId}`,credentials)
    }
}
