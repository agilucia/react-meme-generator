import { useState } from 'react';
import { saveAs } from 'file-saver';
import './style.css';
import axios from 'axios';

export default function App() {
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [meme, setMeme] = useState('cryingfloor');
  const [memes, setMemes] = useState([]);

  const memeUrls = (images, tops, bottoms) => {
    if (!tops && !bottoms) {
      return `https://api.memegen.link/images/${images}.png`;
    } else if (!bottoms) {
      return `https://api.memegen.link/images/${images}/${tops
        .replace('?', '~q')
        .replace('#', '~h')
        .replace('/', '~s')}.png`;
    } else if (!tops) {
      return `https://api.memegen.link/images/${images}/_/${bottoms
        .replace('?', '~q')
        .replace('#', '~h')
        .replace('/', '~s')}.png`;
    } else {
      return `https://api.memegen.link/images/${images}/${tops
        .replace('?', '~q')
        .replace('#', '~h')
        .replace('/', '~s')}/${bottoms
        .replace('?', '~q')
        .replace('#', '~h')
        .replace('/', '~s')}.png`;
    }
  };

  axios
    .get('https://api.memegen.link/templates/')
    .then(function (response) {
      setMemes(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div className="section">
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
      <label>
        <select
          value={meme}
          onChange={(event) => setMeme(event.currentTarget.value)}
        >
          {memes.map((image) => (
            <option value={image.id} key={image.id}>
              {image.id}
            </option>
          ))}
        </select>
      </label>
      <label className="inputfield">
        Meme template
        <input
          list="templates"
          value={meme}
          onChange={(event) => {
            setMeme(event.currentTarget.value);
          }}
        />
        <datalist id="templates">
          <option value="buzz" />
          <option value="disastergirl" />
          <option value="gandalf" />
          <option value="doge" />
          <option value="cryingfloor" />
          <option value="agnes" />
          <option value="bilbo" />
          <option value="bender" />
          <option value="drowning" />
          <option value="drunk" />
        </datalist>
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
