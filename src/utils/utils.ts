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
            data.forEach((page) => {
                allPages.push({
                    left: page,
                    right: page,
                });
                allPages.push({
                    left: page,
                    right: page,
                });
            });
        } else {
            for (let i = 0; i < data.length; i++) {
                allPages[i] = {
                    left: data[i],
                    right: data[i],
                };
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            if (singleImageMode) {
                allPages.push({
                    left: data[i],
                    right: data[i + 1],
                });
                i++;
            } else {
                allPages.push({
                    left: data[i],
                    right: data[i],
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

export function splitTextForPage(
    text: string,
    firstPageMaxCharacters: number = 500,
    maxCharacters: number = 800
): string[] {
    const words = text.split(' ');
    const pages: string[] = [];
    let currentPage = '';
    words.forEach((word) => {
        if (
            currentPage.length + word.length + 1 <=
            (pages.length === 0 ? firstPageMaxCharacters : maxCharacters)
        ) {
            if (currentPage) {
                currentPage += ' ';
            }
            currentPage += word;
        } else {
            pages.push(currentPage);
            currentPage = word;
        }
    });
    // Add last page
    if (currentPage) {
        pages.push(currentPage);
    }
    return pages;
}
