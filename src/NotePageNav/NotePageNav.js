import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import NotefulContext from "./../NotefulContext";
import "./NotePageNav.css";

export default class NotePageNav extends React.Component {
  static contextType = NotefulContext;
  render() {
    const { folders, notes } = this.context;
    return (
      <div className="NotePageNav">
        <CircleButton
          tag="button"
          role="link"
          onClick={() => this.props.history.goBack()}
          className="NotePageNav__back-button"
        >
          <FontAwesomeIcon icon="chevron-left" />
          <br />
          Back
        </CircleButton>
        {this.props.folder && (
          <h3 className="NotePageNav__folder-name">{this.props.folder.name}</h3>
        )}
      </div>
    );
  }
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
};
