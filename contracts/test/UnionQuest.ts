import { expect } from './chai-setup';
import { ethers, deployments, getUnnamedAccounts } from 'hardhat';
import { DAI, UnionQuest, UserManager } from '../typechain';
import { setupUsers } from './utils';
import { BigNumber } from 'ethers';

const setup = deployments.createFixture(async () => {
  await deployments.fixture('UnionQuest');
  const contracts = {
    DAI: <DAI>await ethers.getContract('DAI'),
    UnionQuest: <UnionQuest>await ethers.getContract('UnionQuest'),
    UserManager: <UserManager>await ethers.getContract('UserManager'),
  };
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
  };
});

// FIXME, this isn't bounded by the end coords
const testMove = async (time: number, targetX: number, targetY: number, users: any) => {
  const distanceTravelled = time / 10;

  const angle = Math.atan2(targetY, targetX);

  const x = Math.round(distanceTravelled * Math.sin(angle));
  const y = Math.round(distanceTravelled * Math.cos(angle));

  expect(await users[0].UnionQuest.getPosition(users[0].address))
    .to.deep.equal([BigNumber.from(y), BigNumber.from(x)]);
}

// FIXME, this assumes the player is at the tile
const testGather = async (users: any, time: number, resourceId: number) => {
  const skill = time / 10;

  expect(await users[0].UnionQuest.getSkill(users[0].address, resourceId))
    .to.deep.equal(BigNumber.from(skill));

  expect(await users[0].UnionQuest.getStreamedBalance(users[0].address, resourceId))
    .to.deep.equal(BigNumber.from((skill * (skill + 1)) / 2));
}

describe('UnionQuest', function () {
  it('user gradually moves to target 1', async function () {
    const { users, UnionQuest } = await setup();

    await expect(users[0].UnionQuest.move(2, 5))
      .to.emit(UnionQuest, 'Move')
      .withArgs(users[0].address, 0, 0, 2, 5);

    await testMove(0, 2, 5, users);

    await ethers.provider.send("evm_increaseTime", [10])
    await ethers.provider.send("evm_mine", [])

    await testMove(10, 2, 5, users);

    await ethers.provider.send("evm_increaseTime", [20])
    await ethers.provider.send("evm_mine", [])

    await testMove(30, 2, 5, users);

    for (let i = 40; i <= 50; i += 10) {
      await ethers.provider.send("evm_increaseTime", [10])
      await ethers.provider.send("evm_mine", [])

      await testMove(i, 2, 5, users);
    }

  });

  it('user gradually moves to target 2', async function () {
    const { users, UnionQuest: UnionQuest } = await setup();

    await expect(users[0].UnionQuest.move(3, 7))
      .to.emit(UnionQuest, 'Move')
      .withArgs(users[0].address, 0, 0, 3, 7);

    await testMove(0, 3, 7, users);

    await ethers.provider.send("evm_increaseTime", [10])
    await ethers.provider.send("evm_mine", [])

    await testMove(10, 3, 7, users);

    for (let i = 30; i <= 50; i += 20) {
      await ethers.provider.send("evm_increaseTime", [20])
      await ethers.provider.send("evm_mine", [])

      await testMove(i, 3, 7, users);
    }
  });

  it('user gradually moves to target 3', async function () {
    const { users, UnionQuest } = await setup();

    await expect(users[0].UnionQuest.move(3, -7))
      .to.emit(UnionQuest, 'Move')
      .withArgs(users[0].address, 0, 0, 3, -7);

    await testMove(0, 3, -7, users);

    await ethers.provider.send("evm_increaseTime", [10])
    await ethers.provider.send("evm_mine", [])

    await testMove(10, 3, -7, users);

    for (let i = 30; i <= 50; i += 20) {
      await ethers.provider.send("evm_increaseTime", [20])
      await ethers.provider.send("evm_mine", [])

      await testMove(i, 3, -7, users);
    }
  });

  it('user gradually moves to target 4', async function () {
    const { users, UnionQuest } = await setup();

    await expect(users[0].UnionQuest.move(-10, -5))
      .to.emit(UnionQuest, 'Move')
      .withArgs(users[0].address, 0, 0, -10, -5);

    await testMove(0, -10, -5, users);

    await ethers.provider.send("evm_increaseTime", [50])
    await ethers.provider.send("evm_mine", [])

    await testMove(50, -10, -5, users);
  });

  it('gather speed increases linearly once the player reaches the tile', async function () {
    const { users, UnionQuest } = await setup();

    const resourceId = 1;
    await UnionQuest.setResources([{ x: 7, y: 4, resourceId }]);
    await users[0].UnionQuest.move(7, 4);

    await testGather(users, 0, resourceId);
    await testMove(0, 7, 4, users);

    await ethers.provider.send("evm_increaseTime", [80])
    await ethers.provider.send("evm_mine", [])

    await testGather(users, 0, resourceId);
    await testMove(80, 7, 4, users);

    const TIME_SPENT_MINING = 60;
    for (let i = 10; i <= TIME_SPENT_MINING; i += 10) {
      await ethers.provider.send("evm_increaseTime", [10])
      await ethers.provider.send("evm_mine", [])

      await testGather(users, i, resourceId);
    }

    await users[0].UnionQuest.move(0, 0);

    await ethers.provider.send("evm_increaseTime", [1000])
    await ethers.provider.send("evm_mine", [])

    await testGather(users, TIME_SPENT_MINING, resourceId);
  });


  it('allows staking and unstaking', async function () {
    const { DAI, UserManager, UnionQuest } = await setup();

    await DAI.mint(UnionQuest.address, 1000000);

    await expect(UnionQuest.stake(7))
      .to.emit(UserManager, "LogStake")
      .withArgs(UnionQuest.address, 7);


    expect(await DAI.balanceOf(UnionQuest.address))
      .to.equal(999993);

    await expect(UnionQuest.unstake(2))
      .to.emit(UserManager, "LogUnstake")
      .withArgs(UnionQuest.address, 2);

    expect(await DAI.balanceOf(UnionQuest.address))
      .to.equal(999995);
  });

  it('allows updating trust', async function () {
    const { users, UserManager, UnionQuest } = await setup();

    await expect(UnionQuest.updateTrust(users[0].address))
      .to.emit(UserManager, "LogUpdateTrust")
      .withArgs(UnionQuest.address, users[0].address, 0);

    await UnionQuest.setResources([{ x: 5, y: 5, resourceId: 1 }]);
    await UnionQuest.setResources([{ x: 8, y: 3, resourceId: 2 }]);
    await users[0].UnionQuest.move(5, 5);

    await testGather(users, 0, 1);
    await testMove(0, 5, 5, users);

    await ethers.provider.send("evm_increaseTime", [100])
    await ethers.provider.send("evm_mine", [])

    await expect(UnionQuest.updateTrust(users[0].address))
      .to.emit(UserManager, "LogUpdateTrust")
      .withArgs(UnionQuest.address, users[0].address, "30000000000000000");

    await users[0].UnionQuest.move(8, 3);

    await ethers.provider.send("evm_increaseTime", [100])
    await ethers.provider.send("evm_mine", [])

    await testGather(users, 70, 2);

    await expect(UnionQuest.updateTrust(users[0].address))
      .to.emit(UserManager, "LogUpdateTrust")
      .withArgs(UnionQuest.address, users[0].address, "100000000000000000");
  });
});
