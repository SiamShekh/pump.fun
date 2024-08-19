import { Connection, PublicKey } from '@solana/web3.js';
import { programs } from '@metaplex/js';

const { metadata: { Metadata } } = programs;

async function getTokenMetadata(mintAddress) {
    // Connect to Solana mainnet or your desired cluster
    const RPC_ENDPOINT = "https://rpc.helius.xyz/?api-key=40c3ebe4-c797-45a3-895e-b3cc09a24bf3";
    const connection = new Connection(RPC_ENDPOINT);

    // Convert the mint address to a PublicKey
    const mintPublicKey = new PublicKey(mintAddress);

    // Derive the metadata account address using the mint address
    const metadataPDA = await Metadata.getPDA(mintPublicKey);

    // Fetch the metadata account info
    const metadata = await Metadata.load(connection, metadataPDA);

    // Log the metadata
    console.log('Metadata:', metadata);
}

// Example usage
export default getTokenMetadata;
