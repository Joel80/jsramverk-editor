export default function TypeChooser({handleModeChange}: {handleModeChange(): void}) {

    return (
            <>
                <label>Editor mode</label>
                <input type="checkbox" onChange={handleModeChange} /> 
            </>
            
    );
};