import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, execute, get } = hre.deployments;

  const DAI = hre.network.name === "hardhat" ? await deploy("FaucetERC20", {
    from: deployer,
    proxy: {
      proxyContract: "UUPSProxy",
      execute: {
        methodName: "__FaucetERC20_init",
        args: ["DAI", "DAI"]
      }
    },
    log: true
  }) : (await get("DAI"));

  const unionToken = hre.network.name === "hardhat" ? await deploy('UnionToken', {
    from: deployer,
    args: ["Union", "UNION", deployer, 1000000000000],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false
  }) : (await get("UnionToken"));


  const marketRegistry = hre.network.name === "hardhat" ? await deploy("MarketRegistry", {
    from: deployer,
    proxy: {
      proxyContract: "UUPSProxy",
      execute: {
        methodName: "__MarketRegistry_init",
        args: []
      }
    },
    log: true
  }) : (await get("MarketRegistry"));

  const assetManager = hre.network.name === "hardhat" ? await deploy("AssetManager", {
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
  }) : (await get("AssetManager"));;

  const comptroller = hre.network.name === "hardhat" ? await deploy("Comptroller", {
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
  }) : (await get("Comptroller"));;

  const creditLimitModel = hre.network.name === "hardhat" ? await deploy("SumOfTrust", {
    from: deployer,
    args: [3],
    log: true
  }) : (await get("SumOfTrust"));;

  const userManager = hre.network.name === "hardhat" ? await deploy("UserManager", {
    from: deployer,
    proxy: {
      proxyContract: "UUPSProxy",
      execute: {
        init: {
          methodName: "__UserManager_init",
          args: [
            assetManager.address,
            unionToken.address,
            DAI.address,
            creditLimitModel.address,
            comptroller.address,
            deployer
          ]
        }
      }
    },
    log: true
  }) : (await get("UserManager"));

  const unionQuest = await deploy('UnionQuest', {
    from: deployer,
    args: [marketRegistry.address, unionToken.address, DAI.address],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false
  });

  if (hre.network.name === "hardhat") {
    await execute("MarketRegistry", { from: deployer, log: true }, "addUserManager", DAI.address, userManager.address);
    await execute("UnionToken", { from: deployer, log: true }, "approve", userManager.address, "1000000000000000000");
    await execute("UserManager", { from: deployer, log: true }, "addMember", unionQuest.address);
  }

  await execute("UnionQuest", { from: deployer, log: true }, "addItemTypes", [
    ["", "", "", 0, []],
    ["Wood", "A piece of wood.", "🪵", 0, [3, 5, 7]],
    ["Stone", "A piece of stone.", "🪨", 0, [4, 6, 8]],
    ["Basic Axe", "Just an axe.", "🪓", "100", []],
    ["Basic Pickaxe", "Just a pickaxe.", "⛏️", "100", []],
    ["Superior Axe", "A decent axe.", "🪓", "500", []],
    ["Superior Pickaxe", "A decent pickaxe.", "⛏️", "500", []],
    ["Golden Axe", "The greatest axe in the land.", "🪓", 0, []],
    ["Golden Pickaxe", "The greatest pickaxe in the land.", "⛏️", 0, []]
  ]);
  await execute("UnionQuest", { from: deployer, log: true }, "addRecipes", [[[1, 2], [100, 50], 7], [[1, 2], [100, 50], 8]]);
};
export default func;

