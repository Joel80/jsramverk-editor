import './App.css';
import Texteditor from './components/editor/Texteditor';
import { useState, useEffect } from 'react';
import docsModel from './models/docs';
//import SaveButton from './components/toolbar/savebutton/Savebutton';
import Toolbar from './components/toolbar/toolbar/Toolbar';

function App() {
    const [docs, setDocs] = useState([]);

    async function fetchDocks() {
        const allDocs = await docsModel.getAllDocs();

        setDocs(allDocs);
    }

    useEffect ( () => {
        (async () => {
            await fetchDocks();
        })();
    }, []);

    return (
        <div className="App">
          <header className="App-header">
          Real time collaborative text editor
          </header>
          <main className="App-main">
              <Toolbar docs = {docs}/>
              <Texteditor />
          </main>
          <nav className='App-nav'>

          </nav>
        </div>
    );
}

export default App;
