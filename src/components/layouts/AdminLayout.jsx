import { Outlet } from "react-router-dom";
import AdminNavbar from "../ui/AdminNavbar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { usePingUserLoginMutation } from "../rtk/TokenListApi";
import { EmailSetup, Logout } from "../slice/LoginSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminLayout = () => {
    const { handleSubmit, reset, register } = useForm();
    const dispatch = useDispatch();
    const [triggerLogin, { data, isLoading }] = usePingUserLoginMutation();
    const LoginState = useSelector((state) => state.LoginReducer);
    const [isVerified, setVerified] = useState(false);
    const [isPersistCalled, setPersistCalled] = useState(false);

    useEffect(() => {
        const call = async () => {
            if (!isPersistCalled && LoginState?.email) {
                const result = await triggerLogin({
                    email: LoginState?.email,
                    password: LoginState?.password
                });

                if (result?.data?.ping) {
                    setVerified(true);
                } else {
                    setVerified(false);
                    dispatch(Logout());
                }
                setPersistCalled(true);
            }else {
                setPersistCalled(true);
            }
        };

        call(); 
    }, [LoginState, triggerLogin, data, isPersistCalled]);

    const HandleLogin = async (e) => {
        const result = await triggerLogin(e);
        if (result?.data?.ping) {
            dispatch(EmailSetup(e));
            setVerified(true);
            reset(); 
        } else {
            toast.error('Something went wrong');
            setVerified(false);
        }
    };
    
    return (
        <div>
            <div data-theme="synthwave" className="mx-auto">
                <nav className="max-h-[15vh] fixed top-0 w-full z-50">
                    <AdminNavbar />
                </nav>
                <section className="pt-[15vh] max-w-[1200px] mx-auto z-0 relative pb-10 min-h-screen">
                    {
                        isPersistCalled && !isVerified ?
                            <form onSubmit={handleSubmit(HandleLogin)} className="max-w-sm m-auto mt-10 border border-white border-opacity-30 rounded-2xl p-5">
                                <input {...register('email')} type="email" placeholder="email" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full mb-5" />
                                <input type="password" {...register('password')} placeholder="password" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full" />
                                <button type="submit" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full mt-5 bg-white text-black font-tektur text-2xl">Login</button>
                            </form> :
                            <Outlet />
                    }
                </section>
            </div>
        </div>
    );
};

export default AdminLayout;
