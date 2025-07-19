export interface Token {
    currency: string;
    icon: string;
}

export interface TokenPrice extends Token {
    date: string;
    price: number;
}

export interface TokenBalance extends Token {
    total: number;
}

export interface Wallet {
    balance: TokenBalance[];
}

export interface Action {
    type: string;
    payload?: unknown;
}

export interface StoreState {
    tokensPrice: TokenPrice[];
    wallet: Wallet;
    loading: boolean;
    error: string | null;
}
export interface Store {
     state: StoreState;
     dispatch: React.Dispatch<Action>;
}