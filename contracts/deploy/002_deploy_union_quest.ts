import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, execute } = hre.deployments;

  const unionToken = await deploy('UnionToken', {
    from: deployer,
    args: ["Union", "UNION", deployer, 1000000000000],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false
  });

  const dai = await deploy("FaucetERC20", {
    from: deployer,
    proxy: {
      proxyContract: "UUPSProxy",
      execute: {
        methodName: "__FaucetERC20_init",
        args: ["DAI", "DAI"]
      }
    },
    log: true
  });

  const marketRegistry = await deploy("MarketRegistry", {
    from: deployer,
    proxy: {
      proxyContract: "UUPSProxy",
      execute: {
        methodName: "__MarketRegistry_init",
        args: []
      }
    },
    log: true
  });

  const assetManager = await deploy("AssetManager", {
    from: deployer,
    proxy: {
      proxyContract: "UUPSProxy",
      execute: {
        init: {
          methodName: "__AssetManager_init",
          args: [marketRegistry.address]
        }
      }
    },
    log: true
  });

  const comptroller = await deploy("Comptroller", {
    from: deployer,
    proxy: {
      proxyContract: "UUPSProxy",
      execute: {
        init: {
          methodName: "__Comptroller_init",
          args: [unionToken.address, marketRegistry.address]
        }
      }
    },
    log: true
  });

  const creditLimitModel = await deploy("SumOfTrust", {
    from: deployer,
    args: [3],
    log: true
  });

  const userManager = await deploy("UserManager", {
    from: deployer,
    proxy: {
      proxyContract: "UUPSProxy",
      execute: {
        init: {
          methodName: "__UserManager_init",
          args: [
            assetManager.address,
            unionToken.address,
            dai.address,
            creditLimitModel.address,
            comptroller.address,
            deployer
          ]
        }
      }
    },
    log: true
  });

  await execute("MarketRegistry", { from: deployer, log: true }, "addUserManager", dai.address, userManager.address);
  await execute("UnionToken", { from: deployer, log: true }, "approve", userManager.address, "1000000000000000000");

  const unionQuest = await deploy('UnionQuest', {
    from: deployer,
    args: [marketRegistry.address, unionToken.address, dai.address],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false
  });

  await execute("UnionQuest", { from: deployer, log: true }, "addItemTypes", [["Air", "💨", 0], ["Wood", "🪵", 0], ["Stone", "🪨", 0], ["Basic Axe", "🪓", 0], ["Basic Pickaxe", "⛏️", 0], ["Superior Axe", "🪓", 0], ["Superior Pickaxe", "⛏️", 0], ["Golden Axe", "🪓", 0], ["Golden Pickaxe", "⛏️", 0],]);
  await execute("UnionQuest", { from: deployer, log: true }, "addRecipes", [[[1, 2], [100, 50], 7], [[1, 2], [100, 50], 8]]);
  await execute("UserManager", { from: deployer, log: true }, "addMember", unionQuest.address);
};
export default func;

