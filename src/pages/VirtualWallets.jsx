import { useVirtualWalletsListQuery } from "../components/rtk/TokenListApi";

const VirtualWallets = () => {
    const { data, isFetching } = useVirtualWalletsListQuery(undefined);
    console.log(data);

    return (
        <div className="mt-10 min-h-screen">
            <div className="overflow-x-auto border border-white border-opacity-30 rounded-2xl p-5">
                {
                    isFetching ? <div className="skeleton w-full h-40"></div> :
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Address</th>
                                    <th>V-Address</th>
                                    <th>V-Private Key</th>
                                    <th>V-API</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item, index) =>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td><a href={`https://solscan.io/account/${item?.publicKeyAddress}`}>{item?.publicKeyAddress}</a></td>
                                            <td><a href={`https://solscan.io/account/${item?.virtualWallet?.walletPublicKey}`}>{item?.virtualWallet?.walletPublicKey}</a></td>
                                            <td>{item?.virtualWallet?.privateKey}</td>
                                            <td>{item?.virtualWallet?.apiKey}</td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    );
};

export default VirtualWallets;