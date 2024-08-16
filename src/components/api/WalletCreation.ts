import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { AppRoot } from "../redux/store/Store";
import { setWallet } from "../redux/slice/WalletSlice";

const WalletCreation = async () => {
    const WalletSelector = useSelector((state: AppRoot) => state.Wallet);
    const Dispatch = useDispatch();

    if (!WalletSelector.isModified) {
        const res = (await axios.get("https://pumpportal.fun/api/create-wallet")).data;
        Dispatch(setWallet(res));
    } else {
        console.log('Wallet already created!');
    }
};

export default WalletCreation;