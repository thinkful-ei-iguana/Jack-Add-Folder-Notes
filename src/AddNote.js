import React from 'react';
import NotefulContext from "./NotefulContext";


export default class AddNote extends React.Component {
    static contextType = NotefulContext;

    state = {input : {
        name: '',
        description: '',
        folderId: '',
        dateModified: Date
    }}

   
    
    setName = input =>{
        const now = new Date().toISOString();
        this.setState({input :{
            name: input,
            description: this.state.description,
            folderId: this.state.folderId,
            dateModified: now
        }})
    }

    setDescription = input =>{
        const now = new Date().toISOString();
        this.setState({input :{
            name: this.state.input.name,
            description: input,
            folderId: this.state.input.folderId,
            dateModified: now
        }})     
    }

    setFolder = input =>{
        const now = new Date().toISOString();
        this.setState({input :{
            name: this.state.input.name,
            description: this.state.input.description,
            folderId: input,
            dateModified: now
        }})
    }

    submitNote(event){
        event.preventDefault();
        Promise.all([this.addApiNote(this.state.input)]).then(this.props.history.push(`/`));
    }

    addApiNote(input){
        let {name, description, folderId, dateModified} = input;
        if(folderId === undefined){ folderId = this.context.folders[0].id}
        console.log(Date);
        const noteName = JSON.stringify({name: name, content: description, folderId: folderId, dateModified: dateModified});
        return fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            body: noteName,
            headers: {
                'content-type': 'application/json'
            },
        }).then(res =>{
            if(res.ok){
                return res.json()
            } else {
                return res.json().then(e => Promise.reject(e))
            }
        }).then(resJson =>{
            this.context.addNote(resJson);
        })
    }

    render() {
        return (
            <div className="add-note">
                <form className="new-note" onSubmit={e => this.submitNote(e)}>
                    <label htmlFor="new-note-name">Name</label>
                    <input type="text" id="new-note-name" value={this.state.input.name}
                        onChange={e => { this.setName(e.target.value) }} placeholder="Enter Note Title" required />
                    <label htmlFor="new-note-content">Content</label>
                    <input type="text" id="new-note-content" onChange={e => this.setDescription(e.target.value) } required></input>
                    <label htmlFor="new-note-folder">Folder</label>
                    <select id='new-note-folder' onChange={e => this.setFolder(e.target.value) }>
                        {this.context.folders.map((folder) => (
                            <option value={folder.id}>{folder.name}</option>
                        ))}
                    </select>
                    <button type="submit">Make Note</button>
                </form>
            </div>
        )
    }
}