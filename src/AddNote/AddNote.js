import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import config from '../config'

export default class AddNote extends Component {

  state = {
    'note_name': "",
    'content': "",
    'folder_id': null
  }

  handleUpdateName = name => {
    this.setState({
      'note_name': name
    })
  }

  handleUpdateContent = (value) => {
    this.setState({
      'content': value
    })
  }

  handleUpdateFolder_id = folder_id => {
    this.setState({
      'folder_id': folder_id
    })
  }


  handleClick = () => {
    console.log('CLCIKED')

    const { note_name, content, folder_id } = this.state
    fetch(config.API_ENDPOINT + 'notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        note_name: note_name,
        content: content,
        folder_id: folder_id
      })
    })
    .then(
      this.props.history.push('/')
    )
  }

  static defaultProps = {
    folders: [],
  }
  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' value={this.state.note_name} onChange={e => this.handleUpdateName(e.target.value)}/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' value={this.state.content} onChange={e => this.handleUpdateContent(e.target.value)}/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' value={this.state.folder_id} onChange={e => this.handleUpdateFolder_id(e.target.value)}>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button onClick={() => this.handleClick()}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
