import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { EmailSetup } from "../components/slice/LoginSlice";

const Admin = () => {
    const {handleSubmit, reset, register} = useForm();
    const dispatch = useDispatch();
    const HandleLogin = (e)=> {
        dispatch(EmailSetup(e));
    };
    
    return (
        <div className="min-h-screen p-5">
            <form onSubmit={handleSubmit(HandleLogin)} className="max-w-sm m-auto border border-white border-opacity-30 rounded-2xl p-5">
                <input {...register('email')} type="email" placeholder="email" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full mb-5" />
                <input type="password" {...register('password')} placeholder="password" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full " />
                <button type="submit" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full mt-5 bg-white text-black font-tektur text-2xl">Login</button>
            </form>
            <div className="grid hidden lg:grid-cols-4 md:grid-cols-2 gap-3 mt-10">
                <div className="border border-white border-opacity-30 p-5 rounded-2xl">
                    <div className="bg-yellow-500 w-fit text-black p-2 rounded-3xl mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                        </svg>
                    </div>
                    <p className="font-tektur text-2xl font-bold">Virtual Wallets</p>
                    <p className="font-tektur text-8xl font-bold">10</p>
                </div>

                <div className="border border-white border-opacity-30 p-5 rounded-2xl">
                    <div className="bg-yellow-500 w-fit text-black p-2 rounded-3xl mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </div>
                    <p className="font-tektur text-2xl font-bold">Swapped</p>
                    <p className="font-tektur text-8xl font-bold">10</p>
                </div>

                <div className="border border-white border-opacity-30 p-5 rounded-2xl">
                    <div className="bg-yellow-500 w-fit text-black p-2 rounded-3xl mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <p className="font-tektur text-2xl font-bold">Token Created</p>
                    <p className="font-tektur text-8xl font-bold">10</p>
                </div>

                <div className="border border-white border-opacity-30 p-5 rounded-2xl">
                    <div className="bg-yellow-500 w-fit text-black p-2 rounded-3xl mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                    </div>
                    <p className="font-tektur text-2xl font-bold">Wallet Connected</p>
                    <p className="font-tektur text-8xl font-bold">10</p>
                </div>

            </div>
        </div>
    );
};

export default Admin;