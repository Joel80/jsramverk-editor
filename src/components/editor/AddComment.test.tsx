import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import AddComment from './AddComment';


test('add comment component renders', () => {
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
 });