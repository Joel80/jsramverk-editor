import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import CodeConsole from './CodeConsole';
import RunButton from './RunButton';
import docsModel from '../../models/docs';

test('code console renders with correct text', () => {
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
 });