# Smart Contract Proof of Concept Reference

Comprehensive guide for writing proof-of-concept demonstrations for smart contract
vulnerabilities. Covers approach selection, Foundry test templates, common vulnerability
patterns, and cheatcode conventions.

## Approach Selection

When the target is a smart contract, ask the user which approach to use before writing code.

### Fork Test

Runs against a forked mainnet (or testnet) using live on-chain state via
`forge test --fork-url`. Replays real contract interactions against the actual deployment.

**When to use:**
- The vulnerability depends on deployed state, oracle prices, or liquidity pool balances
- Cross-contract or cross-protocol interactions are difficult to mock
- Flash loan attacks requiring real pool liquidity and flash loan providers
- Oracle manipulation requiring live AMM reserves
- The most convincing evidence is needed — proves exploitability against the actual deployment

**Trade-offs:**
- Requires an RPC endpoint (Alchemy, Infura, local archive node)
- Slower to run than unit tests
- May break if on-chain state changes (pin to a specific block to prevent this)

### Unit Test

A self-contained Foundry test that deploys minimal contracts and sets up synthetic state.
No external dependencies beyond the Foundry toolchain.

**When to use:**
- The vulnerability is in isolated logic (reentrancy, access control, arithmetic, state machine)
- The flaw does not depend on external protocol state
- Simpler to run, faster to iterate, easier for maintainers to reproduce without an RPC endpoint

**Trade-offs:**
- Cannot demonstrate vulnerabilities that depend on real protocol state
- Requires manually setting up any state the exploit depends on
- Less convincing for cross-protocol attack chains

### Default Selection

If the user has no preference, default to **unit test** for isolated logic flaws and **fork test**
when the exploit depends on live protocol state.

## Fork Test Template

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";

// Import or interface the target contracts
interface IVulnerableProtocol {
    function vulnerableFunction(uint256 amount) external;
}

contract ForkExploitTest is Test {
    // Target contract addresses on mainnet
    address constant TARGET = 0x...; // Vulnerable contract
    address constant TOKEN = 0x...;  // Relevant token

    IVulnerableProtocol target;
    address attacker;

    function setUp() public {
        // Fork mainnet at a specific block for reproducibility
        vm.createSelectFork(vm.envString("ETH_RPC_URL"), 18_500_000);

        target = IVulnerableProtocol(TARGET);
        attacker = makeAddr("attacker");

        // Fund attacker if needed
        deal(TOKEN, attacker, 1 ether);
    }

    function test_exploit() public {
        // Step 1: Record state before exploit
        uint256 balanceBefore = IERC20(TOKEN).balanceOf(attacker);

        // Step 2: Execute exploit as attacker
        vm.startPrank(attacker);
        // ... exploit steps with comments explaining each action ...
        target.vulnerableFunction(1 ether);
        vm.stopPrank();

        // Step 3: Assert the vulnerability — verify unexpected state change
        uint256 balanceAfter = IERC20(TOKEN).balanceOf(attacker);
        assertGt(balanceAfter, balanceBefore, "Exploit: attacker gained tokens");
    }
}
```

**Run command:**
```bash
forge test --match-test test_exploit --fork-url $ETH_RPC_URL -vvv
```

**Fork test conventions:**
- Pin to a specific block number in `vm.createSelectFork` for reproducibility
- Use `vm.envString("ETH_RPC_URL")` so the maintainer supplies their own RPC
- Use `deal()` to set up attacker balances instead of impersonating whales
- Use `vm.startPrank` / `vm.stopPrank` to simulate attacker context
- Assert the exploit outcome with descriptive failure messages
- Include `-vvv` in the run command for full trace output

## Unit Test Template

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/VulnerableContract.sol";

contract ExploitTest is Test {
    VulnerableContract target;
    AttackContract attacker;

    function setUp() public {
        // Deploy vulnerable contract with minimal setup
        target = new VulnerableContract();

        // Seed initial state to reach vulnerable code path
        deal(address(target), 10 ether);

        // Deploy attacker contract if needed (e.g., for reentrancy)
        attacker = new AttackContract(address(target));
    }

    function test_exploit() public {
        // Step 1: Record pre-exploit state
        uint256 targetBalanceBefore = address(target).balance;

        // Step 2: Trigger the vulnerability
        attacker.attack{value: 1 ether}();

        // Step 3: Verify exploit outcome
        assertEq(address(target).balance, 0, "Exploit: vault fully drained");
        assertGt(address(attacker).balance, 1 ether, "Exploit: attacker profited");
    }
}

/// @notice Minimal attack contract demonstrating the exploit vector
contract AttackContract {
    VulnerableContract target;

    constructor(address _target) {
        target = VulnerableContract(_target);
    }

    function attack() external payable {
        target.withdraw(msg.value);
    }

    // Reentrancy callback
    receive() external payable {
        if (address(target).balance > 0) {
            target.withdraw(msg.value);
        }
    }
}
```

**Run command:**
```bash
forge test --match-test test_exploit -vvv
```

**Unit test conventions:**
- Deploy all contracts in `setUp()` — no external dependencies
- Use `deal()` to set balances, `vm.warp` for timestamps, `vm.roll` for block numbers
- If the exploit requires an attacker contract (reentrancy, callback-based attacks),
  define it in the same test file below the test
- Keep the attack contract minimal — only the logic needed to trigger the flaw
- Use descriptive assertion messages that state the exploit outcome

## General Foundry Conventions

- **Always include both `setUp()` and `test_*` functions.** Foundry discovers tests by the
  `test_` prefix.
- **Pin dependencies.** Specify the Solidity compiler version and Foundry version in comments
  or in `foundry.toml` configuration.
- **Use standard cheatcodes.** `vm.prank`, `vm.deal`, `vm.warp`, `vm.roll`, `vm.expectRevert`,
  `vm.expectEmit` — these are universally understood by Solidity auditors.
- **Log evidence.** Use `emit log_named_uint` or `console.log` for intermediate values that
  help maintainers understand the exploit flow.
- **One exploit per test function.** If demonstrating multiple attack vectors, use separate
  `test_` functions with descriptive names.

