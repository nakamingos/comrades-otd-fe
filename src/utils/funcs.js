import { formatEther } from 'viem';

/**
 * Format Wei to ETH with specified decimals
 */
export const formatWeiToEth = (wei, decimals = 4) => {
  if (!wei) return '0';
  const eth = formatEther(BigInt(wei));
  const formatted = parseFloat(eth).toFixed(decimals);
  // Remove leading zero from decimal numbers (0.0100 -> .0100)
  return formatted.replace(/^0(?=\.)/, '');
};

/**
 * Truncate Ethereum address
 */
export const truncateAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Check if minting is active (not paused and supply available)
 */
export const canMint = (isPaused, remaining) => {
  return !isPaused && remaining > 0;
};

/**
 * Calculate total cost for minting
 */
export const calculateTotalCost = (mintAmount, mintPrice) => {
  return BigInt(mintAmount) * BigInt(mintPrice);
};
