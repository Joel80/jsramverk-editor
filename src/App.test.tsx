import { useRef } from 'react';
import { render, screen, fireEvent, waitFor, findByText, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import SaveButton from './components/toolbar/savebutton/Savebutton';
import CreateButton from './components/toolbar/createButton/CreateButton';
import DocDropDown from './components/toolbar/docDropDown/DocDropDown';
//import { unmountComponentAtNode } from "react-dom";
import docsModel from './models/docs';
import App from './App';

jest.mock('socket.io-client');
//import TextEditor from './components/editor/Texteditor';

//jest.mock('./components/editor/Texteditor');

/* let container : any = null;

beforeEach(() => {
    // DOM element as reder target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    //cleanup in exíting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
}) */

/* test('renders app with all elements', async () => {
    docsModel.getAllDocs = jest.fn().mockResolvedValue(
        [
            {
                _id: "1",
                name: "Dokument 1",
                html: "html1"
            }
            
        ]
    );

    render(<App />);

    //expect(docsModel.getAllDocs).toHaveBeenCalledTimes(2);

    // Expect app elements to be rendered
    const heading = await screen.findByText("Real-time collaborative text editor");
    expect(heading).toBeInTheDocument();;
    const saveButton = await screen.findByText("Save");
    expect(saveButton).toBeInTheDocument();
    const drop = await screen.findByText("New document");
    expect(drop).toBeInTheDocument();
    const docNameField = await screen.findByDisplayValue("No title");
    expect(docNameField).toBeInTheDocument();
    const editor = await screen.findByTestId("editor");
    expect(editor).toBeInTheDocument();
 

    screen.debug();
});
 */
// Test broken when implementing sockets - look further into this

test('docDropDown calls doc model load function on change to document', async () => {
    const mockSetCurrentDoc = jest.fn();
    const mockSetLoadedDoc = jest.fn();
    const mockSetUsers = jest.fn();
    docsModel.getOneDocById = jest.fn().mockResolvedValue(
        {
            _id: "2",
            name: "Dokument 2",
            html: "html2",
            allowed_users: ["jolf20@bth.se"],
        }
    );

    docsModel.getUsers = jest.fn();
    
    let docs =  [
            {
                _id: "1",
                name: "Dokument 1",
                html: "html1",
                allowed_users: ["jolf20@bth.se"],
            },

            {
                _id: "2",
                name: "Dokument 2",
                html: "html2",
                allowed_users: ["jolf20@bth.se"],
            },
    ]

    const token = "";

    const codeMode = useRef(false);

    

    render(<DocDropDown setLoadedDoc={mockSetLoadedDoc} setCurrentDoc={mockSetCurrentDoc} docs={docs} token={token} setUsers={mockSetUsers} codeMode={codeMode}/>);
    
    const drop = screen.getByRole('combobox');
    
    // Using userEvent to simulate real event of selecting options i.e. fire the onChange event in the select element
    const user = userEvent.setup();
    await user.selectOptions(drop, "1");

    expect(docsModel.getOneDocById).toHaveBeenCalledTimes(1);

});


test('docDropDown renders with Choose document as default text', async () => {
    const mockSetCurrentDoc = jest.fn();
    const mockSetLoadedDoc = jest.fn();
    const mockSetUsers = jest.fn();

    let docs =  [
        {
            _id: "1",
            name: "Dokument 1",
            html: "html1",
            allowed_users: ["jolf20@bth.se"],
        },

        {
            _id: "2",
            name: "Dokument 2",
            html: "html2",
            allowed_users: ["jolf20@bth.se"],
        },
    ]

    const token = "";

    const codeMode = useRef(false);

    render(<DocDropDown setLoadedDoc={mockSetLoadedDoc} setCurrentDoc={mockSetCurrentDoc} docs={docs} token={token} setUsers={mockSetUsers} codeMode={codeMode}/>);
    
    const drop = screen.getByText('Choose document');

    expect(drop).toBeInTheDocument();

}); 

/* test('save button renders text Save', () => {
    let doc = {
        _id: "",
        name: "A name",
        html: ""
    };

    const mockSetDocumentSaved = jest.fn();
    const mockSetCurrentDock = jest.fn();

    render(<SaveButton setDocumentSaved={mockSetDocumentSaved} setCurrentDoc={mockSetCurrentDock} currentDoc={doc}/>, container);
    const buttonText = screen.getByText("Save")
    expect(buttonText).toBeInTheDocument();
}); */

test('save button calls docsModel save function on click when current doc id is null', () => {
    const mockSetDocumentSaved = jest.fn();
    const mockSetSavedDoc = jest.fn();
    const mockSetCurrentDock = jest.fn();
    let doc = {
        _id: null,
        name: "A name",
        html: "Some html",
        allowed_users: ["jolf20@bth.se"],
    };

    docsModel.saveDoc = jest.fn().mockResolvedValue({id: 1});
    docsModel.updateDoc = jest.fn();
    docsModel.getOneDocById = jest.fn();

    render(<SaveButton setDocumentSaved={mockSetDocumentSaved} setSavedDoc={mockSetSavedDoc} setCurrentDoc={mockSetCurrentDock} currentDoc={doc}/>);
    const button = screen.getByText("Save");

    fireEvent.click(button);

    expect(docsModel.saveDoc).toHaveBeenCalledTimes(1);
       
 });

 test('save button calls docsModel update function on click when current doc id is string', () => {
    const mockSetDocumentSaved = jest.fn(()=>{});
    const mockSetSavedDoc = jest.fn();
    const mockSetCurrentDock = jest.fn(()=>{});
    let doc = {
        _id: "1",
        name: "A name",
        html: "Some html",
        allowed_users: ["jolf20@bth.se"],
    };

    docsModel.saveDoc = jest.fn();
    docsModel.updateDoc = jest.fn();
    docsModel.getOneDocById = jest.fn();

    render(<SaveButton setDocumentSaved={mockSetDocumentSaved} setSavedDoc={mockSetDocumentSaved} setCurrentDoc={mockSetCurrentDock} currentDoc={doc}/>);
    const button = screen.getByText("Save");

    fireEvent.click(button);

    expect(docsModel.updateDoc).toHaveBeenCalledTimes(1);
       
 });


 test('create button calls the handleClick function on click', () => {
    const mockHandleClick = jest.fn();
    render(<CreateButton handleClick={mockHandleClick}/>);

    const button = screen.getByText("Create new doc");

    fireEvent.click(button);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
 });

 test('create button renders with text create new doc', () => {
    const mockHandleClick = jest.fn();
    render(<CreateButton handleClick={mockHandleClick}/>);

    const button = screen.getByText("Create new doc");

    expect(button).toBeInTheDocument();
 });

