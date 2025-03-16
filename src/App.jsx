import { useState } from 'react';

import './App.css';

function App() {
  const [style, setStyle] = useState('');
  const [reason, setReason] = useState('');
  const [breakupText, setBreakupText] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateBreakupText() {
    setLoading(true);
    const prompt = `Write a ${style} breakup text message for someone. The reason for the breakup is: ${reason}.`;

    try {
      const response = await fetch('https://ai.hackclub.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      }).then(res => res.json());
      setBreakupText(response.choices[0].message.content);
    } catch (error) {
      console.error('Error generating breakup text:', error);
      setBreakupText('Oops! Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 flex gap-4 flex-col'>
      <img src='broken-heart.svg' alt='broken-heart' className='logo' />
      <h1 className='text-xl font-bold'>AI Breakup Text Generator</h1>
      <input
        type='text'
        placeholder='Breakup Style (e.g. dramatic, funny)'
        className='border p-6 w-full border-rounded'
        value={style}
        onChange={e => setStyle(e.target.value)}
      />
      <input
        type='text'
        placeholder='Breakup Reason'
        className='border p-6 w-full'
        value={reason}
        onChange={e => setReason(e.target.value)}
      />
      <div className='flex flex-col space-y-4 gap-4'>
        <button
          className='bg-red-500 text-white p-2 rounded w-full'
          onClick={generateBreakupText}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Breakup Text'}
        </button>
      </div>
      {breakupText && (
        <div className='p-4 bg-gray-100 rounded'>
          <strong>Breakup Text:</strong>
          <p>{breakupText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
