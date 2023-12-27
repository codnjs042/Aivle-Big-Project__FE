// api/textToSpeech.ts

import axios from 'axios';

export const textToSpeech = async (text: string): Promise<string | null> => {
  try {
    const apiKey = 'AIzaSyB_yrG0StK0YALXlDWEyY_B2EItX9n145Y'; // api key

    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        input: { text },
        voice: { languageCode: 'ko-KR', name: 'ko-KR-Wavenet-A', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'LINEAR16' },
      }
    );

    const audioContent = response.data.audioContent;
    return `data:audio/wav;base64,${audioContent}`;
  } catch (error) {
    console.error('Text-to-Speech API Error:', error);
    return null;
  }
};
