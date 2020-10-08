import React from 'react'
import ApiContext from '../ApiContext';

export default function AddNote(props) {
  const { className, ...otherProps } = props

  let handleFormSubmit = (e, handleAddNote) => {
    e.preventDefault();
    const name = e.target.querySelector('#add-note').value;
    const description = e.target.querySelector('#note-description').value;
    const index = e.target.querySelector('#folder').selectedIndex;
    const folder = e.target.querySelectorAll('#folder option')[index].value;
    handleAddNote(name,description,folder)
      .then(props.history.push('/'))
  }

  return (

    <ApiContext.Consumer>
      {({ handleAddNote, folders }) => <form
        className={['Noteful-form', className].join(' ')} {...otherProps} onSubmit={e => handleFormSubmit(e, handleAddNote)}>
        <label htmlFor='add-note'>Enter Note Name:</label>
        <input type='text' id='add-note' name='note' required></input>
        <label htmlFor='note-description'>Enter Note Description:</label>
        <textarea id='note-description'></textarea>
        <label htmlFor='folder'>Select Folder:</label>
        <select id='folder'>
          {folders.map(folder => {
            return (
              <option value={folder.id}>{folder.name}</option>
            )
          })}
        </select>
        <input type='submit' value='Submit'></input>
      </form>}
    </ApiContext.Consumer>
  )
}
