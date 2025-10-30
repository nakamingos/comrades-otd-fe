import { useState, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';
import MintButton from '../../1_atoms/MintButton/MintButton';
import StatDisplay from '../../1_atoms/StatDisplay/StatDisplay';
import LoadingSpinner from '../../1_atoms/LoadingSpinner/LoadingSpinner';
import ConnectWallet from '../../2_molecules/ConnectWallet/ConnectWallet';
import { useContractState, useMintCOTD } from '../../../hooks/useContractInteraction';
import { formatWeiToEth, formatNumber } from '../../../utils/funcs';
import { WALLET_LIMIT } from '../../../consts/consts';
import styles from './MintPage.module.css';

export default function MintPage() {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Rug or Treat button state
  const [rugTreatVisible, setRugTreatVisible] = useState(true);
  const [rugTreatPosition, setRugTreatPosition] = useState(() => {
    // Smart initial positioning based on screen aspect ratio
    if (typeof window !== 'undefined') {
      const aspectRatio = window.innerWidth / window.innerHeight;
      if (aspectRatio > 1.8) {
        // Ultra-wide: position in bottom area to avoid text
        return { x: 25, y: 90 };
      } else if (aspectRatio > 1.4) {
        // Widescreen: position lower and more to the side
        return { x: 35, y: 88 };
      }
    }
    // Default for mobile/tablet
    return { x: 50, y: 85 };
  });
  const [rugTreatClickCount, setRugTreatClickCount] = useState(0);
  const [isRunningAway, setIsRunningAway] = useState(false);
  const [isPanicking, setIsPanicking] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(true);
  const rugTreatRef = useRef(null);
  const mouseTimeoutRef = useRef(null);
  const panicTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);

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
      setSuccessMessage('Successfully minted 1 COTD!');
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (mintError) {
      setError(mintError.message || 'An error occurred during minting');
      setTimeout(() => setError(''), 5000);
    }
  }, [mintError]);

  // Scroll prevention functions
  const preventScroll = (e) => {
    if (scrollLocked) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  const preventKeyScroll = (e) => {
    if (scrollLocked) {
      // Prevent arrow keys, page up/down, home/end, space bar
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      if (scrollKeys.includes(e.keyCode)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  };

  // Rug or Treat button functions
  const getRandomPosition = () => {
    if (typeof window !== 'undefined') {
      const aspectRatio = window.innerWidth / window.innerHeight;
      
      if (aspectRatio > 1.8) {
        // Ultra-wide: avoid center area where text is, prefer corners and bottom
        const positions = [
          { x: Math.random() * 25 + 10, y: Math.random() * 40 + 50 }, // Bottom left
          { x: Math.random() * 25 + 65, y: Math.random() * 40 + 50 }, // Bottom right  
          { x: Math.random() * 20 + 10, y: Math.random() * 30 + 20 }, // Top left
          { x: Math.random() * 20 + 70, y: Math.random() * 30 + 20 }, // Top right
        ];
        return positions[Math.floor(Math.random() * positions.length)];
      } else if (aspectRatio > 1.4) {
        // Widescreen: avoid center, prefer sides and bottom
        const avoidCenter = Math.random() > 0.6;
        if (avoidCenter) {
          return {
            x: Math.random() > 0.5 ? Math.random() * 30 + 10 : Math.random() * 30 + 60,
            y: Math.random() * 50 + 35
          };
        }
      }
    }
    
    // Default random positioning for mobile/tablet
    return {
      x: Math.random() * 80 + 10, // 10% to 90% to avoid edges
      y: Math.random() * 60 + 25  // 25% to 85% to stay in visible area
    };
  };

  const handleRugTreatClick = () => {
    const newClickCount = rugTreatClickCount + 1;
    setRugTreatClickCount(newClickCount);

    if (newClickCount >= 4) {
      // Final click - unlock scroll, scroll to bottom and hide forever
      setScrollLocked(false);
      setRugTreatVisible(false);
      
      setTimeout(() => {
        const tableSection = document.querySelector('#stats-section');
        if (tableSection) {
          tableSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // Make button disappear and reappear at random position
    setRugTreatVisible(false);
    
    setTimeout(() => {
      setRugTreatPosition(getRandomPosition());
      setRugTreatVisible(true);
      
      // Start running away from mouse after appearing
      if (newClickCount >= 2) {
        setIsRunningAway(true);
        
        // Stop running away after 5 seconds
        mouseTimeoutRef.current = setTimeout(() => {
          setIsRunningAway(false);
        }, 5000);
      }
    }, 300);
  };



  useEffect(() => {
    let lastMousePos = { x: 0, y: 0 };
    
    const updateMousePos = (e) => {
      lastMousePos.x = e.clientX;
      lastMousePos.y = e.clientY;
    };
    
    const magneticUpdate = () => {
      if (isRunningAway && rugTreatRef.current) {
        const rect = rugTreatRef.current.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        
        const deltaX = buttonCenterX - lastMousePos.x;
        const deltaY = buttonCenterY - lastMousePos.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        const magneticField = 200;
        const maxDistance = 300;
        
        if (distance < maxDistance && distance > 0) {
          if (distance < 120 && !isPanicking) {
            setIsPanicking(true);
            if (panicTimeoutRef.current) clearTimeout(panicTimeoutRef.current);
            panicTimeoutRef.current = setTimeout(() => setIsPanicking(false), 400);
          }
          
          const containerRect = document.querySelector(`.${styles.container}`).getBoundingClientRect();
          
          // Smooth magnetic repulsion
          const forceStrength = Math.min(magneticField / (distance * distance) * 8000, 150);
          const repulsionX = (deltaX / distance) * forceStrength;
          const repulsionY = (deltaY / distance) * forceStrength;
          
          const currentButtonX = (rugTreatPosition.x / 100) * containerRect.width + containerRect.left;
          const currentButtonY = (rugTreatPosition.y / 100) * containerRect.height + containerRect.top;
          
          let newButtonX = currentButtonX + repulsionX;
          let newButtonY = currentButtonY + repulsionY;
          
          // Wall repulsion
          const wallForce = 40;
          const wallBuffer = 80;
          
          const leftWall = containerRect.left + wallBuffer;
          const rightWall = containerRect.right - wallBuffer;
          const topWall = containerRect.top + wallBuffer;
          const bottomWall = containerRect.bottom - wallBuffer;
          
          if (newButtonX < leftWall) {
            newButtonX += wallForce * (leftWall - newButtonX) / wallBuffer;
          } else if (newButtonX > rightWall) {
            newButtonX -= wallForce * (newButtonX - rightWall) / wallBuffer;
          }
          
          if (newButtonY < topWall) {
            newButtonY += wallForce * (topWall - newButtonY) / wallBuffer;
          } else if (newButtonY > bottomWall) {
            newButtonY -= wallForce * (newButtonY - bottomWall) / wallBuffer;
          }
          
          let newX = ((newButtonX - containerRect.left) / containerRect.width) * 100;
          let newY = ((newButtonY - containerRect.top) / containerRect.height) * 100;
          
          newX = Math.max(10, Math.min(90, newX));
          newY = Math.max(20, Math.min(80, newY));
          
          setRugTreatPosition({ x: newX, y: newY });
        }
      }
      
      if (isRunningAway) {
        animationFrameRef.current = requestAnimationFrame(magneticUpdate);
      }
    };

    if (isRunningAway) {
      document.addEventListener('mousemove', updateMousePos);
      magneticUpdate();
      
      return () => {
        document.removeEventListener('mousemove', updateMousePos);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (mouseTimeoutRef.current) {
          clearTimeout(mouseTimeoutRef.current);
        }
        if (panicTimeoutRef.current) {
          clearTimeout(panicTimeoutRef.current);
        }
      };
    }
  }, [isRunningAway, rugTreatPosition.x, rugTreatPosition.y, isPanicking]);

  // Scroll lock effect
  useEffect(() => {
    if (scrollLocked) {
      // Prevent scrolling with wheel, touch, and keys
      const scrollEvents = ['wheel', 'touchmove', 'scroll'];
      
      scrollEvents.forEach(event => {
        document.addEventListener(event, preventScroll, { passive: false });
      });
      
      document.addEventListener('keydown', preventKeyScroll);
      
      // Prevent scrollbar dragging
      document.body.style.overflow = 'hidden';
      
      return () => {
        scrollEvents.forEach(event => {
          document.removeEventListener(event, preventScroll);
        });
        document.removeEventListener('keydown', preventKeyScroll);
        document.body.style.overflow = '';
      };
    }
  }, [scrollLocked]);

  const handleMint = async () => {
    if (!isConnected) {
      setError('Please connect your wallet');
      return;
    }

    if (isPaused) {
      setError('Minting is currently paused');
      return;
    }

    if (remaining === 0) {
      setError('No COTD remaining');
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      await mint(1, address, mintPrice);
    } catch (err) {
      console.error('Mint error:', err);
      setError(err.message || 'Failed to mint');
    }
  };

  const totalCost = mintPrice ? formatWeiToEth(BigInt(1) * BigInt(mintPrice), 4) : '0';

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.logoOverlay}>
          <a href="https://nomorelabs.xyz" target="_blank" rel="noopener noreferrer">
            <h1>NoMoreLabs</h1>
          </a>
        </div>
        <div className={styles.connectOverlay}>
          <ConnectWallet />
        </div>
        <img 
          src="/comrades-header.png" 
          alt="Comrades of the Dead" 
          className={styles.bannerImage}
        />
        <div className={styles.bannerOverlay}></div>
        
        {/* Rug or Treat Button */}
        {rugTreatVisible && (
          <button
            ref={rugTreatRef}
            className={`${styles.rugTreatButton} ${isPanicking ? styles.panicking : ''}`}
            style={{
              left: `${rugTreatPosition.x}%`,
              top: `${rugTreatPosition.y}%`,
            }}
            onClick={handleRugTreatClick}
          >
            Rug or Treat?
          </button>
        )}
      </div>

      <div className={styles.content} id="stats-section">
        <div className={styles.statsGrid}>
        <StatDisplay label="Supply" value={`${formatNumber(minted)} / ${formatNumber(totalSupply)}`} highlight />
        <StatDisplay label="Price" value={`${formatWeiToEth(mintPrice, 4)} ETH`} />
      </div>

      <div className={styles.mintCard}>
        <div className={styles.mintSection}>
          <h2>
            COLLECT YOUR HOARD<br />
            HOARD YOUR COLLECTION
          </h2>
          
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

              <div className={styles.buttonContainer}>
                <MintButton
                  onClick={handleMint}
                  disabled={isPaused || remaining === 0 || isPending || isConfirming}
                  loading={isPending || isConfirming}
                >
                  {remaining === 0 ? 'Sold Out' : 'INSCRIBE OR DIE'}
                </MintButton>
              </div>
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
    </div>
  );
}
