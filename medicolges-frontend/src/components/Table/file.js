import React from 'react';

const FileDisplay = ({ fileUrl }) => {
  const fileExtension = fileUrl.split('.').pop();

  if (fileExtension.match(/(jpg|jpeg|png|gif)$/i)) {
    return <img src={fileUrl} alt="File" style={{ width: '100%', maxHeight: '400px' }} />;
  } else if (fileExtension.match(/(pdf)$/i)) {
    return (
      <object data={fileUrl} type="application/pdf" width="100%" height="500px">
        <p>Your browser does not support PDFs. <a href={fileUrl}>Download the PDF</a>.</p>
      </object>
    );
  } else {
    return <p>Unsupported file type</p>;
  }
};

export default FileDisplay;
