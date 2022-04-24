import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, execute } = hre.deployments;

  const dai = await deploy('DAI', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false
  });

  const userManager = await deploy('UserManager', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false
  });

  const market = await deploy('MarketRegistry', {
    from: deployer,
    args: [userManager.address],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false
  });

  await deploy('UnionQuestCore', {
    from: deployer,
    args: [market.address, "0x08AF898e65493D8212c8981FAdF60Ff023A91150", dai.address],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false
  });

  await execute('UnionQuestCore', { from: deployer, log: true }, 'addItemTypes', [["Sword", "It stabs.", "3000000000000000000", "1000000000000000000"], ["Ring of trust", "A holy artifact.", "20000000000000000000", "3000000000000000"]]);
  await execute('UnionQuestCore', { from: deployer, log: true }, 'createVillage', 1, 2, "Crediton", "Crediton is a small town with an economy dependent on industry.");
  await execute('UnionQuestCore', { from: deployer, log: true }, 'createVillage', 3, 5, "Loansworth", "A large village, the economy of Loansworth depends on farming.");
};
export default func;
