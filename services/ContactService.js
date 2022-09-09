import axios from "axios"

export class ContactService {
  static serverURI = `http://localhost:9000`
  
  static getAllContacts() {
    let dataURI = `${this.serverURI}/contacts`
    return axios.get(dataURI)
  }

  static getContact(contactId) {
    let dataURI = `${this.serverURI}/contacts/${contactId}`
    return axios.get(dataURI)
  }

  static createContact(contact) {
    let dataURI = `${this.serverURI}/contacts`
    return axios.post(dataURI, contact)
  }

  static putContact(contact, id) {
    let dataURI = `${this.serverURI}/contacts/${id}`
    return axios.put(dataURI, contact)
  }
  
  static deleteContact(id) {
    let dataURI = `${this.serverURI}/contacts/${id}`
    return axios.delete(dataURI)
  }

  static getAllGroups(){
    let dataURI = `${this.serverURI}/groups`
    return axios.get(dataURI)
  }
  static getGroup(contact){
    let id = contact.grouPID
    let dataURI = `${this.serverURI}/groups/${id}`
    return axios.get(dataURI)
  }
}