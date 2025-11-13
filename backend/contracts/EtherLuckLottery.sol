// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract EtherLuckToken is IERC20 {
    string public name = "EtherLuck";
    string public symbol = "ELUCK";
    uint8 public decimals = 18;

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    constructor(uint256 initialSupply) {
        _mint(msg.sender, initialSupply);
    }

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external override returns (bool) {
        require(to != address(0), "ERC20: transfer to zero");
        require(_balances[msg.sender] >= amount, "ERC20: balance too low");
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external override returns (bool) {
        require(to != address(0), "ERC20: transfer to zero");
        require(_balances[from] >= amount, "ERC20: balance too low");
        require(_allowances[from][msg.sender] >= amount, "ERC20: allowance too low");
        _allowances[from][msg.sender] -= amount;
        _balances[from] -= amount;
        _balances[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to zero");
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }
}

contract Lottery {
    IERC20 public token;
    address public manager;
    uint256 public ticketPrice;
    address payable[] public players;
    uint256 public round;

    event TicketPurchased(address indexed buyer, uint256 round, uint256 amount);
    event WinnerPicked(address indexed winner, uint256 round, uint256 prize);

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager");
        _;
    }

    constructor(address tokenAddress, uint256 initialTicketPrice) {
        require(tokenAddress != address(0), "Token address zero");
        token = IERC20(tokenAddress);
        manager = msg.sender;
        ticketPrice = initialTicketPrice;
        round = 1;
    }

    // ------------------------------------------------------------
    // Internal function: selection du gagnant (méthode non modifiée)
    // ------------------------------------------------------------
    function _pickWinnerInternal() internal {
        require(players.length > 0, "No players");

        uint256 index = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.prevrandao))
        ) % players.length;

        address payable winner = players[index];
        uint256 prize = token.balanceOf(address(this));

        require(token.transfer(winner, prize), "Prize transfer failed");

        emit WinnerPicked(winner, round, prize);

        delete players;
        round++;
    }

    // ------------------------------------------------------------
    // Tirage manuel par le manager (identique à avant)
    // ------------------------------------------------------------
    function pickWinner() external onlyManager {
        _pickWinnerInternal();
    }

    // ------------------------------------------------------------
    // Entrée dans la loterie
    // + tirage automatique lorsque 3 joueurs
    // ------------------------------------------------------------
    function enter() external {
        require(
            token.transferFrom(msg.sender, address(this), ticketPrice),
            "Token transfer failed"
        );

        players.push(payable(msg.sender));
        emit TicketPurchased(msg.sender, round, ticketPrice);

        // 🎯 Tirage automatique quand il y a 3 joueurs
        if (players.length == 3) {
            _pickWinnerInternal();
        }
    }
}