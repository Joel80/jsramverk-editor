import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import RunButton from './RunButton';

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

 });