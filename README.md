# Comrades of the Dead - Frontend

A Next.js frontend for the Comrades of the Dead Ethscriptions project.

## Features

- 🎨 Dark/spooky themed UI with green terminal aesthetics
- 💀 Mint interface for COTD Ethscriptions
- 🔗 Multi-wallet support via RainbowKit (MetaMask, WalletConnect, etc.)
- 📊 Real-time contract state tracking (supply, minted count, price)
- 📱 Responsive design for mobile and desktop
- ⚡ Built with Next.js 14, React 18, wagmi v2, and viem

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

3. Update the `.env.local` file with your configuration:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

To get a WalletConnect Project ID:
- Go to https://cloud.walletconnect.com
- Create a new project
- Copy the Project ID

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
comrades-otd-fe/
├── pages/              # Next.js pages
│   ├── _app.js        # App wrapper with providers
│   ├── _document.js   # Custom document
│   ├── index.js       # Home/Mint page
│   ├── about/         # About page
│   └── team/          # Team page
├── src/
│   ├── components/
│   │   ├── 1_atoms/   # Basic components (buttons, inputs)
│   │   ├── 2_molecules/ # Composite components
│   │   ├── 3_organisms/ # Complex components (navbar)
│   │   ├── 4_layouts/ # Layout components
│   │   └── 5_pages/   # Page components
│   ├── consts/        # Constants and configuration
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── web3/          # Web3 configuration, ABIs, addresses
├── styles/            # Global styles
└── public/            # Static assets

```

## Configuration

### Contract Configuration

Update the contract address and ABI in:
- `src/web3/addresses.js` - Contract address
- `src/web3/abis/cotdAbi.js` - Contract ABI

### Constants

Update project details in `src/consts/consts.js`:
- Social links (Twitter, Discord, Etherscan)
- Project metadata
- Mint configuration

### Styling

The project uses a dark/terminal theme with CSS modules. Main theme variables are in `styles/globals.css`:
- Primary background: `#0a0a0a`
- Text color: `#00FF22` (green)
- Accent: `#ff0000` (red)

## Smart Contract Integration

The frontend integrates with the ComradesOTD smart contract:
- `mintCOTD(uint8 mintAmount, address mintTo)` - Main minting function
- View functions for contract state (paused status, remaining supply, etc.)

## Building for Production

```bash
npm run build
npm start
```

## Deployment

The app can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

For Vercel:
```bash
vercel
```

## Customization

### Team Members

Edit team members in `src/components/5_pages/TeamPage/TeamPage.js`

### About Content

Edit project information in `src/components/5_pages/AboutPage/AboutPage.js`

### Colors & Theme

Modify CSS variables in `styles/globals.css` to change the color scheme

## License

MIT
