import './App.css';
import Texteditor from './components/editor/Texteditor';
import NameForm from './components/editor/NameForm';
import { useState, useEffect, useRef } from 'react';
import docsModel from './models/docs';
//import SaveButton from './components/toolbar/savebutton/Savebutton';
import Toolbar from './components/toolbar/toolbar/Toolbar';
import docInterface from './interfaces/doc';
import { io } from 'socket.io-client';

function App() {

    let defaultDoc: docInterface = {
        _id: null,
        name: "No title",
        html: ""
    };

    const [docs, setDocs] = useState([]);
    const [socket, setSocket] = useState<any>(null);
    const [currentDoc, setCurrentDoc] = useState(defaultDoc);
    const [documentSaved, setDocumentSaved] = useState<Boolean>(false);
    const [loadedDoc, setLoadedDoc] = useState<docInterface>(defaultDoc);
    const [savedDoc, setSavedDoc] = useState<docInterface>(defaultDoc);
    const shouldSetSelectElement = useRef(false);
    const sendToSocket = useRef(false);

    // Server url and socket declarations
    const SERVER_URL = window.location.href.includes("localhost") ? 
        "http://localhost:1337" :
        "https://jsramverk-editor-jolf20.azurewebsites.net"


    //let sendToSocket = false;

    let updateCurrentDocOnChange: boolean = false;

    /* function changeSendToSocket(value: boolean) {
        sendToSocket = value;
    } */

    function handleChange(html: string, text: string) {
        if (updateCurrentDocOnChange) {
            const copy = Object.assign({}, currentDoc);
    
            copy.html = html;
    
            setCurrentDoc(copy);
        }
    
        updateCurrentDocOnChange = true;
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updateCurrentDocOnChange) {
            const copy = Object.assign({}, currentDoc);
    
            copy.name = e.target.value;;
    
            setCurrentDoc(copy);
        }
    
        updateCurrentDocOnChange = true;
    }

    
    async function handleClick() {
        await docsModel.saveDoc(
            {
                name: "No title",
                html: "No content"
            }
        );
    }
    
    function setEditorContent(content: string, triggerChange: boolean) {
        let element = document.querySelector("trix-editor") as any | null;

        updateCurrentDocOnChange = triggerChange;
        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        updateCurrentDocOnChange = triggerChange;
        element.editor.insertHTML(content);
    }

    function setNameFormContent(content: string, triggerChange: boolean) {
        let element = document.querySelector("document-name-form") as any | null;
        if (element) {
            updateCurrentDocOnChange = triggerChange;
            element.value=content;
        }
    }

    async function fetchDocs() {
        console.log("Calling getAllDocs");
        const allDocs = await docsModel.getAllDocs();
        setDocs(allDocs);
    }

    useEffect(() => {
        (async () => {
            await fetchDocs();
        })();
    }, []);

    useEffect( () => {
        setSocket(io(SERVER_URL));

        if (socket) {
            socket.emit("create", loadedDoc["_id"]);
        }

        setEditorContent(loadedDoc.html, false);
        setNameFormContent(loadedDoc.name, false);

        return () => {
            if(socket) {
                socket.disconnect();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedDoc]);

    // Changes to currentDoc triggers this
    useEffect (() => {
        console.log(sendToSocket);
        if (socket && sendToSocket.current) {

            let data ={
                _id: currentDoc._id,
                name: currentDoc.name,
                html: currentDoc.html
            }

            socket.emit("doc", data);
        }

        sendToSocket.current = true;
        //changeSendToSocket(true);
        console.log(sendToSocket);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDoc]);

    // Get updates from socket
    useEffect (() => {
        console.log("Updates from socket");
        if (socket) {
            socket.on("doc", (data: any) => {
                sendToSocket.current = false;
                //changeSendToSocket(false);
                setEditorContent(data.html, false);
                setNameFormContent(data.name, false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    // For saving - will be removed when saving via sockets are implemented
    useEffect (() => {
        const setSelectElement = (id: string, value: string | null) => {
            //console.log(`Setting select: ${currentDoc._id}`)
            let selectElement = document.getElementById(id) as HTMLSelectElement | null;
            if (selectElement !== null) {
                if (value !== null) {
                    selectElement.value = value;
                }
                    
            }
        }

        (async () => {
            await fetchDocs();
            // Dont set selectElement on first render
            if (shouldSetSelectElement.current) {
                setSelectElement("documentSelect", savedDoc._id);
                setDocumentSaved(false);
            }

            // Forwards set select when this effect is triggered
            shouldSetSelectElement.current = true;
            
        })();
    }, [savedDoc, documentSaved]);

    console.log(`Log from app: ${currentDoc._id} - ${currentDoc.html} - ${currentDoc.name}`);

    return (
        <div className="App">
          <header className="App-header">
            <h1 className="main-site-h1">Real-time collaborative text editor</h1>
          </header>
          <main className="App-main">
              <Toolbar handleClick={handleClick} setLoadedDoc={setLoadedDoc} setSavedDoc={setSavedDoc} setDocumentSaved={setDocumentSaved} /* setDocumentLoaded={setDocumentLoaded} */ setCurrentDoc={setCurrentDoc} docs={docs} currentDoc={currentDoc}/>
              <NameForm handleNameChange={handleNameChange} currentDoc={currentDoc} />
              <Texteditor handleChange={handleChange} setCurrentDoc={setCurrentDoc} currentDoc={currentDoc}/>
          </main>
          <nav className='App-nav'>

          </nav>
        </div>
    );
}

export default App;
