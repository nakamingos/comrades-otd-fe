import styles from './TeamPage.module.css';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Team Member 1',
      role: 'Founder & Artist',
      description: 'Visionary behind the Comrades of the Dead project.',
      twitter: '#',
    },
    {
      name: 'Team Member 2',
      role: 'Developer',
      description: 'Smart contract and frontend development.',
      twitter: '#',
    },
    {
      name: 'Team Member 3',
      role: 'Community Manager',
      description: 'Building and managing the COTD community.',
      twitter: '#',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>THE TEAM</h1>
        <p className={styles.subtitle}>Meet the minds behind Comrades of the Dead</p>
      </div>

      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.memberCard}>
            <div className={styles.memberInfo}>
              <h2 className={styles.memberName}>{member.name}</h2>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberDescription}>{member.description}</p>
              {member.twitter && (
                <a 
                  href={member.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  Twitter →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.joinSection}>
        <h2>Join the Comrades</h2>
        <p>
          Interested in contributing to the project or joining our community? 
          Reach out to us on Discord or Twitter!
        </p>
      </div>
    </div>
  );
}
