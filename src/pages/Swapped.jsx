import { useSwappedQuery } from "../components/rtk/TokenListApi";

const Swapped = () => {
    const { data, isFetching } = useSwappedQuery(undefined);
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
                                    <th>Mint</th>
                                    <th>Amount</th>
                                    <th>Pool</th>
                                    <th>Action</th>
                                    <th>Transaction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item, index) =>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td><a href={`https://solscan.io/account/${item?.address}`}>{item?.address}</a></td>
                                            <td><a href={`/details/${item?.mint}`}>{item?.mint}</a></td>
                                            <td>{item?.amount}</td>
                                            <td>{item?.pool}</td>
                                            <td>{item?.actions}</td>
                                            <td><a href={`https://solscan.io/tx/${item?.transaction}`}>{item?.transaction}</a></td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    );
};

export default Swapped;