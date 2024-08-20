import { useState } from "react";

function ImageProfileFallback({ item }) {
    const [imgError, setImgError] = useState(false);

    return (
        <>
            {imgError ? (
                <div className="size-12 md:size-16 rounded-full bg-yellow-500 text-black flex justify-center items-center capitalize font-tektur font-black">
                    <p>{item?.symbol?.slice(0, 1)}</p>
                </div>
            ) : (

                <div className="avatar">
                    <div className="mask mask-squircle w-12 md:w-16">
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

export default ImageProfileFallback;
