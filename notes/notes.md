**Vector2** class represents a 2D vector. A 2D vector is an ordered pair of numbers (x, y). It is used to represent a point in 2D space.

3js textures types

- normal: for bump mapping, blue is up
- ambient occlusion: mostly for contrast
- metalness: reflection, grayscale image
- roughness: how rough the surface is, grayscale image

they follow pbr (Physically Based Rendering) principles by using real life directions

learn more:

- https://marmoset.co/posts/basic-theory-of-physically-based-rendering/
- https://marmoset.co/posts/physically-based-rendering-and-you-can-too/

### transformations

rotation, translation, scaling, offset, etc

### 2 types of filter algorithms:

1. minification filter: when the pixels of the texture are smaller than the pixels of the renders. In other words, when the texture is too big for the surface it covers.
2. magnification filter: when the pixels of the texture are bigger than the pixel of the renders. In other words, when the texture is too small for the surface it covers.

_LinearFilter(Default)_, blurry
_NearestFilter_, good for performance, sharp edges, better framerates

mipmapping:
TLDR: creates smaller versions of the texture to be used when the texture is far away from the camera. This reduces the moire effect.
A technique used in 3D computer graphics to reduce the visual artifacts of aliasing. It is used in real-time rendering to optimize performance. It works by pre-calculating multiple scaled-down versions of the texture, which are stored in the video memory. When the texture is rendered, the appropriate mipmap level is selected based on the distance of the texture from the camera.

moire effect: when the texture is smaller than the area it covers, it creates a moire effect, which is a visual artifact that appears when viewing a set of lines or dots that is superimposed on another set of lines or dots, where the sets differ in relative size, angle, or spacing.

we don't need mipmapping when we're using _NearestFilter_ on _minFilter_ and _magFilter_

smaller textures are better for GPU performance

when prepping your textures, keep these crucial elements in mind:

- the weight: choose right type, `.jpg`(lossy compression, usually lighter); `.png`(lossless, usually heavier).
  you can compress using https://tinypng.com, basis
- the size(resolution): each pixel of textures are stored on the gpu regardless of the weight, gpu has storage limitations; it can be worse because _mipmapping_ increases the number of pixels to store. so try to reduce the size of your images as much as possible. because of that the texture width & height must be a power of 2 like we could divide 512/2 till we reach 1
- the data

textures support transparency, we can't have transparency in `.jpg`, if want to have only one texture that combine color & alpha, we better use `.png` file

### where to find textures

https://poligon.com
https://3dtextures.me
https://arrowaytextures.ch

#### create your own textures

- photoshop
- https://substance3d.com

### SHADERS

algorithms that decide on the color of each pixel are written in programs called **shaders**.
