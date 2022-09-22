import "./CreateButton.css";

export default  function CreateButton({handleClick}: {handleClick(): void}) {

    return (
            <button className="create-button" onClick={handleClick}>Create new doc</button> 
    );
};
