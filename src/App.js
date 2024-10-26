import React, { useState } from 'react';
import { FileInput } from './Components/FileInput';
import { DialogBox } from './Components/Dialog/DialogBox';

function App() {
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileLoad = async (content) => {
    setLoading(true);
    setFileContent(content);
    await fetchServerResponse();
    setLoading(false);
  };

  const fetchServerResponse = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader">Загрузка данных... Пожалуйста, подождите...</div>
      ) : (
        <>
          <FileInput onFileLoad={handleFileLoad} />
          {fileContent && <DialogBox content={fileContent} />}
        </>
      )}
    </div>
  );
}

export default App;
