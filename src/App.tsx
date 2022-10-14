import './App.css';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { jsPDF } from "jspdf";
import Texteditor from './components/editor/Texteditor';
import NameForm from './components/editor/NameForm';
import docsModel from './models/docs';
import Toolbar from './components/toolbar/toolbar/Toolbar';
import docInterface from './interfaces/doc';
import docComment from './interfaces/comment';
import Login from './components/login/Login';
import CodeEditor from './components/editor/CodeEditor';
import RunButton from './components/editor/RunButton';
import CodeConsole from './components/editor/CodeConsole';
import CommentButton from './components/editor/CommentButton';
import AddComment from './components/editor/AddComment';
import CommentList from './components/editor/CommentList';


function App() {

    let defaultDoc = {
        _id: null,
        name: "No title",
        html: "",
        allowed_users: [""],
        code: false,
        comments: []
    };

    const [docs, setDocs] = useState([]);
    const [socket, setSocket] = useState<any>(null);
    const [currentDoc, setCurrentDoc] = useState<docInterface>(defaultDoc);
    const [documentSaved, setDocumentSaved] = useState<Boolean>(false);
    const [loadedDoc, setLoadedDoc] = useState<docInterface>(defaultDoc);
    const [savedDoc, setSavedDoc] = useState<docInterface>(defaultDoc);
    const [token, setToken] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [users, setUsers] = useState<string[]>([]);
    const shouldSetSelectElement = useRef(false);
    const sendToSocket = useRef(false);
    const cursorPos = useRef([]);
    const codeEditorRef = useRef<any>(null);
    const monacoRef = useRef<any>(null);
    const codeMode = useRef(false);
    const [showAddCommentField, setShowAddCommentField] = useState(false);
    const selectedRange = useRef([]);

    // Server url and socket declarations
    const SERVER_URL = window.location.href.includes("localhost") ? 
        "http://localhost:1337" :
        "https://jsramverk-editor-jolf20.azurewebsites.net"



    let updateCurrentDocOnChange: boolean = false;
    //let updateNameFieldOnChange: boolean =false;

    function handleCommentButtonClick() {
        if (!codeMode.current) {
            const element = document.querySelector("trix-editor") as any | null;
            if (element) { 
                const range = element.editor.getSelectedRange();
                selectedRange.current = range;
            }
        }
        setShowAddCommentField(true);
    }

    function handleAddCommentButtonClick() {
        if (!codeMode.current) {
            const element = document.querySelector("trix-editor") as any | null;
            if (element) {
                element.editor.activateAttribute("comment");
                const start = selectedRange.current[0];
                const end = selectedRange.current[1];
                element.editor.setSelectedRange([start]);
                element.editor.insertHTML("<comment>")
                element.editor.setSelectedRange([end]);
                element.editor.insertHTML("</comment>");

                const commentInput = document.getElementById("commentInput") as HTMLInputElement | null;

                if (commentInput) {
                    const comment = {
                        user: userEmail,
                        date: new Date(),
                        text: commentInput.value,
                        range: selectedRange.current
                    }

                    currentDoc.comments.push(comment);

                    commentInput.innerHTML='';
                    setShowAddCommentField(false);
                }
            }
        }
    }

    function handleCancelCommentButtonClick() {
        const commentInput = document.getElementById("commentInput") as HTMLInputElement | null;
        if (commentInput) {
            commentInput.innerHTML='';
        }

        setShowAddCommentField(false);
    }

    function handleModeChange() {
        codeMode.current = !codeMode.current;
        let doc = {_id: null, name:"No title", html:"", allowed_users: [], code: codeMode.current, comments: []}
        setCurrentDoc(doc);
        setLoadedDoc(doc);

        console.log(codeMode.current);
    }

    function showCodeEditorValue() {
        if (codeEditorRef.current) {
            
            console.log(codeEditorRef.current.getValue());
            codeEditorRef.current.setValue("Hej");
        } else {
            console.log(codeEditorRef.current);
        }
    }

    async function handleClickRun() {
        console.log("Running");
        //showCodeEditorValue();
        const codeConsole = document.getElementById('codeConsole');
        if (codeConsole) {
            codeConsole.innerHTML = "Running your code...";
        }
        const result = await docsModel.sendCode(codeEditorRef.current.getValue());
        if (codeConsole) {
            codeConsole.innerHTML = result;
        }
    }

    function handleCodeEditorChange(content: string | undefined) {
        if (updateCurrentDocOnChange) {
            const copy = Object.assign({}, currentDoc);
    
            copy.html = content;
    
            setCurrentDoc(copy);
        }
    
        updateCurrentDocOnChange = true;
    }

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
            code: codeMode.current,
            comments: []
        }
        const result = await docsModel.saveDocQL(doc, token);

        const fetchedDoc = await docsModel.getOneDocById(result, token);

        const docUsers = await docsModel.getUsers(fetchedDoc._id, token);

        setUsers(docUsers);

        //await fetchDocs();

        //setSelectElement("documentSelect", fetchedDoc._id);

        
        setEditorContent(fetchedDoc.html, false);
     
        
        setLoadedDoc(fetchedDoc);

        setCurrentDoc(fetchedDoc);

        setSavedDoc(fetchedDoc);

        setDocumentSaved(true);
    }

    function createPdf () {
        let element = document.querySelector("trix-editor") as any | null;
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.setFontSize(1);
        doc.html(element, {
            callback: function (doc) {
                doc.save("doc");
            },
            width: 800,
            windowWidth: 1200,
            margin: [30, 30, 30, 30]
        });

    }

    function setEditorContent(content: string | undefined, triggerChange: boolean) {
        let element = null;

        if (codeMode.current) {
            element = codeEditorRef.current;
             /* console.log(`Current content: ${element.getValue()}`);
                 */
            if (element) {
                // This gives the same as below, new and current content are
                // the same but still it is loaded?
                /* console.log(`New content: ${content}`);
                console.log(`Current content: ${element.getValue()}`); */
                updateCurrentDocOnChange = triggerChange;
                console.log(monacoRef.current);
                if (content !== element.getValue()) {
                    element.setValue(content);
                }
                console.log(element.getPosition());
            }
        } else {
            element = document.querySelector("trix-editor") as any | null;
            if (element) {
                updateCurrentDocOnChange = triggerChange;
                // Get selected range (save the current cursor position)
                cursorPos.current = element.editor.getSelectedRange();
                //console.log(`Cursorpos:${cursorPos.current}`);
                /* console.log(`Current content: ${element.value}`);
                console.log(`New content: ${content}`); */

                // To check if content equals works with code editor not with text editor?
                /* if (content !== element.value) { */
                    element.value = "";
                    element.editor.setSelectedRange([0, 0]);
                    updateCurrentDocOnChange = triggerChange;
                    element.editor.insertHTML(content);
                    // Set selected range to the "old" cursor position
                    element.editor.setSelectedRange(cursorPos.current);
                /* } */
            }
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
        //console.log("Calling getAllDocs");
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
            //console.log("Sending to socket");
            let data ={
                _id: currentDoc._id,
                name: currentDoc.name,
                html: currentDoc.html,
                allowed_users: currentDoc.allowed_users,
                code: codeMode.current,
                comments: currentDoc.comments
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

    console.log(`Log from app: ${currentDoc._id} - ${currentDoc.html} - ${currentDoc.name} ${currentDoc.code} -${currentDoc.comments}`);

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
                            token={token}
                            setUsers={setUsers}
                            users={users}
                            createPdf={createPdf}
                            handleModeChange={handleModeChange}
                            codeMode = {codeMode}
                            userEmail={userEmail}
                        />
                        {currentDoc._id ?
                            <>
                                <div className='users'>Users: {users.join(", ")} </div>
                                <NameForm handleNameChange={handleNameChange} currentDoc={currentDoc} />
                                {codeMode.current ?
                                    <>
                                        <RunButton handleClickRun={handleClickRun} />
                                        <CodeEditor monacoRef={monacoRef} codeEditorRef={codeEditorRef} handleCodeEditorChange={handleCodeEditorChange} currentDoc={currentDoc}/>
                                        <CodeConsole />
                                    </>
                                    :
                                    <>
                                        {showAddCommentField? 
                                            <>
                                                <AddComment handleAddCommentButtonClick={handleAddCommentButtonClick} handleCancelCommentButtonClick={handleCancelCommentButtonClick} />
                                                <div className='text-editor-wrapper'>
                                                    <Texteditor handleChange={handleChange} currentDoc={currentDoc}/>
                                                    {currentDoc.comments? 
                                                        <CommentList comments={currentDoc.comments} />
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                            </>
                                            :
                                            <>
                                                <CommentButton handleCommentButtonClick={handleCommentButtonClick}/>
                                                <div className='text-editor-wrapper'>
                                                
                                                <Texteditor handleChange={handleChange} currentDoc={currentDoc}/>
                                                    {currentDoc.comments? 
                                                        <CommentList comments={currentDoc.comments} />
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                                
                                            </>
                                        }
                                        
                                    </>
                                    
                                }
                            </>
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
