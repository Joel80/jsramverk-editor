import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import docsModel from './models/docs';
import authModel from './models/auth';
import App from './App';

// Mock sockets
jest.mock('socket.io-client');


// Adding new user test
 test('adding a user shows message in app and calls model with correct arguments', async() => {
    render(<App />);

    authModel.login = jest.fn().mockReturnValue({data: {token: "1", email:"test@test.se"}});

    docsModel.emailNewUser = jest.fn();

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

    const button = screen.getByText('Share');

    const input = screen.getByTestId('add-user-input');

    await user.type(input, "test2@test.se");

    await user.click(button);

    expect(docsModel.emailNewUser).toHaveBeenCalledWith("test@test.se", 'test2@test.se', "1");

    const message = screen.getByText("User added!");

    expect(message).toBeInTheDocument();

    const newUser = screen.getByText("Users: test@test.se, test2@test.se");

    expect(newUser).toBeInTheDocument();

});


// Type chooser / code mode test
 test('Clicking on type chooser then on create new doc renders code editor', async () => {
    
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

    const codeEditor = screen.getByText("Loading...");

    expect(codeEditor).toBeInTheDocument();

 });

 // Comment test
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

    const commentButton = screen.getByText("Comment");

    await user.click(commentButton);

    const commentInput = screen.getByTestId("comment-input");

    await user.type(commentInput, "A comment");

    const addCommentButton = screen.getByText("Add comment");

    await user.click(addCommentButton);

    const comment = screen.getByText("A comment");

    expect(comment).toBeInTheDocument();
});
