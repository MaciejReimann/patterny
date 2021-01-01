Why am I doing this?

- play
- learn fabric.js
- learn bulma
- showcase in my portfolio
- build a freelance profile

Next tasks:

- design a PatternClass which exposes an API applicable to all paterns + is useful to be consumed by the UI
  --- case against using JS classes: https://everyday.codes/javascript/please-stop-using-classes-in-javascript/

- design TrianglePattern API -> which paart are universal and can be handled by PatternClass and which are specific to this pattern

- list all patterns you can think of -> group them into categories -> find out what the criteria are

random dots
hex pattern
circularc

- refactor Triangle.ts into triange-pattern.ts (or maybe different? maybe it should not be a triangle patrern, but rather a variation of the rectangular one?)

GEOMETRY:
-- divide the canvas into cells (rectangular grid)
--- this is a param -> size of the cell, and cell distribution (0 0, or centered hor and ver?)
-- add additional point (which produces trangles)
--- this is ALSO a param - i can add more than one point!-> i can produce other shapes like romboids
-- move the points within the range of a tile (to keep it rectangular -> i.e. each tile is generated from rectangular grid cell)
--- this is a param (range from no movement to touching the other cell)

COLORS:
-- how colors are distributed across grid cells?
--- this is a param (left to right, diagonally,)
-- how colors are assigned into particular cells (divided) is there any additional logic to it, like +brightness to top-right, or sth like that?

FEATURES:

- add layers and possibility ot edit each layer's parameters + layer opacity

TODO:

- make it faster!!!
