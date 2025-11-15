// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EtherLuckLottery {
    IERC20 public immutable token;
    address public immutable manager;

    uint256 public ticketPrice;          // prix d'1 ticket en ELK (wei)
    uint256 public round;                // round courant (1, 2, 3, ...)
    uint256 public totalTicketsSold;     // nb total de tickets vendus pour le round courant

    // round => liste des "slots" de joueurs (1 entrée = 1 ticket)
    mapping(uint256 => address[]) private playersByRound;

    // round => joueur => nb de tickets achetés sur ce round
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

    // -----------------------------
    // VUES POUR LE FRONT
    // -----------------------------

    // Liste des joueurs pour un round donné (debug / stats)
    function getPlayers(uint256 r) external view returns (address[] memory) {
        return playersByRound[r];
    }

    // 🔹 Utilisé par ta page "Cagnotte" : tickets de l'utilisateur sur le round courant
    function ticketsBought(address user) external view returns (uint256) {
        return ticketsBoughtByRound[round][user];
    }

    // -----------------------------
    // LOGIQUE D'ACHAT
    // -----------------------------

    // Achat de N tickets en une fois
    function enter(uint256 numberOfTickets) external {
        require(ticketPrice > 0, "Ticket price not set");
        require(numberOfTickets > 0, "Invalid ticket count");

        uint256 totalCost = ticketPrice * numberOfTickets;

        // Paiement en tokens ELK
        bool ok = token.transferFrom(msg.sender, address(this), totalCost);
        require(ok, "Token transfer failed");

        // On ajoute 1 "slot" par ticket pour que le tirage soit pondéré
        for (uint256 i = 0; i < numberOfTickets; i++) {
            playersByRound[round].push(msg.sender);
        }

        // Comptage des tickets par joueur + global
        ticketsBoughtByRound[round][msg.sender] += numberOfTickets;
        totalTicketsSold += numberOfTickets;

        emit TicketPurchased(msg.sender, round, numberOfTickets);
    }

    // Admin : changer le prix du ticket
    function setTicketPrice(uint256 newPrice) external onlyManager {
        require(newPrice > 0, "Price must be > 0");
        ticketPrice = newPrice;
    }

    // -----------------------------
    // TIRAGE DU GAGNANT
    // -----------------------------
    function pickWinner() external onlyManager {
        address[] storage players = playersByRound[round];
        uint256 numPlayers = players.length;
        require(numPlayers > 0, "No players");

        uint256 prize = token.balanceOf(address(this));
        require(prize > 0, "No prize");

        // RNG ultra basique (ok pour projet scolaire / local)
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

        // Reset du round courant
        delete playersByRound[round];
        totalTicketsSold = 0; // on remet le compteur de tickets à zéro

        // ⚠️ On ne nettoie pas ticketsBoughtByRound[round] pour tous les joueurs
        // (trop cher en gas), mais ce n'est pas grave car on change de "round"
        // et toutes les lectures passent automatiquement sur le nouveau round.
        round += 1;
    }
}
