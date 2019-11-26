import React from 'react';
import context from './dummy-store'

export default class AddFolder extends React.Component {
    static contextType = context;

    state = { input: { value: '' } }
    setInput = input => {
        this.setState({ input: { value: input } });
    }

    apiAddFolder(event){
        const folderName = { name: this.state.input.value }
        return fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify(folderName),
            headers: {
                'content-type': 'application/json'
            },
        }).then(
            res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json();
            }
        ).then(resJson => {
            this.context.addFolder(resJson);
        }

        )
    }   

    submitCreate = e => {
        e.preventDefault();
        Promise.all([this.apiAddFolder(e)]).then(this.props.history.push(`/`));
      };

    render() {
        return (
            <div>
                <form className="new-folder"  onSubmit={e => this.submitCreate(e)}>
                    <label htmlFor="new-folder-name">Name</label>
                    <input type="text" id="new-folder-name" value={this.state.input.name}
                        onChange={e => { this.setInput(e.target.value); }} placeholder="Enter Folder Name" required />
                    <button type="Submit">Submit Folder</button>
                </form>
            </div>
        )
    }
}