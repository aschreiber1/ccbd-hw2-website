import './App.css';
import SearchPhotos from "./searchPhotos"
import UploadPhotos from './uploadPhotos';

function App() {
  return (
    
    <div className="App">
     <div className="container">
        <h1 className="title">Cloud Computing and Big Data HW3</h1>
        <UploadPhotos/>
        <br/>
        <SearchPhotos/>
      </div>
    </div>
  );
}

export default App;
