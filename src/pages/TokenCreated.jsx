import { useMetaDataQuery } from "../components/rtk/TokenListApi";

const TokenCreated = () => {
    const { data, isFetching } = useMetaDataQuery(undefined);
    console.log(data);

    return (
        <div className="mt-10 min-h-screen">
            <div className="overflow-x-auto border border-white border-opacity-30 rounded-2xl p-5">
                {
                    isFetching ? <div className="skeleton w-full h-40"></div> :
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>

                                        </th>
                                        <th>Coin</th>
                                        <th>Description</th>
                                        <th>Social</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.map((item, index) => <tr key={index}>
                                            <th>
                                                {index + 1}
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={item?.file}
                                                                alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold capitalize">{item?.name}</div>
                                                        <div className="text-sm opacity-50 uppercase">${item?.symbol}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <a href="">{item?.description}</a>
                                            </td>
                                            <td>
                                                {
                                                    data?.twitter && <a href={data?.twitter}>X(Twitter)</a>
                                                }
                                                {
                                                    data?.telegram && <a href={data?.telegram}>X(Twitter)</a>
                                                }
                                                {
                                                    data?.website && <a href={data?.website}>X(Twitter)</a>
                                                }
                                            </td>
                                        </tr>)
                                    }

                                </tbody>

                            </table>
                        </div>
                }
            </div>
        </div>
    );
};

export default TokenCreated;