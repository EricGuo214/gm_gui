import firebase from "firebase";
import axios from 'axios';

class Apis {
    user = null
    idToken = null
    constructor() {
        firebase.auth().onAuthStateChanged((user1) => {
            this.user = user1
            if (this.user == null) {
                this.idToken = null
                return
            }
            console.log('user1:', user1)
            console.log('user:', this.user)
            user1.getIdToken(false)
                .then((idToken1) => {
                    this.idToken = idToken1
                    console.log('idToken1:', idToken1)
                    console.log('idToken:', this.idToken)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.idToken;
                })
                .catch(function (error) {
                    console.error('id token error:', error)
                })
        });
    }

    listTenants() {
        return axios.get('/tenants')
    }

    createTenant(tenant) {
        return axios.post('/tenants', tenant)
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

export default apis
