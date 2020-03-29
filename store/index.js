export const state = () => ({
    user: null,
    users: [] // user and socket
})

export const getters = {
    filteredUsers(state) {
        return state.users.filter(user => user.user !== state.user)
    }
}

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    updateOnline(state, users) {
        state.users = users
    },
    clearAll(state) {
        state.user = null
        state.users = []
    }
}