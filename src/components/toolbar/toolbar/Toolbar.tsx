import SaveButton from '../savebutton/Savebutton'
import DocDropDown from '../docDropDown/DocDropDown';
import "./Toolbar.css";

export default function Toolbar({docs}: any) {

    return (
        <div className="App-toolbar">
            <DocDropDown docs = {docs} />
            <SaveButton />
        </div>
    )
}
