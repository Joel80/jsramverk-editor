import "./RunButton.css";

export default  function RunCode({handleClickRun}: {handleClickRun(): void}) {

    return (
            <button className="run-button" onClick={handleClickRun}>Run code</button> 
    );
};
