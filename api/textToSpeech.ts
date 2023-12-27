import { NextApiRequest, NextApiResponse } from 'next';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const apiKey = 'AIzaSyB_yrG0StK0YALXlDWEyY_B2EItX9n145Y';   //api 키

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { text } = req.body;

    const client = new TextToSpeechClient({ key: apiKey });
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: 'ko-KR', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    });

    const audioContent = response?.audioContent?.toString('base64') || '';
    res.status(200).json({ audioContent });
  } catch (error) {
    console.error('Error in textToSpeech API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
