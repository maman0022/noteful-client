import React, { useState } from 'react';
import '../NotefulForm/NotefulForm.css';
import ApiContext from '../ApiContext';
import config from '../config';
import propTypes from 'prop-types';

export default function AddFolder(props) {

  const [folderName, setFolderName] = useState({ value: '', touched: false });
  const [error, setError] = useState(false);

  let handleFormSubmit = (e, addFolder) => {
    e.preventDefault();
    const name = folderName.value;
    fetch(`${config.API_ENDPOINT}/folders`, {
      headers:
        { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ name })
    })
      .then(resp => !resp.ok ? Promise.reject : resp.json())
      .then(folder => {
        addFolder(folder);
        setError(false);
        props.history.push('/');
      })
      .catch(setError(true))
  }

  let handleInput = e => {
    setFolderName({ value: e.target.value, touched: true })
  }

  let validateInput = () => {
    if (folderName.value.trim() === '' && folderName.touched) {
      return 'Name cannot be blank';
    }
  }

  return (
    <ApiContext.Consumer>
      {({ addFolder }) => <form
        className='Noteful-form' onSubmit={e => handleFormSubmit(e, addFolder)}>
        <label htmlFor='add-folder'>Enter Folder Name:</label>
        <input type='text' id='add-folder' required onChange={handleInput} value={folderName.value}></input>
        {validateInput() ? <h5 className='warning'>{validateInput()}</h5> : void 0}
        <input type='submit' value='Submit' disabled={validateInput()}></input>
        {error ? <h5 className='database-error'>Unable to connect with database</h5> : void 0}
      </form>}
    </ApiContext.Consumer>
  )
}

AddFolder.propTypes = {
  history: propTypes.object.isRequired
}