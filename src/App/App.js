import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import AddFolder from '../AddFolder';
import AddNote from '../AddNote';
import Error from '../ErrorPage';
//import dummyStore from "../dummy-store";
//import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";
import NotefulContext from "../NotefulContext";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
       
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  handleAddFolder = (folder) => {
    //console.log('adding folder');
    this.setState({ folders: [...this.state.folders, folder] });
  }

  handleAddNote = (note) => {
    //console.log('adding note');
    this.setState({ notes: [...this.state.notes, note] });
  }

  renderNavRoutes() {

    return (<>{
      ["/", "/folder/:folderId"].map(path => (
        <Route
          exact
          key={path}
          path={path}
          component={NoteListNav}
        />
      ))}
      <Route path="/note/:noteId" component={NotePageNav} />
      <Route path="/add-folder" component={AddFolder} />
      <Route path="/add-note" component={AddNote} />
    </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
    };
    return (
      <Error>
        <NotefulContext.Provider value={value}>
          <div className="App">
            <nav className="App__nav">{this.renderNavRoutes()}</nav>
            <header className="App__header">
              <h1>
                <Link to="/">Noteful</Link>{" "}
                <FontAwesomeIcon icon="check-double" />
              </h1>
            </header>
            <main className="App__main">{this.renderMainRoutes()}</main>
          </div>
        </NotefulContext.Provider>
      </Error>
    );
  }
}

export default App;
