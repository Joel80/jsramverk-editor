import "./CreateButton.css";
import docInterface from '../../../interfaces/doc';
import docModel from '../../../models/docs';

export default  function CreateButton({handleClick}: {handleClick(): void}) {

    return (
            <button className="create-button" onClick={handleClick}>Create new doc</button> 
    );
};
