/*global util, Objects, BoneCollection, Voodoo, UI, Point*/
Objects.C.Skeleton = (function() {
  "use strict";

  function Skeleton(position, layout) {
    Objects.Composite.call(this, position, layout || Skeleton.layout);

    var skeleton = this;

    Skeleton.create(this.obj, Skeleton.layout, function(bone) {
      skeleton.children.push(bone);
      skeleton.voodoos.push(new Voodoo(bone));
      skeleton.timelineCollection.append(new UI.Timeline(bone, "angle", 0, 1000));
    });

    this.obj.update();
  }

  Skeleton.create = function(obj, layout, cb) {
    if(!obj) {
      cb = layout;
      layout = obj;
      obj = new BoneCollection("g", new Point(0,0));
    }

    obj.addBones(layout, cb);
    return obj;
  };

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