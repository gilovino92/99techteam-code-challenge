# Problem 2: Fancy Form

A React-based cryptocurrency token swap application built with TypeScript, featuring real-time token prices, wallet balance management, and token exchange functionality.

## Overview

This project demonstrates a complete token swap interface similar to decentralized exchange (DEX) applications. Users can view token prices, check wallet balances, and perform token swaps with real-time calculations and validations.

## Project Structure

```
problem2/
├── components/           # React components
│   ├── Select.tsx       # Generic select component
│   ├── SwapToken.tsx    # Main swap interface
│   ├── TokenBalance.tsx # Wallet balance display
│   ├── TokenItem.tsx    # Individual token display
│   ├── TokenSelect.tsx  # Token selection modal
│   └── Wallet.tsx       # Wallet component
├── httpClient/          # API services
│   └── token.service.ts # Token data fetching
├── provider/            # React context providers
│   └── StoreProvider.tsx # Global state provider
├── store/               # State management
│   └── useStore.ts      # Custom hook for state
├── types/               # TypeScript definitions
│   └── token.type.ts    # Token-related types
├── ui-components/       # Reusable UI components
│   └── Modal.tsx        # Modal component
└── utils/               # Utility functions
    └── currencyFormat.ts # Currency formatting
```

## Key Features

### Token Swapping
- **Bidirectional Exchange**: Swap between any supported tokens
- **Real-time Calculations**: Automatic conversion based on current prices
- **Switch Functionality**: Quick token pair reversal
- **Balance Validation**: Prevents swaps exceeding available balance

### Wallet Management
- **Balance Tracking**: Real-time wallet balance display
- **Multi-token Support**: Handles multiple cryptocurrency tokens
- **Balance Updates**: Automatic balance updates after swaps
- **Insufficient Balance Warnings**: User-friendly error handling

### Price Integration
- **Live Price Data**: Fetches real-time token prices from external API
- **Price History**: Uses latest available price data
- **Currency Formatting**: Proper decimal and currency display
- **Icon Integration**: Token logos from external CDN

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Modal Interfaces**: Clean token selection modals
- **Loading States**: User feedback during API calls
- **Error Handling**: Comprehensive error messages

## Technical Implementation

### State Management

**Context + Reducer Pattern**:
```typescript
interface StoreState {
  tokensPrice: TokenPrice[];
  wallet: Wallet;
  loading: boolean;
  error: string | null;
}
```

**Actions Supported**:
- `SET_TOKENS_PRICE`: Update token price data
- `SET_WALLET_BALANCE`: Update wallet balances
- `SWAP_TOKEN`: Execute token swap transaction
- `SET_LOADING`: Manage loading states
- `SET_ERROR`: Handle error states

### Data Types

**Core Interfaces**:
```typescript
interface Token {
  currency: string;
  icon: string;
}

interface TokenPrice extends Token {
  date: string;
  price: number;
}

interface TokenBalance extends Token {
  total: number;
}

interface SwapPayload {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
}
```

### API Integration

**Token Service Features**:
- Fetches live token prices from external API
- Handles token icon URLs dynamically
- Provides mock wallet balance data
- Implements error handling for network requests

**Environment Variables**:
- `VITE_TOKEN_PRICE_URL`: API endpoint for token prices
- `VITE_TOKEN_ICON_URL`: CDN base URL for token icons

## Component Architecture

### SwapToken (Main Component)
- **Purpose**: Core swap interface with input fields and controls
- **Features**: Amount input, token selection, swap execution
- **State**: Manages from/to tokens and amounts
- **Validations**: Balance checks, amount validations

### TokenSelect (Modal)
- **Purpose**: Token selection interface
- **Features**: Searchable token list, balance display
- **Integration**: Updates parent component state

### TokenBalance
- **Purpose**: Displays wallet balance for selected tokens
- **Features**: Real-time balance updates, currency formatting

### Modal (UI Component)
- **Purpose**: Reusable modal wrapper
- **Features**: Overlay, close functionality, responsive design

## Key Algorithms

### Price Calculation
```typescript
// Convert from amount to to amount based on token prices
const exchangeRate = fromPrice && toPrice ? fromPrice / toPrice : 0;
const toAmount = (values.float || 0) * exchangeRate
const fromAmount = (values.float || 0) / exchangeRate;
```

## Dependencies

### Core Dependencies
- **React**: UI framework with hooks
- **TypeScript**: Type safety and development experience
- **react-currency-input-field**: Formatted currency input

### Development Tools
- **Vite**: Build tool and development server
- **ESLint**: Code linting and formatting

## Usage Examples

### Basic Token Swap
1. Select source token (e.g., USDC)
2. Enter amount to swap
3. Select destination token (e.g., ETH)
4. Review calculated exchange amount
5. Execute swap (if sufficient balance)

### Token Selection
1. Click token selector button
2. Browse available tokens in modal
3. View token balances and prices
4. Select desired token

## Error Handling

### Validation Scenarios
- **Insufficient Balance**: Prevents swaps exceeding wallet balance
- **Invalid Amounts**: Handles non-numeric or negative inputs
- **Network Errors**: Graceful handling of API failures
- **Missing Token Data**: Fallback for incomplete token information

## Performance Optimizations

### React Optimizations
- **useMemo**: Expensive calculations cached
- **useCallback**: Event handlers optimized
- **Conditional Rendering**: Efficient UI updates

### Data Management
- **Latest Price Logic**: Filters to most recent price data
- **Efficient State Updates**: Minimal re-renders
- **Lazy Loading**: Components loaded as needed

## Development Setup

### Environment Setup
1. Configure environment variables for API endpoints
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Access application at `http://localhost:5173`

### API Configuration
Ensure the following environment variables are set:
```env
VITE_TOKEN_PRICE_URL=https://api.example.com/prices
VITE_TOKEN_ICON_URL=https://cdn.example.com/icons
```

## License

This project is part of the 99techteam code challenge and serves as a demonstration of modern React development practices with TypeScript.