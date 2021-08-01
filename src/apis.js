import firebase from "firebase";
import axios from 'axios';

class Apis {
    user = null
    idToken = null
    constructor() {
        firebase.auth().onAuthStateChanged((user1) => this.refreshToken(user1));
    }

    refreshToken(user1) {
        this.user = user1
        if (this.user == null) {
            this.idToken = null
            return
        }
        this.user.getIdToken(false)
            .then((idToken1) => {
                this.idToken = idToken1
                console.log('idToken is refreshed')
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.idToken;
            })
            .catch(function (error) {
                console.error('id token error:', error)
            })
    }

    listTenants() {
        return axios.get('/tenants')
    }

    createTenant(tenant) {
        return axios.post('/tenants', tenant)
    }

    testTenants(tenants) {
        return axios.post('/tenants/test', tenants)
    }

    deleteTenant(tenantName) {
        return axios.delete('/tenants/' + tenantName)
    }

    listGroups(tenantName) {
        return axios.get('/tenants/' + tenantName + '/groups')
    }

    createGroup(tenantName, group) {
        return axios.post('/tenants/' + tenantName + '/groups', group)
    }

    deleteGroup(tenantName, groupName) {
        return axios.delete('/tenants/' + tenantName + "/groups/" + groupName)
    }
    listMembers(tenantName, groupName) {
        return axios.get('/tenants/' + tenantName + '/groups/' + groupName + '/members')
    }
    createMember(tenantName, groupName, member) {
        return axios.post('/tenants/' + tenantName + '/groups/' + groupName + '/members', member)
    }
    deleteMember(tenantName, groupName, memberName) {
        return axios.delete('/tenants/' + tenantName + '/groups/' + groupName + "/members/" + memberName)
    }

}
axios.defaults.baseURL = "/api";
let apis = new Apis()

function refreshToken(apis) {
    apis.refreshToken(apis.user)
}

setInterval(refreshToken, 30 * 60 * 1000, apis)

export default apis
