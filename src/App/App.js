import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ErrorBoundary from '../ErrorBoundary'

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: false
  };

  headers = {
    Authorization: `Bearer ${config.API_TOKEN}`
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/notes`, { headers: this.headers }),
      fetch(`${config.API_ENDPOINT}/api/folders`, { headers: this.headers })
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([notesRes.json(), foldersRes.json()])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders, error: false })
      })
      .catch(()=>this.setState({ error: true }))
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== Number(noteId))
    });
  };

  handleAddFolder = folder => {
    this.setState({ folders: [...this.state.folders, folder] })
  }

  handleAddNote = note => {
    this.setState({ notes: [...this.state.notes, note] })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        <ErrorBoundary>
          <Route exact path="/note/:noteId" component={NotePageNav} />
          <Route exact path="/add-folder" component={NotePageNav} />
          <Route exact path="/add-note" component={NotePageNav} />
        </ErrorBoundary>
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <ErrorBoundary>
          <Route exact path="/note/:noteId" component={NotePageMain} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Route exact path="/add-folder" component={AddFolder} />
          <Route exact path="/add-note" component={AddNote} />
        </ErrorBoundary>
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      error: this.state.error,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      headers: this.headers
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App