import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>ABOUT COMRADES OF THE DEAD</h1>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>The Project</h2>
          <p>
            Comrades of the Dead is a collection of 666 unique Ethscriptions living on the Ethereum blockchain.
            Using the innovative Ethscriptions protocol, each COTD is permanently inscribed directly into
            Ethereum's transaction calldata, making them truly immutable and decentralized.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What are Ethscriptions?</h2>
          <p>
            Ethscriptions are a novel way of creating digital artifacts on Ethereum. Instead of using smart
            contract storage, Ethscriptions leverage transaction calldata to permanently store data on-chain.
            This approach offers several advantages:
          </p>
          <ul className={styles.featureList}>
            <li>✓ Truly decentralized - no reliance on external storage</li>
            <li>✓ Permanent and immutable</li>
            <li>✓ Cost-effective compared to traditional NFT storage</li>
            <li>✓ Direct integration with Ethereum's core protocol</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Mint Details</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <h3>Total Supply</h3>
              <p className={styles.highlight}>666</p>
            </div>
            <div className={styles.detailCard}>
              <h3>Mint Price</h3>
              <p className={styles.highlight}>0.0011 ETH</p>
            </div>
            <div className={styles.detailCard}>
              <h3>Wallet Limit</h3>
              <p className={styles.highlight}>13 per wallet</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Rise from the Grave</h2>
          <p>
            The Comrades have risen. Join the undead legion and secure your place in the eternal blockchain.
            Each COTD represents a unique comrade in this digital afterlife, forever preserved on Ethereum.
          </p>
        </section>
      </div>
    </div>
  );
}
