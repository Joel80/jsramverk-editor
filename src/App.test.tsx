import { render, screen, fireEvent, getByText } from '@testing-library/react';
import SaveButton from './components/toolbar/savebutton/Savebutton';
import { unmountComponentAtNode } from "react-dom";
import docsModel from './models/docs';
//import App from './App';
import Toolbar from './components/toolbar/savebutton/Savebutton';
/* test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText("collaborative");
    expect(linkElement).toBeInTheDocument();
}); */

let container : any = null;

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
})

test('save button renders text Save', () => {
    let doc = {
        _id: "",
        name: "A name",
        html: ""
    };

    const mockSetDocumentSaved = jest.fn(()=>{});
    const mockSetCurrentDock = jest.fn(()=>{});

    render(<SaveButton setDocumentSaved={mockSetDocumentSaved} setCurrentDoc={mockSetCurrentDock} currentDoc={doc}/>, container);
    const buttonText = screen.getByText("Save")
    expect(buttonText).toBeInTheDocument();
});

test('save button calls docsModel.saveDoc on click when current doc id is null', () => {
    const mockSetDocumentSaved = jest.fn(()=>{});
    const mockSetCurrentDock = jest.fn(()=>{});
    let doc = {
        _id: null,
        name: "A name",
        html: ""
    };

    docsModel.saveDoc = jest.fn().mockResolvedValue({id: 1});
    docsModel.updateDoc = jest.fn();
    docsModel.getOneDocById = jest.fn();

    render(<SaveButton setDocumentSaved={mockSetDocumentSaved} setCurrentDoc={mockSetCurrentDock} currentDoc={doc}/>, container);
    const button = screen.getByText("Save");

    fireEvent.click(button);

    expect(docsModel.saveDoc).toHaveBeenCalledTimes(1);
       
 });

 test('save button calls docsModel.updateDoc on click when current doc id is string', () => {
    const mockSetDocumentSaved = jest.fn(()=>{});
    const mockSetCurrentDock = jest.fn(()=>{});
    let doc = {
        _id: "1",
        name: "A name",
        html: ""
    };

    docsModel.saveDoc = jest.fn();
    docsModel.updateDoc = jest.fn();
    docsModel.getOneDocById = jest.fn();

    render(<SaveButton setDocumentSaved={mockSetDocumentSaved} setCurrentDoc={mockSetCurrentDock} currentDoc={doc}/>, container);
    const button = screen.getByText("Save");

    fireEvent.click(button);

    expect(docsModel.updateDoc).toHaveBeenCalledTimes(1);
       
 });


