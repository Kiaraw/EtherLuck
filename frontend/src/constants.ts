export const LOTTERY_ADDRESS = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";
export const TOKEN_ADDRESS = "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1";

export const LOTTERY_ABI = [
  {
    "type": "constructor",
    "inputs": [
      { "name": "tokenAddress", "type": "address" },
      { "name": "initialTicketPrice", "type": "uint256" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "TicketPurchased",
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "buyer", "type": "address" },
      { "indexed": false, "name": "round", "type": "uint256" },
      { "indexed": false, "name": "amount", "type": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "WinnerPicked",
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "winner", "type": "address" },
      { "indexed": false, "name": "round", "type": "uint256" },
      { "indexed": false, "name": "prize", "type": "uint256" }
    ]
  },
  {
    "type": "function",
    "name": "enter",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "manager",
    "inputs": [],
    "outputs": [
      { "type": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pickWinner",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "players",
    "inputs": [
      { "type": "uint256" }
    ],
    "outputs": [
      { "type": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "round",
    "inputs": [],
    "outputs": [
      { "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ticketPrice",
    "inputs": [],
    "outputs": [
      { "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "token",
    "inputs": [],
    "outputs": [
      { "type": "address" }
    ],
    "stateMutability": "view"
  }
] as const;