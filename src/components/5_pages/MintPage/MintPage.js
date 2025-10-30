import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import MintButton from '../../1_atoms/MintButton/MintButton';
import StatDisplay from '../../1_atoms/StatDisplay/StatDisplay';
import LoadingSpinner from '../../1_atoms/LoadingSpinner/LoadingSpinner';
import { useContractState, useMintCOTD } from '../../../hooks/useContractInteraction';
import { formatWeiToEth, formatNumber } from '../../../utils/funcs';
import { WALLET_LIMIT } from '../../../consts/consts';
import styles from './MintPage.module.css';

export default function MintPage() {
  const { address, isConnected } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    isPaused,
    remaining,
    mintPrice,
    minted,
    totalSupply,
  } = useContractState();

  const {
    mint,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error: mintError,
  } = useMintCOTD();

  useEffect(() => {
    if (isConfirmed) {
      setSuccessMessage(`Successfully minted ${mintAmount} COTD!`);
      setMintAmount(1);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [isConfirmed, mintAmount]);

  useEffect(() => {
    if (mintError) {
      setError(mintError.message || 'An error occurred during minting');
      setTimeout(() => setError(''), 5000);
    }
  }, [mintError]);

  const handleMint = async () => {
    if (!isConnected) {
      setError('Please connect your wallet');
      return;
    }

    if (isPaused) {
      setError('Minting is currently paused');
      return;
    }

    if (mintAmount < 1 || mintAmount > WALLET_LIMIT) {
      setError(`Mint amount must be between 1 and ${WALLET_LIMIT}`);
      return;
    }

    if (mintAmount > remaining) {
      setError(`Only ${remaining} COTD remaining`);
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      await mint(mintAmount, address, mintPrice);
    } catch (err) {
      console.error('Mint error:', err);
      setError(err.message || 'Failed to mint');
    }
  };

  const totalCost = mintPrice ? formatWeiToEth(BigInt(mintAmount) * BigInt(mintPrice), 4) : '0';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>COMRADES OF THE DEAD</h1>
        <p className={styles.subtitle}>Ethscriptions - Rise from the grave</p>
      </div>

      <div className={styles.statsGrid}>
        <StatDisplay label="Total Supply" value={formatNumber(totalSupply)} />
        <StatDisplay label="Minted" value={formatNumber(minted)} highlight />
        <StatDisplay label="Remaining" value={formatNumber(remaining)} />
        <StatDisplay label="Price" value={`${formatWeiToEth(mintPrice, 4)} ETH`} />
      </div>

      <div className={styles.mintCard}>
        <div className={styles.mintSection}>
          <h2>Mint Your COTD</h2>
          
          {isPaused && (
            <div className={styles.warningBox}>
              ⚠️ Minting is currently paused
            </div>
          )}

          {!isConnected ? (
            <div className={styles.connectPrompt}>
              <p>Connect your wallet to mint</p>
            </div>
          ) : (
            <>
              <div className={styles.amountSelector}>
                <label htmlFor="mintAmount">Amount to Mint (Max {WALLET_LIMIT} per wallet)</label>
                <div className={styles.inputGroup}>
                  <button
                    className={styles.adjustButton}
                    onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}
                    disabled={mintAmount <= 1 || isPending || isConfirming}
                  >
                    -
                  </button>
                  <input
                    id="mintAmount"
                    type="number"
                    min="1"
                    max={WALLET_LIMIT}
                    value={mintAmount}
                    onChange={(e) => setMintAmount(Math.min(WALLET_LIMIT, Math.max(1, parseInt(e.target.value) || 1)))}
                    className={styles.amountInput}
                    disabled={isPending || isConfirming}
                  />
                  <button
                    className={styles.adjustButton}
                    onClick={() => setMintAmount(Math.min(WALLET_LIMIT, mintAmount + 1))}
                    disabled={mintAmount >= WALLET_LIMIT || isPending || isConfirming}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.costDisplay}>
                <span>Total Cost:</span>
                <span className={styles.cost}>{totalCost} ETH</span>
              </div>

              {(isPending || isConfirming) && (
                <div className={styles.statusBox}>
                  <LoadingSpinner />
                  <p>{isPending ? 'Confirm transaction in wallet...' : 'Minting in progress...'}</p>
                </div>
              )}

              {error && (
                <div className={styles.errorBox}>
                  ❌ {error}
                </div>
              )}

              {successMessage && (
                <div className={styles.successBox}>
                  ✅ {successMessage}
                  {hash && (
                    <a
                      href={`https://etherscan.io/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.txLink}
                    >
                      View on Etherscan
                    </a>
                  )}
                </div>
              )}

              <MintButton
                onClick={handleMint}
                disabled={isPaused || remaining === 0 || isPending || isConfirming}
                loading={isPending || isConfirming}
              >
                {remaining === 0 ? 'Sold Out' : 'Mint COTD'}
              </MintButton>
            </>
          )}
        </div>
      </div>

      <div className={styles.infoSection}>
        <h3>What are Ethscriptions?</h3>
        <p>
          Ethscriptions are a new way of creating digital artifacts on Ethereum using transaction calldata.
          Each Comrades of the Dead NFT is permanently inscribed on the Ethereum blockchain.
        </p>
      </div>
    </div>
  );
}
