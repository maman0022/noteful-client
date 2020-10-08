import React from 'react'
import './NotefulForm.css'
import ApiContext from '../ApiContext';

export default function NotefulForm(props) {
  const { className, ...otherProps } = props

  let handleFormSubmit=(e,cb)=>{
    e.preventDefault();
    cb(e.target.querySelector('#add-folder').value)
    .then(props.history.push('/'))
  }

  return (

    <ApiContext.Consumer>
      {({handleAddFolder})=><form
        className={['Noteful-form', className].join(' ')} {...otherProps} onSubmit={e=>handleFormSubmit(e,handleAddFolder)}>
        <label htmlFor='add-folder'>Enter Folder Name:</label>
        <input type='text' id='add-folder' name='folder' required></input>
        <input type='submit' value='Submit'></input>
        </form>}
    </ApiContext.Consumer>
  )
}
