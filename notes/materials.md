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
