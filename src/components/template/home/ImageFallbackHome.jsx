import { useState } from "react";

function ImageWithFallback({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {imgError ? (
        <div className="size-7 rounded-full bg-yellow-500 text-black flex justify-center items-center capitalize font-tektur font-black">
          <p>{item?.symbol?.slice(0, 1)}</p>
        </div>
      ) : (
        <img
          src={`${item?.image_uri}?url=%2Fcoins%2Fmax.png&w=32&q=75`}
          alt=""
          className="size-7 rounded-full"
          onError={() => setImgError(true)}
        />
      )}
    </>
  );
}

export default ImageWithFallback;
