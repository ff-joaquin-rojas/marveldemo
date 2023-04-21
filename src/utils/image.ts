import { Source } from "react-native-fast-image"

export interface ImageProps {
    extension: string,
    path: string,
}

export const getImageSource = (thumbnail: ImageProps | undefined) => {
    const imageSource: Source = {
        uri: `${thumbnail?.path?.replace('http', 'https')}.${thumbnail?.extension}`,
        priority: 'high',
    }
    return imageSource;
}