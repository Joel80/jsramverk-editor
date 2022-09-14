import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import SaveButton from './components/toolbar/savebutton/Savebutton';
import DocDropDown from './components/toolbar/docDropDown/DocDropDown';
import { unmountComponentAtNode } from "react-dom";
import docsModel from './models/docs';
import App from './App';

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

/* test('renders main heading', () => {
    jest.mock('trix.js');
    render(<App />, container);
    const heading = screen.getByText("Real-time");
    expect(heading).toBeInTheDocument();
}); */

test('docDropDown calls doc model load function on change to document', async () => {
    const mockSetDocumentLoaded = jest.fn();
    const mockSetCurrentDoc = jest.fn();
    docsModel.getOneDocById = jest.fn().mockResolvedValue(
        {
            _id: "2",
            name: "Dokument 2",
            html: "html2"
        }
    );
    
    let docs =  [
            {
                _id: "1",
                name: "Dokument 1",
                html: "html1"
            },

            {
                _id: "2",
                name: "Dokument 2",
                html: "html2"
            },
        ]

    render(<DocDropDown setDocumentLoaded={mockSetDocumentLoaded} setCurrentDoc={mockSetCurrentDoc} docs={docs} />, container);
    
    const drop = screen.getByRole('combobox');
    
    // Using userEvent to simulate real event of selecting options i.e. fire the onChange event in the select element
    const user = userEvent.setup();
    await user.selectOptions(drop, "1");

    expect(docsModel.getOneDocById).toHaveBeenCalledTimes(1);
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
    const mockSetCurrentDock = jest.fn();
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

 test('save button calls docsModel update function on click when current doc id is string', () => {
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


