export default function TypeChooser({handleModeChange}: {handleModeChange(): void}) {

    return (
            <>
                <label>Editor mode</label>
                <input id="typeChooser" type="checkbox" onChange={handleModeChange} /> 
            </>
            
    );
};