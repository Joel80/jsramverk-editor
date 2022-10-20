import { render, screen } from '@testing-library/react';
import PdfGenerator from './PdfGenerator';
import userEvent from '@testing-library/user-event/';

test('PdfGenerator renders a button with text "Save to pdf"', () => {
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
 });