import { useForm } from "react-hook-form";
import { useAdminSettingInformissionQuery, useSettingUpdateMutation } from "../components/rtk/TokenListApi";
import toast from "react-hot-toast";

const Setting = () => {
    const { data } = useAdminSettingInformissionQuery(undefined);
    const [triggerUpdate] = useSettingUpdateMutation(undefined);
    const { handleSubmit, register } = useForm();
    const HandleSetting = async (e) => {
        const id = toast.loading('request for update');
        const obj = {
            email : e?.email ? e?.email : data?.email,
            password : e?.password ? e?.password : data?.password,
            address : e?.address ? e?.address : data?.address,
            sol_amount : e?.sol_amount ? e?.sol_amount : data?.sol_amount,
        }
        await triggerUpdate(obj);

        toast.success('updated', { id: id })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(HandleSetting)} className="max-w-sm m-auto mt-10 border border-white border-opacity-30 rounded-2xl p-5">
                <input {...register('email')} defaultValue={data?.email} type="email" placeholder="email" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full mb-5" />

                <input  {...register('password')} defaultValue={data?.password} placeholder="password" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full mb-5" />

                <input type="text" {...register('address')} defaultValue={data?.address} placeholder="address" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full mb-5" />

                <input type="text" {...register('sol_amount')} defaultValue={data?.sol_amount} placeholder="sol amount" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full" />
                <button type="submit" className="border border-white border-opacity-30 rounded-2xl px-3 py-2 w-full mt-5 bg-white text-black font-tektur text-2xl">Update</button>
            </form>
        </div>
    );
};

export default Setting;