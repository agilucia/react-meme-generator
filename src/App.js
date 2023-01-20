import { useState } from 'react';
import { saveAs } from 'file-saver';
import './style.css';

export default function App() {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [meme, setMeme] = useState('both');
  const memeUrls = (memes, tops, bottoms) => {
    if (!tops && !bottoms) {
      return `https://api.memegen.link/images/${memes}.png`;
    } else if (!bottoms) {
      return `https://api.memegen.link/images/${memes}/${tops}.png`;
    } else if (!tops) {
      return `https://api.memegen.link/images/${memes}/_/${bottoms}.png`;
    } else {
      return `https://api.memegen.link/images/${memes}/${tops}/${bottoms}.png`;
    }
  };

  return (
    <div className="whole">
      <h1>React Meme Generator</h1>
      <br />
      <div>
        <img
          src={memeUrls(meme, top, bottom)}
          alt="meme"
          data-test-id="meme-image"
        />
      </div>
      <br />
      <label className="inputfield">
        Meme template
        <input
          value={meme}
          onChange={(event) => {
            setMeme(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label className="inputfield">
        Top text
        <input
          value={top}
          onChange={(event) => {
            setTop(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label className="inputfield">
        Bottom text
        <input
          value={bottom}
          onChange={(event) => {
            setBottom(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <div>
        <button
          onClick={() => {
            saveAs(memeUrls(meme, top, bottom), 'meme.png');
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}
