pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YourContract {

  event SetPurpose(address sender, string purpose);

  string public purpose = "🛠 Programming Unstoppable Money";

  function setPurpose(string memory newPurpose) public {
    purpose = newPurpose;
    emit SetPurpose(msg.sender, purpose);
  }

}
