import React from 'react'
import { useRef, useState } from "react";
import ReactCrop, {
                  centerCrop,
                  convertToPixelCrop,
                  makeAspectCrop,
} from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'
import setCanvasPreview from './setCanvasPreview';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar }) => {
  const [imgSrc, setimgSrc] = useState('')
  const [crop, setcrop] = useState();
  const [error, seterror] = useState("");
  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null);

  const onSelectFile = (e) => {   //file selection function 
    const file = e.target.files?.[0]
    console.log(file)
    if (!file) return
    const reader = new FileReader()

    reader.addEventListener("load", (e) => {
      const imageElement = new Image()
      const imageUrl = reader.result?.toString() || ""
      imageElement.src = imageUrl
      imageElement.addEventListener("load", () => {
        const { naturalWidth, naturalHeight } = e.currentTarget
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          seterror("image must be 150 x 150 size")
          return setimgSrc("")
        }
      })

      setimgSrc(imageUrl)
    })
    reader.readAsDataURL(file)
  }

  const onImageLoad = (e) => {  //this function will only be called when the image is fully loaded

    const { width, height } = e.currentTarget
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100
    const cropHeightInPercent = (MIN_DIMENSION / height) * 100
    const crop = makeAspectCrop(            // this function creates a default size for cropping
      {
        unit: "%",
        width: cropWidthInPercent
      },
      ASPECT_RATIO,
      width,
      height
    )

    const centercrop = centerCrop(crop, width, height) //ee function aa crop box ine center cheyyum
    setcrop(centercrop)
  }

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>

      {imgSrc &&(
        <div className='flex flex-col items-center'>

          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setcrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            {error && <p className='text-red'>{error} </p>}
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              setCanvasPreview(
                imgRef.current, // HTMLImageElement
                previewCanvasRef.current, // HTMLCanvasElement
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              updateAvatar(dataUrl);

              closeModal(dataUrl);
            }}
          >
            Crop Image
          </button>

        </div>
        )}
        {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};
export default ImageCropper;