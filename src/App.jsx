import React from "react";
import WidgetEditor from "./components/WidgetEditor/WidgetEditor";
import "./App.scss";
import WidgetEditorForUsage from './components/WidgetEditorForUsage/WidgetEditorForUsage.jsx';

function App() {
  return (
    <>
      <div className="App">
        <WidgetEditorForUsage />
      </div>
    </>
  );
}

export default App;
