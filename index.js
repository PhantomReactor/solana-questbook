import {
	Connection,
	PublicKey,
	clusterApiUrl,
	Keypair,
	LAMPORTS_PER_SOL,
	Transaction,
	Account,
} from '@solana/web3.js';

const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

const getSolBalance = async () => {
	try {
		const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
		const myKeypair = await Keypair.fromSecretKey(secretKey);
		const solBalance = await connection.getBalance(
			new PublicKey(myKeypair.publicKey)
		);
		const balance = parseInt(solBalance) / LAMPORTS_PER_SOL;
		console.log(`Wallet balance for address ${publicKey} is ${balance}SOL`);
	} catch (err) {
		console.log(err);
	}
};

const airDropSol = async () => {
	try {
		const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
		const myKeypair = await Keypair.fromSecretKey(secretKey);
		console.log('Airdopping 1SOL');
		const airDropSignature = await connection.requestAirdrop(
			new PublicKey(myKeypair.publicKey),
			2 * LAMPORTS_PER_SOL
		);
		await connection.confirmTransaction(airDropSignature);
		console.log('Airdrop success');
	} catch (err) {
		console.log(err);
	}
};

const driverFunction = async () => {
	await getSolBalance();
	await airDropSol();
	await getSolBalance();
};
driverFunction();
