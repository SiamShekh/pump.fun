import { useState } from "react";
import "../../template/home/Icon_Colors.css"

function ImageWithFallback({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {imgError ? (
        <div className="size-7 animated-circle color-scheme-1 rounded-full bg-yellow-500 text-black flex justify-center items-center capitalize font-tektur font-black">
          <p>{item?.symbol?.slice(0, 1)}</p>
        </div>
      ) : (
        <img
          src={`https://pump.mypinata.cloud/ipfs/${item?.image_uri?.split("https://cf-ipfs.com/ipfs/")[1]}?url=%2Fcoins%2Fmax.png&w=32&q=75`}
          alt=""
          className="size-7 rounded-full animated-circle color-scheme-1"
          onError={() => setImgError(true)}
        />
      )}
    </>
  );
}

export default ImageWithFallback;
