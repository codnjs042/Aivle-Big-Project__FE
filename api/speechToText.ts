const { SpeechClient } = require('@google-cloud/speech');
const path = require('path');

// 서비스 계정 키 파일의 경로 설정
const keyFilePath = path.join(__dirname, 'api', 'sst-test-410105-0caa08411e86.json');

// 서비스 계정 키를 사용하여 SpeechClient 초기화
const client = new SpeechClient({
  keyFilename: keyFilePath,
});

export const speechToText = async (audioBase64: string): Promise<string | null> => {
  try {
    const audioContent = Buffer.from(audioBase64, 'base64');

    const [response] = await client.recognize({
      audio: { content: audioContent },
      config: { encoding: 'LINEAR16', sampleRateHertz: 16000, languageCode: 'ko-KR' },
    });

    const transcription = response.results?.[0]?.alternatives?.[0]?.transcript || '';
    return transcription;
  } catch (error) {
    console.error('Speech-to-Text API Error:', error);
    return null;
  }
};