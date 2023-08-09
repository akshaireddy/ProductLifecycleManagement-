const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
  const contractInfo = JSON.parse(fs.readFileSync('contract-info.json'));

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_NODE_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const plm = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);

  const createTx = await plm.createProduct('New Product');
  await createTx.wait();

  const productId = 1;
  await plm.updateProductStage(productId, 2); // Transition to Manufacturing

  const productInfo = await plm.getProduct(productId);
  console.log('Product Info:', productInfo);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
