import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, execute, get } = hre.deployments;

  const dai = await get('DAI');

  const market = await get('MarketRegistry');
  const unionToken = await get('UnionToken');

  await deploy('UnionQuestCore', {
    from: deployer,
    args: [market.address, unionToken.address, dai.address],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false
  });

  await execute('UnionQuestCore', { from: deployer, log: true }, 'addItemTypes', [["Sword", "It stabs.", "3000000000000000000", "1000000000000000000"], ["Ring of trust", "A holy artifact.", "20000000000000000000", "3000000000000000"]]);
  await execute('UnionQuestCore', { from: deployer, log: true }, 'createVillage', 1, 2, "Crediton", "Crediton is a small town with an economy dependant on industry.");
  await execute('UnionQuestCore', { from: deployer, log: true }, 'createVillage', 3, 5, "Loansworth", "A large village, the economy of Loansworth depends on farming.");
};
export default func;
