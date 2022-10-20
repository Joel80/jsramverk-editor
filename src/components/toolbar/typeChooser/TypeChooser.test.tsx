import { render, screen } from '@testing-library/react';
import TypeChooser from './TypeChooser';
import userEvent from '@testing-library/user-event/';

// Code mode tests
test('Clicking type chooser sets codeMode.current to true and calls setCurrentDoc and setLoadedDoc', async () => {

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