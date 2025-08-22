import axios from 'axios';

export const executeCode = async (language, code) => {
  try {
    const res = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: language,
      version: '*',
      files: [{ 
        name: language === 'java' ? 'Main.java' : 'main', 
        content: code 
      }]
    });
    
    if (res.data.run.stdout) {
      return res.data.run.stdout;
    } else if (res.data.run.stderr) {
      return res.data.run.stderr;
    } else {
      return 'No output. Code executed successfully.';
    }
  } catch (err) {
    throw new Error('Error: ' + err.message);
  }
};