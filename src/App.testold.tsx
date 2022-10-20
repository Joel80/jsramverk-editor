import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import CreateButton from './components/toolbar/createButton/CreateButton';
import DocDropDown from './components/toolbar/docDropDown/DocDropDown';
import PdfGenerator from './components/toolbar/pdfGenerator/PdfGenerator';
import ShareForm from './components/toolbar/shareForm/ShareForm';
import TypeChooser from './components/toolbar/typeChooser/TypeChooser';
import CodeEditor from './components/editor/CodeEditor';
import RunButton from './components/editor/RunButton';
import CodeConsole from './components/editor/CodeConsole';
import CommentButton from './components/editor/CommentButton';
import AddComment from './components/editor/AddComment';
import CommentCard from './components/editor/CommentCard';
import CommentList from './components/editor/CommentList';
import docsModel from './models/docs';
import authModel from './models/auth';
import App from './App';

// Mock sockets
jest.mock('socket.io-client');

// DocDropDown tests
test('DocDropDown calls doc model load function on change to document', async () => {
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
                code: false,
                comments: []
            },

            {
                _id: "2",
                name: "Dokument 2",
                html: "html2",
                allowed_users: ["jolf20@bth.se"],
                code: false,
                comments: []
            },
    ]

    const token = "";

    const codeMode = {
        current: false
    }


    render(<DocDropDown setLoadedDoc={mockSetLoadedDoc} setCurrentDoc={mockSetCurrentDoc} docs={docs} token={token} setUsers={mockSetUsers} codeMode={codeMode}/>);
    
    const drop = screen.getByRole('combobox');
    
    // Using userEvent to simulate real event of selecting options i.e. fire the onChange event in the select element
    const user = userEvent.setup();
    await user.selectOptions(drop, "1");

    expect(docsModel.getOneDocById).toHaveBeenCalledTimes(1);

});


test('DocDropDown renders with Choose document as default text', async () => {
    const mockSetCurrentDoc = jest.fn();
    const mockSetLoadedDoc = jest.fn();
    const mockSetUsers = jest.fn();

    let docs =  [
        {
            _id: "1",
            name: "Dokument 1",
            html: "html1",
            allowed_users: ["jolf20@bth.se"],
            code: false,
            comments: []
        },

        {
            _id: "2",
            name: "Dokument 2",
            html: "html2",
            allowed_users: ["jolf20@bth.se"],
            code: false,
            comments: []
        },
    ]

    const token = "";

    const codeMode = {
        current: false
    }

    render(<DocDropDown setLoadedDoc={mockSetLoadedDoc} setCurrentDoc={mockSetCurrentDoc} docs={docs} token={token} setUsers={mockSetUsers} codeMode={codeMode}/>);
    
    const drop = screen.getByText('Choose document');

    expect(drop).toBeInTheDocument();

}); 


 /* test('create button calls the handleClick function on click', () => {
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
 */
 /* test('PdfGenerator renders a button with text "Save to pdf"', () => {
    const mockCreatePdf = jest.fn();

    render(<PdfGenerator createPdf={mockCreatePdf}/>);

    const button = screen.getByText('Save to pdf');

    expect(button).toBeInTheDocument();
 });

 test('Clicking PdfGenerator button calls the passed in function"', async () => {
    const mockCreatePdf = jest.fn();

    render(<PdfGenerator createPdf={mockCreatePdf}/>);

    const button = screen.getByText('Save to pdf');

    const user = userEvent.setup();
    await user.click(button);

    expect(mockCreatePdf).toHaveBeenCalledTimes(1);
 }); */

 test('Adding a new user calls correct functions with correct arguments', async () => {
    docsModel.emailNewUser = jest.fn();

    const mockSetCurrentDoc = jest.fn();

    const doc = {
        _id: "1",
        name: "A name",
        html: "Some html",
        allowed_users: ["jolf20@bth.se"],
        code: false,
        comments: []
    };

    const mockSetUsers = jest.fn();

    const users: string[] = [];

    const userEmail = 'test1@test.se';

    const token = "";

    render(<ShareForm setCurrentDoc={mockSetCurrentDoc} currentDoc={doc} setUsers={mockSetUsers} users={users} userEmail={userEmail} token={token} />)

    const user = userEvent.setup();

    const button = screen.getByText('Share');

    const input = screen.getByRole('textbox');

    await user.type(input, "test2@test.se");

    await user.click(button);

    expect(docsModel.emailNewUser).toHaveBeenCalledWith(userEmail, 'test2@test.se', token);

    expect(mockSetUsers).toHaveBeenCalledTimes(1);

    expect(mockSetCurrentDoc).toHaveBeenCalledTimes(1);

 });


 test('clicking type chooser sets codeMode.current to true and calls setCurrentDoc and setLoadedDoc', async () => {

    const codeMode = {
        current: false
    }

    const mockSetCurrentDoc = jest.fn();

    const mockSetLoadedDoc = jest.fn();
    render(<TypeChooser codeMode={codeMode} setCurrentDoc={mockSetCurrentDoc} setLoadedDoc={mockSetLoadedDoc} />);

    const user = userEvent.setup();

    const chooser = screen.getByRole('checkbox');

    await user.click(chooser);

   expect(codeMode.current).toBeTruthy();
   expect(mockSetCurrentDoc).toHaveBeenCalledTimes(1);
   expect(mockSetLoadedDoc).toHaveBeenCalledTimes(1);
 });

 test('clicking on code chooser then on create new doc renders code editor', async () => {
    
    render(<App />);

    authModel.login = jest.fn().mockReturnValue({data: {token: "1", email:"test@test.se"}});
    
    docsModel.getOneDocById = jest.fn().mockReturnValue({
        _id: "1",
        name: "A name",
        html: "Some html",
        allowed_users: ["test@test.se"],
        code: false,
        comments: []
    });

    docsModel.getUsers = jest.fn().mockReturnValue(["test@test.se"]);

    docsModel.getAllDocs = jest.fn().mockReturnValue(
        [
            {
                _id: "1",
                name: "A name",
                html: "Some html",
                allowed_users: ["test@test.se"],
                code: false,
                comments: []
            }
        ] 
    );

    docsModel.saveDocQL = jest.fn().mockReturnValue("1");

    const button = screen.getByText("Log in");

    const user = userEvent.setup();

    await user.click(button);

    const chooser = screen.getByRole('checkbox');
    const button2 = screen.getByText("Create new doc");
    await user.click(chooser);

    await user.click(button2);

    screen.getByText("Loading...");

 });

/*  test('code editor renders loading screen', async () => {

    const codeEditorRef = {
        current: null
    }

    const monacoRef = {
        current: null
    }

    const doc = {
        _id: "1",
        name: "A name",
        html: "// some comment",
        allowed_users: ["jolf20@bth.se"],
        code: true,
        comments: []
    };

    const mockHandleCodeEditorChange = jest.fn();

    render(<CodeEditor codeEditorRef={codeEditorRef} monacoRef={monacoRef} handleCodeEditorChange={mockHandleCodeEditorChange} currentDoc={doc} />);

    const codeEditor = await screen.findByText("Loading...");

    expect(codeEditor).toBeInTheDocument();
    //screen.debug();

 }); */
/* 
 test('run code button renders', () => {

    const mockHandleClickRun = jest.fn();

    render(<RunButton handleClickRun={mockHandleClickRun} />)

    const button = screen.getByText("Run code");

    expect(button).toBeInTheDocument();

 });

 test('clicking run code button calls the passed in function', async () => {

    const mockHandleClickRun = jest.fn();

    render(<RunButton handleClickRun={mockHandleClickRun} />)

    const button = screen.getByText("Run code");
    const user = userEvent.setup();

    await user.click(button);

    expect(mockHandleClickRun).toHaveBeenCalledTimes(1);

 }); */

 /* test('code console renders with correct text', () => {
    render(<CodeConsole />);

    const codeConsole = screen.getByText("Click run code to see the result of your efforts here...");

    expect(codeConsole).toBeInTheDocument();
 });

 test('clicking run code button displays the result of docsModel.sendCode in code console', async () => {

    docsModel.sendCode = jest.fn(async (code) => 
        {

            const result = await Promise.resolve(code);
            return result;
        }
    );

    const mockHandleClickRun = jest.fn( async () => {
        const codeConsole = document.getElementById('codeConsole');

        if (codeConsole) {
            codeConsole.innerHTML = "Running your code...";
        }
        const result = await docsModel.sendCode("3");
        if (codeConsole) {
            codeConsole.innerHTML = result;
        }
        "3"});

    render(<CodeConsole />);

    render(<RunButton handleClickRun={mockHandleClickRun} />)

    const button = screen.getByText("Run code");
    const user = userEvent.setup();

    await user.click(button);

    const cnsl = screen.getByText("3");

    expect(cnsl).toBeInTheDocument();
    //screen.debug();
 }); */

/*  test('comment button renders ', () => {
    const mockHandleCommentButtonClick = jest.fn();

    render(<CommentButton handleCommentButtonClick={mockHandleCommentButtonClick} />);

    const button = screen.getByText("Comment");

    expect(button).toBeInTheDocument();
 });

 test('clicking comment button calls the passed in function ', async () => {
    const mockHandleCommentButtonClick = jest.fn();

    render(<CommentButton handleCommentButtonClick={mockHandleCommentButtonClick} />);

    const button = screen.getByText("Comment");

    const user = userEvent.setup();

    await user.click(button);

    expect(mockHandleCommentButtonClick).toHaveBeenCalledTimes(1);
 }); */

 /* test('add comment component renders', () => {
    const mockHandleAddCommentClick = jest.fn();
    const mockHandleCancelCommentClick = jest.fn();

    render(<AddComment handleAddCommentButtonClick={mockHandleAddCommentClick} handleCancelCommentButtonClick={mockHandleCancelCommentClick} />)
    const addButton = screen.getByText('Add comment');
    const cancelButton = screen.getByText('Cancel');
    const inputField = screen.getByRole('textbox');

    expect(addButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
 });

 test('clicking buttons in add comment component calls the passed in functions', async () => {
    const mockHandleAddCommentClick = jest.fn();
    const mockHandleCancelCommentClick = jest.fn();

    render(<AddComment handleAddCommentButtonClick={mockHandleAddCommentClick} handleCancelCommentButtonClick={mockHandleCancelCommentClick} />)
    const addButton = screen.getByText('Add comment');
    const cancelButton = screen.getByText('Cancel');
    const inputField = screen.getByRole('textbox');

    expect(addButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(addButton);

    expect(mockHandleAddCommentClick).toHaveBeenCalledTimes(1);

    await user.click(cancelButton);

    expect(mockHandleCancelCommentClick).toHaveBeenCalledTimes(1);
 }); */

 test('adding a comment renders comment to screen', async() => {
    render(<App />);

    authModel.login = jest.fn().mockReturnValue({data: {token: "1", email:"test@test.se"}});

    const doc = {
        _id: "1",
        name: "A name",
        html: "Some html",
        allowed_users: ["test@test.se"],
        code: false,
        comments: []
    }
    
    docsModel.getOneDocById = jest.fn().mockReturnValue(doc);

    docsModel.getUsers = jest.fn().mockReturnValue(["test@test.se"]);

    docsModel.getAllDocs = jest.fn().mockReturnValue(
        [ doc ] 
    );

    docsModel.saveDocQL = jest.fn().mockReturnValue("1");

    const logInButton = screen.getByText("Log in");

    const user = userEvent.setup();

    await user.click(logInButton);

    const createDocButton = screen.getByText("Create new doc");

    await user.click(createDocButton);
    
    //await waitFor(()=>{});

    const commentButton = screen.getByText("Comment");

    await user.click(commentButton);

    const commentInput = screen.getByTestId("comment-input");

    await user.type(commentInput, "A comment");

    const addCommentButton = screen.getByText("Add comment");

    await user.click(addCommentButton);

    const comment = screen.getByText("A comment");

 });
/* 
 test('comment card renders with correct comment', () => {

    const _id = "1";

    const key = 1;

    const comment = {
        date: new Date("2022-10-19"),
        user: "test@test.se",
        text: "A comment",
        range: [1, 1]

    }

    render(<CommentCard _id={_id} comment={comment} key={key}/>)

    const commentCard = screen.getByText("A comment");

    expect(commentCard).toBeInTheDocument();

    const user = userEvent.setup();

    user.hover(commentCard);

    //screen.debug();
    
 }); */

/*  test('comment list renders with correct comments', () => {

    const _id = "1";

    const key = 1;

    const comments = [
        {
            date: new Date("2022-10-19"),
            user: "test@test.se",
            text: "A comment",
            range: [1, 1]
        },

        {
            date: new Date("2022-10-19"),
            user: "test@test.se",
            text: "Another comment",
            range: [2, 2]
        },
    ]

    render(<CommentList comments={comments}/>)

    const commentCard1 = screen.getByText("A comment");

    expect(commentCard1).toBeInTheDocument();

    const commentCard2 = screen.getByText("Another comment");

    expect(commentCard2).toBeInTheDocument();

    //screen.debug();
    
 });
 */