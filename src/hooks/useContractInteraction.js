import { useContractRead, useContractWrite, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { COTD_ABI } from '../web3/abis/cotdAbi';
import { CONTRACT_ADDRESS } from '../web3/addresses';

/**
 * Hook to read contract state
 */
export const useContractState = () => {
  const { data: isPaused } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: COTD_ABI,
    functionName: 'getPauseStatus',
  });

  const { data: nextTokenId } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: COTD_ABI,
    functionName: 'getNextTokenId',
  });

  const { data: remaining } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: COTD_ABI,
    functionName: 'getCOTDRemaining',
  });

  const { data: mintPrice } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: COTD_ABI,
    functionName: 'MINT_PRICE',
  });

  const { data: totalSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: COTD_ABI,
    functionName: 'COTD_LIMIT',
  });

  const { data: purchaseLimit } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: COTD_ABI,
    functionName: 'PURCHASE_LIMIT',
  });

  return {
    isPaused,
    nextTokenId: nextTokenId ? Number(nextTokenId) : 1,
    remaining: remaining ? Number(remaining) : 666,
    mintPrice: mintPrice ? mintPrice.toString() : '0',
    totalSupply: totalSupply ? Number(totalSupply) : 666,
    purchaseLimit: purchaseLimit ? Number(purchaseLimit) : 13,
    minted: nextTokenId ? Number(nextTokenId) - 1 : 0,
  };
};

/**
 * Hook to mint COTD
 */
export const useMintCOTD = () => {
  const { 
    writeContract, 
    data: hash, 
    isPending,
    error: writeError 
  } = useContractWrite();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({
    hash,
  });

  const mint = async (mintAmount, mintTo, mintPrice) => {
    const totalCost = BigInt(mintAmount) * BigInt(mintPrice);
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: COTD_ABI,
      functionName: 'mintCOTD',
      args: [mintAmount, mintTo],
      value: totalCost,
    });
  };

  return {
    mint,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error: writeError,
  };
};
