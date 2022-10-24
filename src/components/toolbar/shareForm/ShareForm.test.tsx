import docsModel from '../../../models/docs';
import ShareForm from './ShareForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';

test('Adding a new user calls passed in and state functions with correct arguments', async () => {
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