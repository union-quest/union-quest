import { deployments, getUnnamedAccounts } from 'hardhat';
const { execute } = deployments;
// example script

const args = process.argv.slice(2);
const account = args[0];

async function main() {
  const accountAddress = isNaN(parseInt(account)) ? account : (await getUnnamedAccounts())[parseInt(account)];

  await execute('UnionQuestCore', { from: accountAddress, log: true }, 'createVillage', 1, 2, "Townley", "Ya");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
