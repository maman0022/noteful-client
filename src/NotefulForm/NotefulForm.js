import React from 'react'
import './NotefulForm.css'
import ApiContext from '../ApiContext';

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  return (

    <ApiContext.Consumer>
      {({handleAddFolder})=><form
        className={['Noteful-form', className].join(' ')} {...otherProps} 
        onSubmit={e=>{e.preventDefault();handleAddFolder(e.target.querySelector('#add-folder').value)}}>
        <label htmlFor='add-folder'>Enter Folder Name:</label>
        <input type='text' id='add-folder' name='folder'></input>
        <input type='submit' value='Submit'></input>
        </form>}
    </ApiContext.Consumer>
  )
}
