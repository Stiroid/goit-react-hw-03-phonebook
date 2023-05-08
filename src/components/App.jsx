import React from "react";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import { nanoid } from 'nanoid'

export class App extends React.Component {
  
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],

    filter: '',
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  formSubmitHandler = data =>{
    
    data.id = nanoid()

    const checkContact = this.state.contacts.find(contact => contact.name === data.name)
    
    checkContact 
      ? alert(`${data.name} is already in the contacts`)
      :this.setState(prevState => ({
        contacts: [...prevState.contacts, data]
    }))
  }

  onRemoveContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contactId !== contact.id),
    }))
  }

  filterContact = () => {
    const contactToLowerCase = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(contactToLowerCase)
    )
  }

  render(){

    const filterContact = this.filterContact()
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: "column",
          fontSize: 20,
          color: '#010101'
        }}
      >

          <div>
            <h1 style={{textAlign: "center"}}>
              Phonebook
            </h1>

              <ContactForm  
                onSubmit ={this.formSubmitHandler}
              />

            <h2>Contacts</h2>

              <Filter 
                formSubmitHandler= {this.handleInputChange}
                filter={this.state.filter}
              />

              <ContactList
                onRemoveContact = {this.onRemoveContact}
                filteredContacts = {filterContact}
              />

          </div>
      </div>
    );
  }
};
