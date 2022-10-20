import { render, screen } from '@testing-library/react';
import DocDropDown from './DocDropDown';
import userEvent from '@testing-library/user-event/';
import docsModel from '../../../models/docs';

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
