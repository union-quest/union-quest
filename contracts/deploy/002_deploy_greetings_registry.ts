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
  });

  const userManager = await deploy('UserManager', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const market = await deploy('MarketRegistry', {
    from: deployer,
    args: [userManager.address],
    log: true,
    autoMine: true,
  });

  const core = await deploy('UnionQuestCore', {
    from: deployer,
    args: [market.address, "0x08AF898e65493D8212c8981FAdF60Ff023A91150", dai.address],
    log: true,
    autoMine: true,
  });

  await execute('DAI', { from: deployer, log: true }, 'mint', deployer, 10000000000);
  await execute('DAI', { from: deployer, log: true }, 'approve', core.address, 10000000000);
  await execute('UnionQuestCore', { from: deployer, log: true }, 'addItemTypes', [["Sword", "Stabby!", 2, 1]]);
  await execute('UnionQuestCore', { from: deployer, log: true }, 'createVillage', 1, 2, "Crediton", "Crediton is a small town with an economy dependant on industry.");
  await execute('UnionQuestCore', { from: deployer, log: true }, 'createVillage', 3, 5, "Loansworth", "A large village, the economy of Loansworth depends on farming.");

  // await execute('UnionQuestCore', { from: deployer, log: true }, 'move', 0, 2);
  // await execute('UnionQuestCore', { from: deployer, log: true }, 'buyItem', 0, 2, "0x");
};
export default func;
