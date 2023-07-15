import React, { useEffect, useRef } from "react";
import { BsFillImageFill } from "react-icons/bs";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dweajsk5o",
        uploadPreset: "iw38aqxf",
      },
      function (error, result) {
        console.log(result);
      }
    );
    console.log(cloudinaryRef.current);
  }, []);

  return (
    <div>
      <button className="widget" onClick={() => widgetRef.current.open()}>
        <div className="widget-row">
          <BsFillImageFill className="icon" size={22} />
          <p>Upload image</p>
        </div>
      </button>
    </div>
  );
};

export default UploadWidget;
