import { render, screen } from '@testing-library/react';
import SaveButton from './components/toolbar/savebutton/Savebutton';
import { unmountComponentAtNode } from "react-dom";
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

    render(<SaveButton setDocumentSaved={mockSetDocumentSaved} setCurrentDoc={mockSetCurrentDock} currentDoc={doc}/>);
    const buttonText = screen.getByText("Save")
    expect(buttonText).toBeInTheDocument();
});


