import { ethers } from "hardhat";
// const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const ProductLifecycleManagement = await ethers.getContractFactory('ProductLifecycleManagement');
  const plm = await ProductLifecycleManagement.deploy();

  await plm.deployed();

  console.log('ProductLifecycleManagement deployed to:', plm.address);

  const contractInfo = {
    address: plm.address,
    abi: JSON.parse(plm.interface.format('json').toString()),
  };

  fs.writeFileSync('contract-info.json', JSON.stringify(contractInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
