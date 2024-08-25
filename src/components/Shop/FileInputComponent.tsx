import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface ImageFile extends File {
  preview: string;
}

const FileInputComponent: React.FC<any> = ({ updateFullImages }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<ImageFile[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList?.length) updateFullImages(fileList);
    if (fileList) {
      const filesArray = Array.from(fileList)
        .slice(0, 4)
        .map((file) => {
          // Object URLs are used for previewing files
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });

      // Update the state with new files and clean up old files
      setFiles((prevFiles) => {
        // Clean up the old files' object URLs
        prevFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        return filesArray;
      });
    }
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ margin: "20px" }}>
        <label
          htmlFor="fileInput"
          style={{
            marginRight: "20px",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          Product Images:
        </label>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".webp"
          //accept=".jpg, .jpeg, .png, .webp, .bmp"
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button onClick={handleButtonClick} className="btn-add">
          Upload
        </button>
      </div>
      <div
        style={{
          width: "80%",
          height: "220px",
          border: "1px solid gray",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#c3c3c3",
          fontSize: "20px",
        }}
      >
        {files.length > 0 ? (
          <div>
            {files.map((file, index) => (
              <img
                key={index}
                src={file.preview}
                alt="Preview"
                style={{ width: "200px", height: "200px", margin: "10px" }}
              />
            ))}
          </div>
        ) : (
          <div>Upload image up to 4</div>
        )}
      </div>
    </div>
  );
};

export default FileInputComponent;
