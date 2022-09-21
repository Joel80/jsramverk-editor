import './nameForm.css';
import docInterface from '../../interfaces/doc';


export default function NameForm({ handleNameChange, currentDoc }: { handleNameChange(param: React.ChangeEvent<HTMLInputElement> ): void, currentDoc: docInterface} ) {

    return(
      <div>
        <input className="document-name-form" onChange={handleNameChange} value={currentDoc.name}></input>
      </div>
      
    );
  }