// Comrades of the Dead Contract ABI
// Only including the functions we need for the frontend
export const COTD_ABI = [
  {
    "inputs": [
      { "internalType": "uint8", "name": "mintAmount", "type": "uint8" },
      { "internalType": "address", "name": "mintTo", "type": "address" }
    ],
    "name": "mintCOTD",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPauseStatus",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNextTokenId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCOTDRemaining",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MINT_PRICE",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "COTD_LIMIT",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PURCHASE_LIMIT",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "minter", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "mintTo", "type": "address" },
      { "indexed": true, "internalType": "uint256", "name": "firstTokenId", "type": "uint256" },
      { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "EthscribeCOTD",
    "type": "event"
  }
];
