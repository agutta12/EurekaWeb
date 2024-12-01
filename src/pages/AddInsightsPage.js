import React, { useState } from 'react';

function AddInsightsPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://insightssummary.azurewebsites.net/api/insights_injest_csv?code=JyJiRHHRo8msdOCDCWL5gmS7Gxcl54LNmVhl1DGTeJsbAzFuBryB5w%3D%3D', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('Failed to upload file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file. Please check the console for details.');
    }
  };

  return (
    <div className="add-insights-page">
      <h1>Add Insights</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddInsightsPage;
