'use client'

import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const LinkSafetyChecker = () => {
  const [url, setUrl] = useState('');
  const [safetyStatus, setSafetyStatus] = useState('');
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API as string;

  const checkSafety = async () => {
    try {
      const response = await fetch(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client: {
              clientId: process.env.GOOGLE_SAFE_BROWSING_API as string,
              clientVersion: '1.0',
            },
            threatInfo: {
              threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
              platformTypes: ['ANY_PLATFORM'],
              threatEntryTypes: ['URL'],
              threatEntries: [{ url }],
            },
          }),
        }
      );

      const data = await response.json();
      if (data.matches && data.matches.length > 0) 
        {
            console.log(data);
            
            setSafetyStatus('unsafe');
        } else {
        setSafetyStatus('safe');
      }
    } catch (error) {
      console.error('Error checking link safety:', error);
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={checkSafety}>Check Safety</button>
      {safetyStatus && (
        <p>
          Safety status: {safetyStatus === 'safe' ? 'Safe' : 'Unsafe'}
        </p>
      )}
    </div>
  );
};

export default LinkSafetyChecker;
