import './nameForm.css';
import docInterface from '../../interfaces/doc';


export default function Texteditor({ handleNameChange, currentDoc }: { handleNameChange(param: React.ChangeEvent<HTMLInputElement> ): void, currentDoc: docInterface} ) {

    return(
      <div data-testid="editor">
        <input className="document-name-form" onChange={handleNameChange} value={currentDoc.name}></input>
      </div>
      
    );
  }