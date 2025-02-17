import './App.css'
import { useState } from 'react';
import axios from 'axios';

const App = () => {

  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:3000/api/short', { originalUrl })
    .then((res) => {
      setShortUrl(res.data.url.shortUrl);
      console.log("API response", res);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-lg w-full'>
        <h1 className="text-black text-center text-4xl font-bold mb-8">
          URL 
          <span className="text-pink-600"> Shortener</span>
        </h1>
        
        <div 
          onSubmit={ handleSubmit }
          className="flex flex-col space-y-4"
        >
    
          <input 
            className="border border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2"
            value={originalUrl}
            placeholder='Enter URL to shorten' 
            onChange={(e) => setOriginalUrl(e.target.value)} 
            type='text' 
            name='originalUrl' 
          />
    
          <button 
            type='button' 
            className="py-2 text-white bg-pink-600 border-none rounded-xl cursor-pointer hover:bg-pink-700"
            onClick={ handleSubmit }
          >
            Shorten
          </button>

          { 
            shortUrl && (
              <div className='mt-5 text-center'>
                <p className='text-lg font-medium'>Shortened URL</p>

                <a 
                  href={`http://localhost:3000/${shortUrl}`}
                  className='text-blue-500 underline mt-2'
                  target='_blank'
                >
                  { shortUrl }
                </a>
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default App
