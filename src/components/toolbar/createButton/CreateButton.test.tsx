import { render, screen, fireEvent } from '@testing-library/react';
import CreateButton from './CreateButton';


test('create button renders with text create new doc', () => {
    const mockHandleClick = jest.fn();
    render(<CreateButton handleClick={mockHandleClick}/>);

    const button = screen.getByText("Create new doc");

    expect(button).toBeInTheDocument();
});

 test('create button calls the handleClick function on click', () => {
    const mockHandleClick = jest.fn();
    render(<CreateButton handleClick={mockHandleClick}/>);

    const button = screen.getByText("Create new doc");

    fireEvent.click(button);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
});