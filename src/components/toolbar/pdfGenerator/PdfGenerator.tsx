import "./PdfGenerator.css";

export default  function PdfGenerator({createPdf}: {createPdf(): void}) {

    return (
            <button className="create-button" onClick={createPdf}>Save to pdf</button> 
    );
};
