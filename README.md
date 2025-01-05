Forked from https://github.com/chris24elias/react-native-page-flipper to remove expo dependency and add new features like text paging

This package allows you to use a cool page curl effect on your React Native apps, it works on Android, iOS.

## Installation

```sh
yarn add react-native-mobile-page-flipper
```

In order for this package to work properly, its built using react-native-gesture-handler,react-native-linear-gradient, and react-native-reanimated. So make sure you also have these installed,

```sh
yarn add react-native-gesture-handler react-native-linear-gradient react-native-reanimated
```

Notes:
react-native-linear-gradient is used for the shadows on iOS and Android.
in order to avoid page flickering with images, use react-native-fast-image as your image component, and preload the image files
or use `defaultSource` instead of `source` when providing images


### Landscape

![Jul-18-2022 13-58-29](https://user-images.githubusercontent.com/40448652/179574654-818e6b5d-a7d5-47a9-99ba-022ddc555ec7.gif)

### Landscape w/ singleImageMode

![Jul-18-2022 13-59-32](https://user-images.githubusercontent.com/40448652/179574828-9d8d3766-617f-4203-be0f-480eef57df1b.gif)

### Portrait

<img alt="example" src="https://user-images.githubusercontent.com/40448652/179574506-b47b3c86-8ba5-4a33-a718-f451e13d53a1.gif" width="400">

## Usage

```
import PageFlipper from 'react-native-page-flipper';

const App = () => {
    return (
      <PageFlipper
        type="image"
        data={[
            'https://up.mangadudes.com/bleach/18/bleach-9337-e60a76a126bc6ecd3211aeaad51a7dba.jpg',
            'https://up.mangadudes.com/bleach/18/bleach-9338-89fcdb98b22c94781ba2846ea2e562c3.jpg',
            'https://up.mangadudes.com/bleach/18/bleach-9339-5d0e73373eb814d65b18bfa4ca533be8.jpg',
            'https://up.mangadudes.com/bleach/18/bleach-9340-c1220292956ae4cc1df0676e2d01c2e1.jpg',
            'https://up.mangadudes.com/bleach/18/bleach-9341-159bcbae27446cd1d6c964b4b70af020.jpg',
            'https://up.mangadudes.com/bleach/18/bleach-9342-024e1db41ff0ea6e6bc47574b209fda4.jpg',
            'https://up.mangadudes.com/bleach/18/bleach-9344-b14e956a08b6998dd00a61f89db84238.jpg',
        ]}
        pageSize={{
          height: 334, // the size of the images I plan to render (used simply to calculate ratio)
          width: 210,
        }}
        portrait={true}
        renderPage={(data) => <Image source={{ uri: data.content }} style={{ height: '100%', width: '100%' }} />}
      />
    )
}

export default App;
```

### Props

| Prop name             | Type                                                                      | Default value | Description                                                                                                                                                                                  |
|-----------------------|---------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type                  | 'image' \| 'text'                                                         | undefined     | The type of data you want to render, using text it allows to set max word per page                                                                                                           |
| data                  | any[] \| string[]                                                         | undefined     | The data you want to render, an array of images, or strings for text urls                                                                                                                    |
| firstPageMaxWords     | number                                                                    | undefined     | The max number of words you want in the first page                                                                                                                                           |
| maxWords              | number                                                                    | undefined     | The max number of words you want in other pages                                                                                                                                              |
| renderPage            | (page: { index: number; content: string; totalPages: number }) => Element | undefined     | The element to render for each item, with page object you can do conditional rendering based on index                                                                                        |
| pageSize              | Object                                                                    | undefined     | page size (used only to calculate ratio)                                                                                                                                                     |
| contentContainerStyle | Object                                                                    | undefined     | style for content container                                                                                                                                                                  |
| enabled               | bool                                                                      | true          | enables / disables the pan gesture handler of the pages                                                                                                                                      |
| pressable             | bool                                                                      | true          | enables / disables the tapping on the pages to flip                                                                                                                                          |
| singleImageMode       | bool                                                                      | true          | Defines whether each page is treated as a single image or two in one. (see above)                                                                                                            |
| renderLastPage        | () => JSX.Element                                                         | undefined     | optional function to render the last page (only applies when not in portrait mode and have an odd number of pages)                                                                           |
| portrait              | bool                                                                      | false         | sets portrait mode (viewing a single page at a time, see above)                                                                                                                              |
| onFlippedEnd          | Function                                                                  | undefined     | Callback for when the page has finished flipping                                                                                                                                             |
| onFlippedStart        | Function                                                                  | undefined     | Callback for when the page has started flipping, (does not trigger when user begins dragging the page, only when manually flipped by tapping the page or calling one of the exposed methods) |
| onPageDragStart       | Function                                                                  | undefined     | Callback for when the page has started dragging (user dragging with finger)                                                                                                                  |
| onPageDrag            | Function                                                                  | undefined     | Callback for when the page is actively being dragged                                                                                                                                         |
| onPageDragEnd         | Function                                                                  | undefined     | Callback for when the page has finished dragging                                                                                                                                             |
| onInitialized         | ((props: { pages: Page[]   index: number }) => void)                      | undefined     | Callback for when the page flipper is initialized, use page info to set a page indicator for example                                                                                         |
| renderContainer       | Function                                                                  | undefined     | function to return an element for rendering the container of the viewer                                                                                                                      |
| onEndReached          | Function                                                                  | undefined     | Callback for when the page flipper reaches the last page                                                                                                                                     |

### Methods

| Method name  | Description                       |
|--------------|-----------------------------------|
| goToPage     | flips to the page index passed in |
| previousPage | flips to the previous page        |
| nextPage     | flips to the next page            |
