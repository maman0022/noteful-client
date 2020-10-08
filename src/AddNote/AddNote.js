import React from 'react'
import ApiContext from '../ApiContext';
import config from '../config';

export default function AddNote(props) {

  let handleFormSubmit = (e, addNote, setError) => {
    e.preventDefault();
    const name = e.target.querySelector('#add-note').value;
    const content = e.target.querySelector('#note-content').value;
    const index = e.target.querySelector('#folder').selectedIndex;
    const folderId = e.target.querySelectorAll('#folder option')[index].value;
    if (name.trim() === '') {
      setError('Name cannot be blank');
      return;
    }
    if (content.trim() === '') {
      setError('Content cannot be blank');
      return;
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      headers:
        { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ name, content, folderId, modified: new Date() })
    })
      .then(resp => resp.json())
      .then(note => {
        addNote(note);
        setError(null);
        props.history.push('/');
      })
      .catch(setError)
  }

  return (
    <ApiContext.Consumer>
      {({ addNote, folders, error, setError }) => <form
        className='Noteful-form' onSubmit={e => handleFormSubmit(e, addNote, setError)}>
        {error ? <h5>An Error Occured:<br/>{error}</h5> : void 0}
        <label htmlFor='add-note'>Enter Note Name:</label>
        <input type='text' id='add-note' name='note' required></input>
        <label htmlFor='note-content'>Enter Note Content:</label>
        <textarea id='note-content' required></textarea>
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
