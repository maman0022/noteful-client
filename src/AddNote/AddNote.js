import React, { useState } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import propTypes from 'prop-types'

export default function AddNote(props) {
  const [noteName, setNoteName] = useState({ value: '', touched: false })
  const [noteContent, setNoteContent] = useState({ value: '', touched: false })
  const [error, setError] = useState(false)
  let handleFormSubmit = (e, addNote) => {
    e.preventDefault()
    const name = noteName.value
    const content = noteContent.value
    const index = e.target.querySelector('#folder').selectedIndex
    const folderId = e.target.querySelectorAll('#folder option')[index].value
    fetch(`${config.API_ENDPOINT}/notes`, {
      headers:
        { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ name, content, folderId, modified: new Date() })
    })
      .then(resp => !resp.ok ? Promise.reject : resp.json())
      .then(note => {
        addNote(note)
        setError(false)
        props.history.push('/')
      })
      .catch(setError(true))
  }

  let handleName = e => {
    setNoteName({ value: e.target.value, touched: true })
  }

  let handleContent = e => {
    setNoteContent({ value: e.target.value, touched: true })
  }

  let validateName = () => {
    if (noteName.value.trim() === '' && noteName.touched) {
      return 'Name cannot be blank'
    }
  }

  let validateContent = () => {
    if (noteContent.value.trim() === '' && noteContent.touched) {
      return 'Content cannot be blank'
    }
  }

  return (
    <ApiContext.Consumer>
      {({ addNote, folders }) => <form
        className='Noteful-form' onSubmit={e => handleFormSubmit(e, addNote)}>
        <label htmlFor='add-note'>Enter Note Name:</label>
        <input type='text' id='add-note' name='note' required onChange={handleName} />
        {validateName() ? <h5 className='warning'>{validateName()}</h5> : void 0}
        <label htmlFor='note-content'>Enter Note Content:</label>
        <textarea id='note-content' required onChange={handleContent} />
        {validateContent() ? <h5 className='warning'>{validateContent()}</h5> : void 0}
        <label htmlFor='folder'>Select Folder:</label>
        <select id='folder' required>
          {folders.map(folder => {
            return (
              <option value={folder.id}>{folder.name}</option>
            )
          })}
        </select>
        <input type='submit' value='Submit' disabled={validateContent() || validateName()}></input>
        {error ? <h5 className='database-error'>Unable to connect with database</h5> : void 0}
      </form>}
    </ApiContext.Consumer>
  )
}

AddNote.propTypes = {
  history: propTypes.object.isRequired
}