// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Lottery {
    IERC20 public immutable token;
    address public immutable manager;

    uint256 public ticketPrice;      // prix d'1 ticket en ELK (en wei)
    uint256 public round;            // numéro de la loterie en cours

    // round => liste des joueurs de ce round
    mapping(uint256 => address[]) private playersByRound;

    // round => joueur => nombre de tickets achetés
    mapping(uint256 => mapping(address => uint256)) public ticketsBoughtByRound;

    event TicketPurchased(
        address indexed buyer,
        uint256 indexed round,
        uint256 amount
    );

    event WinnerPicked(
        address indexed winner,
        uint256 indexed round,
        uint256 prize
    );

    constructor(address tokenAddress, uint256 initialTicketPrice) {
        require(tokenAddress != address(0), "Invalid token");
        require(initialTicketPrice > 0, "Ticket price must be > 0");

        token = IERC20(tokenAddress);
        manager = msg.sender;
        ticketPrice = initialTicketPrice;
        round = 1;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager");
        _;
    }

    // Liste des joueurs pour un round donné (pour debug / stats)
    function getPlayers(uint256 r) external view returns (address[] memory) {
        return playersByRound[r];
    }

    // Achat d'UN ticket (ton front multiplie le nombre d'achats via plusieurs calls si besoin)
    function enter() external {
        require(ticketPrice > 0, "Ticket price not set");

        // Transfer ELK du joueur vers le contrat
        bool ok = token.transferFrom(msg.sender, address(this), ticketPrice);
        require(ok, "Token transfer failed");

        // On enregistre le joueur et le ticket
        playersByRound[round].push(msg.sender);
        ticketsBoughtByRound[round][msg.sender] += 1;

        emit TicketPurchased(msg.sender, round, 1);
    }

    // Admin : changer le prix du ticket si besoin
    function setTicketPrice(uint256 newPrice) external onlyManager {
        require(newPrice > 0, "Price must be > 0");
        ticketPrice = newPrice;
    }

    // Admin : tirer un gagnant et lui envoyer toute la cagnotte
    function pickWinner() external onlyManager {
        address[] storage players = playersByRound[round];
        uint256 numPlayers = players.length;
        require(numPlayers > 0, "No players");

        uint256 prize = token.balanceOf(address(this));
        require(prize > 0, "No prize");

        // RNG débile mais suffisant pour projet scolaire / local
        uint256 random = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    numPlayers,
                    prize
                )
            )
        );

        uint256 winnerIndex = random % numPlayers;
        address winner = players[winnerIndex];

        bool ok = token.transfer(winner, prize);
        require(ok, "Prize transfer failed");

        emit WinnerPicked(winner, round, prize);

        // On passe au round suivant, on efface les joueurs du round précédent
        delete playersByRound[round];
        round += 1;
    }
}
