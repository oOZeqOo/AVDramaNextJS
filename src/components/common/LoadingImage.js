import Image from 'next/image';
import React, { useState } from 'react';

const Spinner = () => (
  <svg
    aria-hidden="true"
    className="w-8 h-8 mr-2 text-pink-200 animate-spin dark:text-red-600 fill-pink-300"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

const LoadingImage = ({ width, height, loading = 'lazy', ...rest }) => {
  const [isImageReady, setIsImageReady] = useState(false);
  const [isImageMissing, setIsImageMissing] = useState(false);
  const src = rest?.src?.includes('.mp4');
  const onLoadCallBack = (e) => {
    setIsImageReady(true);
  };

  return (
    <div className="flex justify-center items-center">
      {!isImageReady && !isImageMissing && (
        <div
          style={{ ...rest?.style, width, height }}
          width={width}
          height={height}
          className="flex justify-center items-center absolute"
        >
          <div
            style={{ width: 'fit-content', height: 'fit-content' }}
            className="flex flex-row justify-center items-center absolute self-center justify-self-center bg-black"
          >
            <Spinner />
          </div>
        </div>
      )}
      {isImageMissing && (
        <div
          style={{ ...rest?.style, width, height }}
          //   width={width}
          //   height={height}
          className="flex justify-center items-center absolute"
        >
          <div className="flex flex-row w-fit h-fit justify-center items-center absolute self-center justify-self-center bg-black">
            <h4 className="text-yellow-500">Missing Image</h4>
          </div>
        </div>
      )}
      {!!src ? (
        <>
          <video
            {...rest}
            controls={true}
            loop={true}
            style={{ ...rest?.style, zIndex: !isImageReady ? -1 : undefined }}
            onLoadStart={onLoadCallBack}
            playsInline={true}
            alt={'Missing Video'}
            onError={(e) => {
              setIsImageMissing(true);
            }}
          />
          <source type="video/mp4" />
        </>
      ) : (
        <Image
          {...rest}
          style={{ ...rest?.style, zIndex: !isImageReady ? -1 : undefined }}
          width={width}
          height={height}
          loading={loading}
          alt={'Missing Image'}
          onLoad={onLoadCallBack}
          onError={() => {
            setIsImageMissing(true);
          }}
        />
      )}
    </div>
  );
};

export default LoadingImage;
