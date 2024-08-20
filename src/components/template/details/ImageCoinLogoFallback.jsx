import { useState } from "react";

function ImageCoinLogoFallback({ item }) {
    const [imgError, setImgError] = useState(false);

    return (
        <>
            {imgError ? (
                <div className="size-8 rounded-full bg-yellow-500 text-black flex justify-center items-center capitalize font-tektur font-black">
                    <p>{item?.symbol?.slice(0, 1)}</p>
                </div>
            ) : (

                <div className="avatar">
                    <div className="mask mask-squircle w-8">
                        <img
                            src={`${item?.image_uri}?url=%2Fcoins%2Fmax.png&w=32&q=75`}
                            alt=""
                            onError={() => setImgError(true)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default ImageCoinLogoFallback;
