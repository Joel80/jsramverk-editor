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
        html: "Write here"
    };

    const [docs, setDocs] = useState([]);
    const [currentDoc, setCurrentDoc] = useState(defaultDoc);
    const [documentLoaded, setDocumentLoaded] = useState<Boolean>(false);
    const [documentSaved, setDocumentSaved] = useState<Boolean>(false);

    console.log(`Log from app: ${currentDoc._id} - ${currentDoc.html} - ${currentDoc.name}`);

   function setEditorContent(content: string) {
    let element = document.querySelector("trix-editor") as any | null;
        if (element) {
            element.value = "";
            element.editor.setSelectedRange([0, 0]);
            element.editor.insertHTML(content);
        }
    }

    function setSelectElement(id: string, value: string | null) {
        console.log(`Setting select: ${currentDoc._id}`)
        let selectElement = document.getElementById(id) as HTMLSelectElement | null;
        if (selectElement !== null) {
            if (value !== null)
                selectElement.value = value;
        }
    }

    async function fetchDocs() {
        const allDocs = await docsModel.getAllDocs();
        setDocs(allDocs);
    }

    useEffect ( () => {
        (async () => {
            console.log(`Using effect current doc is ${currentDoc._id}`);
            await fetchDocs();
            setSelectElement("documentSelect", currentDoc._id);
            setDocumentSaved(false);
            console.log(documentSaved);
        })();
    }, [documentSaved]);

    useEffect (() => {
        setEditorContent(currentDoc.html);
        setDocumentLoaded(false);
    }, [documentLoaded])

    return (
        <div className="App">
          <header className="App-header">
            <h1 className="main-site-h1">Real-time collaborative text editor</h1>
          </header>
          <main className="App-main">
              <Toolbar setDocumentSaved={setDocumentSaved} setDocumentLoaded={setDocumentLoaded} setCurrentDoc={setCurrentDoc} docs={docs} currentDoc={currentDoc}/>
              <Texteditor setCurrentDoc={setCurrentDoc} currentDoc={currentDoc}/>
          </main>
          <nav className='App-nav'>

          </nav>
        </div>
    );
}

export default App;
