export default function TypeChooser({handleModeChange}: {handleModeChange(): void}) {
    
    return (
            <>
                <label>Code mode</label>
                <input id="typeChooser" type="checkbox" onChange={handleModeChange} /> 
            </>
            
    );
};