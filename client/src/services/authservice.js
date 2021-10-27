import api from '@/services/api'

export default {
    register (credentials) {
        return api().post('register', credentials)
    },
    login (credentials) {
        return api().post('login', credentials)
    }
}

/*
auth.service.register({
    email: 'test@testemail.com',
    password: '123456'
})
*/