import { useState } from 'react'
import uploadMedia from '../Utils/mediaUpload'

export default function Test() {
  const [file, setFile] = useState(null);

  async function uploadFile() {
    if (!file) {
      console.error("No file selected");
      return;
    }
    
    try {
      const res = await uploadMedia(file);  // Pass the file!
      console.log("Upload successful:", res);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5FB] relative overflow-hidden font-sans">
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button 
        className='bg-blue-500 text-white p-2 rounded'
        onClick={uploadFile}
      >
        Upload
      </button>
    </div>
  )
}