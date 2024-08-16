import { VersionedTransaction, Connection, Keypair } from '@solana/web3.js';
import bs58 from "bs58";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useWallet } from '@solana/wallet-adapter-react';
export default function App() {

  // const { publicKey, sendTransaction, signTransaction } = useWallet();
  const RPC_ENDPOINT = "https://rpc.ankr.com/solana";
  // const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";
  const web3Connection = new Connection(
    RPC_ENDPOINT,
    'confirmed',
  );

  const { register, handleSubmit } = useForm();


  async function sendLocalCreateTx(e) {
    e.preventDefault();

  }

  const handleForm = async (e) => {
    const form = new FormData();
    form.append("image", e.file[0]);

    const ImageResponse = await fetch("https://api.imgbb.com/1/upload?key=8c774531db468728c2d324fd5ba6991d", {
      body: form,
      method: "POST",
    }).then(res => res.json());

    const formData = new FormData();
    formData.append("name", "Lafti");
    formData.append("file", ImageResponse?.data?.display_url);
    formData.append("symbol", "kio");
    formData.append("description", "not for nall");
    formData.append("twitter", "");
    formData.append("telegram", "");
    formData.append("website", "");
    formData.append("showName", "true");

    const response = await axios.post('https://block-cors.vercel.app/', formData, {
      headers: {
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryizEA8suQ9RDCXWsW"
      }
    });

    const metadataResponseJSON = response.data;

    const mintKeypair = Keypair.generate();
    const signerKeyPair = Keypair.fromSecretKey(bs58.decode("3T4WBP3CjDSYzExvjCUCcpVxRANwiMGy4e7pwhrBwgzAEgAm41Ts5SzikfJb4XMByiqN23jb8f4bnAsTqNbn9vy3"));


    console.log(mintKeypair);
    console.log(metadataResponseJSON);

    const CreationResponse = await fetch(`https://pumpportal.fun/api/trade-local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "publicKey": "AycZMU7uhHJsGacT9Tp4FHdCAZjcivwPLgtggKLSNqUZ",
        "action": "create",
        "tokenMetadata": {
          name: metadataResponseJSON.metadata.name,
          symbol: metadataResponseJSON.metadata.symbol,
          uri: metadataResponseJSON.metadataUri
        },
        "mint": mintKeypair.publicKey.toBase58(),
        "denominatedInSol": "false",
        "amount": 0, // dev buy of 1 SOL
        "slippage": 10,
        "priorityFee": 0.0005,
        "pool": "pump"
      })
    });
    if (CreationResponse.status === 200) { // successfully generated transaction
      const data = await CreationResponse.arrayBuffer();
      const txBuffer = new Uint8Array(data);
      const tx = VersionedTransaction.deserialize(txBuffer);
      console.log("Transaction before signing:", tx);
      tx.sign([mintKeypair, signerKeyPair]);
      console.log("Transaction after signing:", tx);

      const signature = await web3Connection.sendTransaction(tx)
      console.log("Transaction: https://solscan.io/tx/" + signature);
    } else {
      console.log(CreationResponse.statusText); // log error
    }
  }

  return (
    <div>
      <h1>Create Your Token</h1>
      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <label>Token Image: </label>
          <input className='bg-black text-white' type="file" {...register("file")} required />
        </div>
        <button type="submit">Create Token</button>
      </form>
    </div>
  );
}
