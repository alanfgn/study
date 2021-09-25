import Home from "../Home/Home";
import "./App.scss";

const App = () => {
    return (
        <div className="App">
            <Home />
            <div className="video-frame-container">
                <iframe
                    src="https://www.youtube.com/embed/eRkvJ71O2yc?controls=0&amp;rel=0&amp;playsinline=1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen              
                    title="Embedded youtube"
                />
            </div>
        </div>
    );
};

export default App;
