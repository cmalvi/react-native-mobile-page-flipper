import type { Page } from '../types';
import type { TransformsStyle } from 'react-native';

export const createPages = ({
    portrait,
    singleImageMode,
    data,
}: {
    portrait: boolean;
    singleImageMode: boolean;
    data: string[];
}) => {
    const allPages: Page[] = [];

    if (portrait) {
        if (!singleImageMode) {
            data.forEach((page, index) => {
                allPages.push({
                    left: {
                        index: index,
                        content: page,
                        totalPages: data.length,
                    },
                    right: {
                        index: index,
                        content: page,
                        totalPages: data.length,
                    },
                });
                allPages.push({
                    left: {
                        index: index,
                        content: page,
                        totalPages: data.length,
                    },
                    right: {
                        index: index,
                        content: page,
                        totalPages: data.length,
                    },
                });
            });
        } else {
            for (let i = 0; i < data.length; i++) {
                allPages[i] = {
                    left: {
                        index: i,
                        content: data[i],
                        totalPages: data.length,
                    },
                    right: {
                        index: i,
                        content: data[i],
                        totalPages: data.length,
                    },
                };
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            if (singleImageMode) {
                allPages.push({
                    left: {
                        index: i,
                        content: data[i],
                        totalPages: data.length,
                    },
                    right: {
                        index: i + 1,
                        content: data[i + 1],
                        totalPages: data.length,
                    },
                });
                i++;
            } else {
                allPages.push({
                    left: {
                        index: i,
                        content: data[i],
                        totalPages: data.length,
                    },
                    right: {
                        index: i,
                        content: data[i],
                        totalPages: data.length,
                    },
                });
            }
        }
    }
    return allPages;
};

type RNTransform = Exclude<TransformsStyle['transform'], undefined>;

export const transformOrigin = (
    { x, y }: { x: number; y: number }
    // transformations: RNTransform
): RNTransform => {
    'worklet';
    return [
        { translateX: x },
        { translateY: y },
        { translateX: -x },
        { translateY: -y },
    ];
};

export const snapPoint = (
    value: number,
    velocity: number,
    points: ReadonlyArray<number>
): number => {
    'worklet';

    const point = value + 0.25 * velocity;
    const deltas = points.map((p) => Math.abs(point - p));
    const minDelta = Math.min.apply(null, deltas);
    return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};

export function clamp(number: number, min: number, max: number) {
    'worklet';
    return Math.max(min, Math.min(number, max));
}

export const splitTextForPage = (
    story: string,
    linesFirstPage: number,
    linesPerPage: number,
    maxWidth: number,
    _font: string,
    fontSize: number
): string[] => {
    const words = story.split(' ');
    let pages: string[] = [];
    let currentLine = '';
    let currentPage = '';
    let linesCount = 0;
    let isFirstPage = true;

    const measureTextWidth = (text: string): number => {
        const averageCharWidth = 0.5 * fontSize; // Approssimazione della larghezza media dei caratteri
        return text.length * averageCharWidth;
    };

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (currentLine !== '') {
            currentLine += ' ';
        }
        currentLine += word;

        if (measureTextWidth(currentLine) > maxWidth) {
            if (currentLine.trim() === word) {
                // Se la parola stessa supera la larghezza massima, iniziare una nuova riga con essa
                currentPage += currentLine.trim() + '\n';
                currentLine = '';
                linesCount++;
            } else {
                // Altrimenti, rimuovere l'ultima parola dalla linea corrente e aggiungerla a una nuova linea
                currentLine = currentLine
                    .trimEnd()
                    .substring(0, currentLine.lastIndexOf(' '));
                currentPage += currentLine + '\n';
                currentLine = word;
                linesCount++;
            }
        }

        if (
            (isFirstPage && linesCount >= linesFirstPage) ||
            (!isFirstPage && linesCount >= linesPerPage)
        ) {
            pages.push(currentPage.trim());
            currentPage = '';
            linesCount = 0;
            isFirstPage = false;
        }
    }

    if (currentLine.trim() !== '') {
        currentPage += currentLine.trim() + '\n';
    }

    if (currentPage.trim() !== '') {
        pages.push(currentPage.trim());
    }

    return pages;
};
