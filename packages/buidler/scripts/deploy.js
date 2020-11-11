const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("@nomiclabs/buidler");
const { utils } = require("ethers");

async function main() {
  console.log("📡 Deploy \n");

  // auto deploy to read contract directory and deploy them all (add ".args" files for arguments)
//  await autoDeploy();
  // OR
  // custom deploy (to use deployed addresses dynamically for example:)
//  const deployPoolF = await deploy("HPoolFactory");
  const deployDealer = await deploy("HDealerFactory");
 // const deployPool = await deploy("HPool",['0x68b5F0f27246433aD39d2aFbD085b8b4cd75BEa8','0x68b5F0f27246433aD39d2aFbD085b8b4cd75BEa8']);
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  const deployGame = await deploy("HDealer",[]);
//  const ierc20 = await deploy("IERC20");
//  const linkinterface = await deploy("LinkTokenInterface");
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])
}





async function deploy(name, _args) {
  const args = _args || [];

  console.log(` 🛰  Deploying ${name}`);
  const contractArtifacts = await ethers.getContractFactory(name);
  const contract = await contractArtifacts.deploy(...args);
  console.log(" 📄",
    chalk.cyan(name),
    "deployed to:",
    chalk.magenta(contract.address),
    "\n"
  );
  fs.writeFileSync(`artifacts/${name}.address`, contract.address);
  console.log("💾  Artifacts (address, abi, and args) saved to: ",chalk.blue("packages/buidler/artifacts/"),"\n")
  return contract;
}

const isSolidity = (fileName) =>
  fileName.indexOf(".sol") >= 0 && fileName.indexOf(".swp.") < 0;

function readArgumentsFile(contractName) {
  let args = [];
  try {
    const argsFile = `./contracts/base/${contractName}.args`;
    if (fs.existsSync(argsFile)) {
      args = JSON.parse(fs.readFileSync(argsFile));
    }
  } catch (e) {
    console.log(e);
  }

  return args;
}

async function autoDeploy() {
  const contractList = fs.readdirSync(config.paths.sources);
  return contractList
    .filter((fileName) => isSolidity(fileName))
    .reduce((lastDeployment, fileName) => {
      const contractName = fileName.replace(".sol", "");
      const args = readArgumentsFile(contractName);

      // Wait for last deployment to complete before starting the next
      return lastDeployment.then((resultArrSoFar) =>
        deploy(contractName, args).then((result,b,c) => {

          if(args&&result&&result.interface&&result.interface.deploy){
            let encoded = utils.defaultAbiCoder.encode(result.interface.deploy.inputs,args)
            fs.writeFileSync(`artifacts/${contractName}.args`, encoded);
          }

          return [...resultArrSoFar, result]
        })
      );
    }, Promise.resolve([]));
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
