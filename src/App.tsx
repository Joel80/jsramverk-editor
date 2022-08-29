import './App.css';
import Editor from './components/editor/Editor';
import SaveButton from './components/toolbar/savebutton/Savebutton';

function App() {
    return (
        <div className="App">
          <header className="App-header">
          Real time collaborative text editor
          </header>
          <main className="App-main">
            <div className='App-toolbar'>
              <SaveButton />
            </div>
            <div className='App-editor'>
              <Editor />
            </div>
            
          </main>
          <nav className='App-nav'>

          </nav>
        </div>
    );
}

export default App;
