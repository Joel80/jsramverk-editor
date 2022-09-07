import './App.css';
import Texteditor from './components/editor/Texteditor';
import { useState, useEffect } from 'react';
import docsModel from './models/docs';
//import SaveButton from './components/toolbar/savebutton/Savebutton';
import Toolbar from './components/toolbar/toolbar/Toolbar';
import docInterface from './interfaces/doc';

function App() {
    let defaultDoc: docInterface = {
        _id: null,
        name: "No title",
        html: "<p>starthtml</p>"
    };

    const [docs, setDocs] = useState([]);
    const [currentDoc, setCurrentDoc] = useState(defaultDoc);
    const [documentLoaded, setDocumentLoaded] = useState(false);

   console.log(`Log from app: ${currentDoc._id} - ${currentDoc.html} - ${currentDoc.name}`);

   function setEditorContent(content: string) {
    let element = document.querySelector("trix-editor") as any | null;

        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        element.editor.insertHTML(content);
    }

    async function fetchDocs() {
        const allDocs = await docsModel.getAllDocs();

        setDocs(allDocs);
    }

    async function setDoc(doc: docInterface) {
        await setCurrentDoc(doc);
    }

    useEffect ( () => {
        (async () => {
            await fetchDocs();
        })();
    }, []);

    useEffect (() => {
        setEditorContent(currentDoc.html);
        setDocumentLoaded(false);
    }, [documentLoaded])

    return (
        <div className="App">
          <header className="App-header">
          Real time collaborative text editor
          </header>
          <main className="App-main">
            {/* <div>{currentDoc.html}</div> */}
              <Toolbar setDocumentLoaded={setDocumentLoaded} setCurrentDoc={setCurrentDoc} docs={docs} currentDoc={currentDoc}/>
              <Texteditor setCurrentDoc={setCurrentDoc} currentDoc={currentDoc}/>
          </main>
          <nav className='App-nav'>

          </nav>
        </div>
    );
}

export default App;
