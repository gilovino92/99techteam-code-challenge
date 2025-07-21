# Problem 3: Messy React

This component demonstrates common TypeScript/React code issues and their solutions through a comprehensive refactoring guide.

## Overview

The `ProblemThreeSolution` component showcases 6 major problems commonly found in TypeScript React applications and provides refactored solutions for each.
**Visual Indicators**: Uses emojis to highlight different types of issues:
   - ❌ Critical errors
   - ⚠️ Warnings/improvements

## Problems Addressed

### Problem 1: Interface Design Issues

**Original Problem:**
- Duplicate properties across interfaces
- Empty interfaces
```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance {
  // ⚠️ FormattedWalletBalance could be extended from WalletBalance
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {
  // ❌ Empty interface
}
```


**Solution:**
- Use interface extension (`extends`) to avoid duplication
- Proper interface hierarchy
- Empty interfaces are directly equal to BoxProps.

```typescript
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type WalletPageProps = BoxProps;
```

### Problem 2: Component Props Destructuring

**Original Problem:**
- Inefficient props handling
- Unnecessary intermediate destructuring
- Verbose parameter declarations

```typescript
const WalletPage: React.FC<Props> = (props: Props) => {
  // ⚠️ props can be destructured into children and rest props
  const { children, ...rest } = props; // ⚠️ This line can be removed to use spread operator to extract children and rest props on parameters
  ...
}
```

**Solution:**
- Direct parameter destructuring
- Cleaner component signatures
- Better performance through reduced operations

```typescript
const WalletPage: React.FC<Props> = ({children, ...rest}: Props) => {
  ...
}
```

### Problem 3: Type Safety Issues

**Original Problem:**
- Using `any` type defeats TypeScript's purpose
- Missing type definitions for critical parameters
- No compile-time type checking

```typescript
const getPriority = (blockchain: any): number => {
  // ❌ blockchain should be defined as Blockchain type which has type as string and these values - 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};
```

**Solution:**
- Define proper union types
- Strong typing for all parameters
- Compile-time error prevention

```typescript
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo'

const getPriority = (blockchain: Blockchain): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};
```

### Problem 4: Logic and Dependency Issues

**Original Problem:**
- Unused variables
- Missing properties in interfaces
- Undefined variables
- Incorrect filtering logic
- Missing return statements in comparisons
- Unnecessary dependencies in `useMemo`

```typescript
const sortedBalances = useMemo(() => {
  return balances
    .filter((balance: WalletBalance) => {
      // ❌ 'balancePriority' is declared but its value is never read
      const balancePriority = getPriority(balance.blockchain); // ❌ the blockchain property not exist in WalletBalance,
      
      if (lhsPriority > -99) { // ❌ lhsPriority is undefined
        // ❌ Wrong logic - should be balance.amount > 0 in order to filter out non-positive balances
        if (balance.amount <= 0) {
          return true; // ⚠️ return combined conditions for better code readability
        }
      }
      return false;
    })
    .sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain); // ❌ the blockchain property not exist in WalletBalance
      const rightPriority = getPriority(rhs.blockchain); // ❌ the blockchain property not exist in WalletBalance
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
      // ❌  missing return 0 when leftPriority === rightPriority
    });
}, [balances, prices]); // ❌ prices is not needed as dependency it is not used in the function
```

**Solution:**
- Clean up unused variables
- Add missing interface properties
- Fix undefined variable references
- Correct filtering logic
- Complete comparison functions
- Optimize dependency arrays

```typescript
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo'

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

const sortedBalances = useMemo(() => {
  return balances
    .filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount > 0;
    })
    .sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
      return 0;
    });
}, [balances]);
```

### Problem 5: Performance Optimization

**Original Problem:**
- Missing memoization for expensive operations
- Unnecessary re-computations on every render

```typescript
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  // ⚠️ use useMemo hook to memoize the result of this map - performance optimization
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
  };
});
```

**Solution:**
- Wrap expensive operations in `useMemo`
- Proper dependency management
- Performance optimization

```typescript
const formattedBalances = useMemo(() => sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
  };
}), [sortedBalances]);
```

### Problem 6: Component Rendering Issues

**Original Problem:**
- Using wrong data source for rendering
- Index as React keys (anti-pattern)
- Missing null checks
- Undefined variable references
- No fallback for empty states
- Missing error boundaries

```typescript
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

  const rows = sortedBalances.map(
    // ❌  sortedBalances should be formattedBalances.
    // ⚠️ Use useMemo with dependencies as [formattedBalances, prices] hook to memoize the result of this map - performance optimization
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount; // ❌ Need to check whether prices[balance.currency] is undefined or not
      return (
        <WalletRow
          className={classes.row} // ❌  classes is not defined
          key={index} // ⚠️ Using index as key is not recommended as items could be re-rendered everytime if an item is inserted, deleted, or if the array gets reordered.
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted} // ❌  formatted doesn't exist in type WalletBalance
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>; //  ⚠️ missing fallback rendering for empty rows.
};
```

**Solution:**
- Use correct data sources
- Proper unique keys for React elements
- Null safety with optional chaining
- Proper variable definitions
- Fallback UI for empty states
- Error handling

```typescript
const WalletPage: React.FC<Props> = ({children, ...rest}: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();
  
  const rows = useMemo(() => {
    if(!balances || !balances.length) {
      return [];
    }
    return formattedBalances.map(
      (balance: FormattedWalletBalance, index: number) => {
        const usdValue = (prices[balance.currency] ?? 0) * balance.amount; 
        return (
          <WalletRow
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      }
    );
  }, [formattedBalances, prices]);

  return (
    <>
      { !!rows.length && <div {...rest}>{rows}</div>}
      { !rows.length && <div  {...rest}>No balances to show</div>}
    </>
  )
};
```

## Technical Implementation

### Dependencies

```json
{
  "react": "^18.x",
  "react-syntax-highlighter": "^15.x"
}
```

### Component Structure

```typescript
export default function ProblemThreeSolution() {
  const options = {
    language: "typescript",
    style: atomOneDark,
    wrapLongLines: true,
    customStyle: {
      borderRadius: "0.5rem",
      fontSize: "14px",
      padding: "1rem",
      backgroundColor: "#151B23",
    },
  };
  // ... component implementation
}
```

