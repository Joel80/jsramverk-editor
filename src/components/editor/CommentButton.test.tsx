import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import CommentButton from './CommentButton';

test('comment button renders ', () => {
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
 });

