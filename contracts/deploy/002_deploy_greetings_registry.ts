import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy('UnionQuestCore', {
    from: deployer,
    args: ["0x15B12b8dB6665B31E15Da26275fD54590f2E989c", "0x08AF898e65493D8212c8981FAdF60Ff023A91150", "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa"],
    log: true,
    autoMine: true,
  });
};
export default func;
