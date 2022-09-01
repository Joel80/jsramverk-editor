import './App.css';
import Texteditor from './components/editor/Texteditor';
//import SaveButton from './components/toolbar/savebutton/Savebutton';
import Toolbar from './components/toolbar/toolbar/Toolbar';

function App() {
    return (
        <div className="App">
          <header className="App-header">
          Real time collaborative text editor
          </header>
          <main className="App-main">
              <Toolbar />
              <Texteditor />
          </main>
          <nav className='App-nav'>

          </nav>
        </div>
    );
}

export default App;
