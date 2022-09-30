import './App.css';
import Texteditor from './components/editor/Texteditor';
import NameForm from './components/editor/NameForm';
import { useState, useEffect, useRef } from 'react';
import docsModel from './models/docs';
//import SaveButton from './components/toolbar/savebutton/Savebutton';
import Toolbar from './components/toolbar/toolbar/Toolbar';
import docInterface from './interfaces/doc';
import { io } from 'socket.io-client';
import Login from './components/login/Login';

function App() {

    let defaultDoc = {
        _id: null,
        name: "No title",
        html: "",
        allowed_users: [""]
    };

    const [docs, setDocs] = useState([]);
    const [socket, setSocket] = useState<any>(null);
    const [currentDoc, setCurrentDoc] = useState<docInterface>(defaultDoc);
    const [documentSaved, setDocumentSaved] = useState<Boolean>(false);
    const [loadedDoc, setLoadedDoc] = useState<docInterface>(defaultDoc);
    const [savedDoc, setSavedDoc] = useState<docInterface>(defaultDoc);
    const [token, setToken] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const shouldSetSelectElement = useRef(false);
    const sendToSocket = useRef(false);
    const cursorPos = useRef([]);

    // Server url and socket declarations
    const SERVER_URL = window.location.href.includes("localhost") ? 
        "http://localhost:1337" :
        "https://jsramverk-editor-jolf20.azurewebsites.net"



    let updateCurrentDocOnChange: boolean = false;
    //let updateNameFieldOnChange: boolean =false;

    function handleChange(html: string, text: string) {
        if (updateCurrentDocOnChange) {
            const copy = Object.assign({}, currentDoc);
    
            copy.html = html;
    
            setCurrentDoc(copy);
        }
    
        updateCurrentDocOnChange = true;
    }


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //if (updateNameFieldOnChange) {
            const copy = Object.assign({}, currentDoc);
    
            copy.name = e.target.value;;
    
            setCurrentDoc(copy);
        //}
    
        //updateNameFieldOnChange = true;
    }

    
    async function handleClick() {
        let doc: Partial<docInterface>= {
            name: "Ingen titel",
            html: "No content",
            allowed_users: [userEmail],
        }
        const result = await docsModel.saveDoc(doc);

        const fetchedDoc = await docsModel.getOneDocById(result.id);

        //await fetchDocs();

        //setSelectElement("documentSelect", fetchedDoc._id);

        setEditorContent(fetchedDoc.html, false);

        setLoadedDoc(fetchedDoc);

        setCurrentDoc(fetchedDoc);

        setSavedDoc(fetchedDoc);

        setDocumentSaved(true);
    }

    function setEditorContent(content: string, triggerChange: boolean) {
        let element = document.querySelector("trix-editor") as any | null;

        if (element) {
            updateCurrentDocOnChange = triggerChange;
            // Get selected range (save the current cursor position)
            cursorPos.current = element.editor.getSelectedRange();
            //console.log(`Cursorpos:${cursorPos.current}`);
            element.value = "";
            element.editor.setSelectedRange([0, 0]);
            updateCurrentDocOnChange = triggerChange;
            element.editor.insertHTML(content);
            // Set selected range to the "old" cursor position
            element.editor.setSelectedRange(cursorPos.current);
        }
    }

    /* function setNameFormContent(content: string, triggerChange: boolean) {
        let element = document.querySelector("document-name-form") as any | null;
        if (element) {
            updateNameFieldOnChange = triggerChange;
            element.value=content;
        }
    } */

    async function fetchDocs() {
        console.log("Calling getAllDocs");
        if (token) {
            const allDocs = await docsModel.getAllDocs(token);
            setDocs(allDocs);
        }
    }

    // Fetch all docs on loading app
    useEffect(() => {
        (async () => {
            await fetchDocs();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    // When a doc i selected in the dropDown
    useEffect( () => {
        setSocket(io(SERVER_URL));

        if (socket) {
            socket.emit("create", loadedDoc["_id"]);
        }

        setEditorContent(loadedDoc.html, false);
        //setNameFormContent(loadedDoc.name, false);

        return () => {
            if(socket) {
                socket.disconnect();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedDoc]);

    // Changes to currentDoc triggers this
    useEffect (() => {
        //console.log(sendToSocket);
        if (socket && sendToSocket.current) {
            console.log("Sending to socket");
            let data ={
                _id: currentDoc._id,
                name: currentDoc.name,
                html: currentDoc.html,
                allowed_users: currentDoc.allowed_users
            }

            socket.emit("doc", data);
        }

        sendToSocket.current = true;
        //changeSendToSocket(true);
        //console.log(sendToSocket);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDoc]);

    // When socket changes
    useEffect (() => {
        if (socket) {

            // Listen to docUpdate event
            socket.on("docUpdate", (data: any) => {
                sendToSocket.current = false;
                //changeSendToSocket(false);
                //console.log("Updates from socket");
                setEditorContent(data.html, false);
                //setNameFormContent(data.name, false);

                // A call to fetchDocs here to get documents
                // created and loaded?
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    // Used when creating new doc to reflect changes in drop down list
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
            // Dont set selectElement on first render
            if (shouldSetSelectElement.current) {
                await fetchDocs();
                setSelectElement("documentSelect", savedDoc._id);
                setDocumentSaved(false);
            }

            // Forwards set select when this effect is triggered
            shouldSetSelectElement.current = true;
            
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedDoc, documentSaved]);

    console.log(`Log from app: ${currentDoc._id} - ${currentDoc.html} - ${currentDoc.name} -${userEmail} - ${currentDoc.allowed_users}`);

    return (
        <div className="App">
          <header className="App-header">
            <h1 className="main-site-h1">Real-time collaborative text editor</h1>
          </header>
          <main className="App-main">
                {token ?
                    <>
                        <Toolbar 
                            handleClick={handleClick} 
                            setLoadedDoc={setLoadedDoc} 
                            setSavedDoc={setSavedDoc} 
                            setDocumentSaved={setDocumentSaved} 
                            setCurrentDoc={setCurrentDoc} 
                            docs={docs} 
                            currentDoc={currentDoc}
                        />
                        <NameForm handleNameChange={handleNameChange} currentDoc={currentDoc} />
                        {currentDoc._id ?

                            <Texteditor handleChange={handleChange} currentDoc={currentDoc}/>

                            :
                            <></>

                        }
                        
                    </> 
                    
                    :
                    <Login setToken={setToken} setUserEmail={setUserEmail} />
                    
                }
                
          </main>
          <nav className='App-nav'>

          </nav>
        </div>
    );
}

export default App;
