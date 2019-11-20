import React from "react";
import dummyStore from "./dummy-store";

const NotefulContext = React.createContext({
  folders: dummyStore.folders,
  notes: dummyStore.notes,
  deleteNote: () => {}
});

export default NotefulContext;
