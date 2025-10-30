import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from './ConnectWallet.module.css';

export default function ConnectWallet() {
  return (
    <div className={styles.container}>
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button" className={styles.connectButton}>
                      Connect
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button" className={styles.connectButton}>
                      Wrong network
                    </button>
                  );
                }

                return (
                  <button onClick={openAccountModal} type="button" className={styles.connectButton}>
                    {account.displayName}
                  </button>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
