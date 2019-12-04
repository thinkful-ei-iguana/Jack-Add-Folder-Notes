import React from 'react';
import NotefulContext from "./NotefulContext";

export default class AddFolder extends React.Component {
    static contextType = NotefulContext;

    state = { input: { value: '' } }
    setInput = input => {
        this.setState({ input: { value: input } });
    }

    submitFolder(event) {
        event.preventDefault();
        Promise.all([this.apiAddFolder(this.state.input)]).then(this.props.history.push(`/`));
    };

    apiAddFolder(input) {
        let name = input.value;
        const folderName = { name: name }
        return fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify(folderName),
            headers: {
                'content-type': 'application/json'
            },
        }).then(
            res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then(e => Promise.reject(e))
                }
            }
        ).then(resJson => {
            this.context.addFolder(resJson);
        }

        )
    }



    render() {
        return (
            <div>
                <form className="new-folder" onSubmit={e => this.submitFolder(e)}>
                    <label htmlFor="new-folder-name">Name</label>
                    <input type="text" id="new-folder-name" value={this.state.input.name}
                        onChange={e => { this.setInput(e.target.value); }} placeholder="Enter Folder Name" required />
                    <button type="Submit">Submit Folder</button>
                </form>
            </div>
        )
    }
}