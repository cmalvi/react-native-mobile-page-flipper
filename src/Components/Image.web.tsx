import React from 'react';
import type { ImageProps } from 'react-native';
import Animated from 'react-native-reanimated';

const Image: React.FC<ImageProps> = (props) => {
    return <Animated.Image {...props} />;
};

export default Image;