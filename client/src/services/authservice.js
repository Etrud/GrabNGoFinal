import api from '@/services/api'

export default {
    register (credentials) {
        return api().post('register', credentials)
    }
}

/*
auth.service.register({
    email: 'test@testemail.com',
    password: '123456'
})
*/