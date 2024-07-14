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

### MATERIALS

Materials are used to put a color on each visible pixel of the geometries.
The algorithms that decide on the color of each pixel are written in programs called shaders. Writing shaders is one of the most challenging parts of WebGL and Three.js.

#### NormalMaterial

Normals are information encoded in each vertex that contains the direction of the outside of the face. If you displayed those normals as arrows, you would get straight lines coming out of each vertex that compose your geometry.

#### MatcapMaterial

Good for performance, the material will pick the color of the texture based on the normal of the face. It's like a texture that is applied to the geometry based on the normal of the face.
**Cons**

- it doesn't simulate shadows well, on Bruno's site, he uses it for most objects on his site and then disables the camera from rotating.

Vast list of matcaps: https://github.com/nidorx/matcaps. Licenses aren't verified and you might not be allowed to use them other than for personal projects. Or you can create your own matcaps.

- with a 3d software by rendering a sphere in front of the camera in a sphere image
- 2d software like photoshop
- online tools like https://www.kchapelier.com/matcap-studio

#### MeshDepthMaterial

It's a material that will color the pixels based on the distance of the pixel to the camera. 3js uses this internally to calculate shadows.

#### MeshLambertMaterial

It's a material that requires a light to be rendered before it can be seen. most performant material that uses light.
Good for performance.

#### MeshPhongMaterial

Similar to MeshLambertMaterial but it has a specular highlight. less performant than MeshLambertMaterial.

#### MeshStandardMaterial

It's a material that uses the PBR (Physically Based Rendering) principles. It's the most realistic material in Three.js. It uses textures; roughness, metalness, normal, etc.

Environment map is a texture that is used to simulate the environment around an object. usually ends with .hdr

#### MeshPhysicalMaterial

It's a material that extends `MeshStandardMaterial` and adds more properties to it. It's the most realistic material in Three.js. Properties like clearcoat, sheen, iridescence, transmission, etc.
Not so good for performance.

#### Clearcoat
It's a property that simulates a clear coat on top of the material. It's like a layer of varnish on top of the material. It's used to simulate materials like car paint, wood varnish, etc. Not really performant; so test on low-end devices.
#### Sheen
It's a property that simulates the fuzziness of the material. It's used to simulate materials like velvet, silk, etc.
#### Iridescence
It's a property that simulates the color change of the material based on the angle of the camera. It's used to simulate materials like soap bubbles, oil on water, etc. 

### Map

- `aoMap` propertty(ambient occlusion map) will add shadows where the texture is dark. it intensity can be controlled using the `aMapIntensity` property
