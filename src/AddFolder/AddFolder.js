import React, {useState} from 'react';
import '../NotefulForm/NotefulForm.css';
import ApiContext from '../ApiContext';
import config from '../config';

export default function AddFolder(props) {

  const [folderName,setFolderName] = useState({name:{value:123}})

  console.log(folderName);
  let handleFormSubmit = (e, addFolder, setError) => {
    e.preventDefault();
    const name = e.target.querySelector('#add-folder').value;
    if (name.trim() === '') {
      setError('Name cannot be blank');
      return;
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      headers:
        { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ name })
    })
      .then(resp => !resp.ok ? resp.text().then(Promise.reject) : resp.json())
      .then(folder => {
        addFolder(folder);
        setError(null);
        props.history.push('/');
      })
      .catch(setError)
  }


  return (
    <ApiContext.Consumer>
      {({ addFolder, error, setError }) => <form
        className='Noteful-form' onSubmit={e => handleFormSubmit(e, addFolder, setError)}>
        {error ? <h5>An Error Occured:<br/>{error}</h5> : void 0}
        <label htmlFor='add-folder'>Enter Folder Name:</label>
        <input type='text' id='add-folder' name='folder' required></input>
        <input type='submit' value='Submit'></input>
      </form>}
    </ApiContext.Consumer>
  )
}