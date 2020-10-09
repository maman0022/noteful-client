import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  error: false,
  addFolder: () => { },
  addNote: () => { },
  deleteNote: () => { },
})
