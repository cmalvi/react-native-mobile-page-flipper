export type Size = {
    height: number;
    width: number;
};

export type Page = {
    left: { index: number; content: string; totalPages: number };
    right: { index: number; content: string; totalPages: number };
};
