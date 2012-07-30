/*global util, Objects, BoneCollection*/
Objects.C.Skeleton = (function() {
  "use strict";

  function Skeleton(position, layout) {
    Objects.Composite.call(this, position, layout || Skeleton.layout);
  }

  util.inherits(Skeleton, Objects.Composite);

  Skeleton.layout =  {
    type: "Skeleton",
    bones: [
    {
      name: "body",
      type: "bone",
      length: 40,
      angle: 90,
      bones: [
        {
          name: "right thigh",
          type: "bone",
          length: 20,
          angle: -30,
          bones: [
            {
              name: "right calf",
              type: "bone",
              length: 20,
              angle: 0,
              bones: []
            }
          ]
        },
        {
          name: "left thigh",
          type: "bone",
          length: 20,
          angle: 30,
          bones: [
            {
              name: "right thigh",
              type: "bone",
              length: 20,
              angle: 0,
              bones: []
            }
          ]
        }
      ]
    },
    {
      name: "right upperarm",
      type: "bone",
      length: 20,
      angle: 60,
      bones: [
        {
          name: "right forearm",
          type: "bone",
          length: 20,
          angle: 0,
          bones: []
        }
      ]
    },
    {
      name: "left upperarm",
      type: "bone",
      length: 20,
      angle: 120,
      bones: [
        {
          name: "left forearm",
          type: "bone",
          length: 20,
          angle: 0,
          bones: []
        }
      ]
    },
    {
      name: "head",
      type: "skull",
      length: 20,
      angle: -90,
      bones: []
    }
  ]
  };

  return Skeleton;
})();