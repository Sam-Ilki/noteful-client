import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import { getAllNotesAndFolders } from '../API'
import config from '../config'

export default class AddFolder extends Component {

  state = {
    name: ""
  }

  handleUpdateName = name => {
    this.setState({
      name
    })
  }

  handleClick = () => {
    console.log('CLCIKED')

    const { name } = this.state
    fetch(config.API_ENDPOINT + 'folders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    })
    .then(getAllNotesAndFolders)
    .then(this.props.setNotesAndFolders)
    .then(
      this.props.history.push('/')
    )
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' value={this.state.name} onChange={e => this.handleUpdateName(e.target.value)}/>
          </div>
          <div className='buttons'>
            <button  onClick={() => this.handleClick()}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
