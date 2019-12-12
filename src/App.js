import React from "react";
import "./App.css";
import { VideoChat } from "components";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Video Chat with Hooks</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      <footer>
        <p>
          Made with <span>⚛</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
