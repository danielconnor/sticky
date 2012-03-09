Objects.C.Skeleton = function(paper, position) {
	var skeleton = this;

	Objects.Composite.call(this, paper, position, Objects.C.Skeleton.create);
};

Objects.C.Skeleton.create = function(paper, position, callback) {
	var obj = new BoneCollection(paper, position);

	obj.addBones(Objects.C.Skeleton.layout, function(bone) {
		callback && callback(bone);
	});

	return obj;
};


Objects.C.Skeleton.layout =  {
    type: "Skeleton",
    basePt: {
        x: 75,
        y: 50
    },
    bones: [
    {
        //body
        length: 40,
        angle: 90,
        bones: [
            {
                //right thigh
                length: 20,
                angle: 120,
                bones: [
                    {
                        //right calf
                        length: 20,
                        angle: 120,
                        bones: []
                    }
                ]
            },
            {
                //left thigh
                length: 20,
                angle: 60,
                bones: [
                    {
                        //left calf
                        length: 20,
                        angle: 60,
                        bones: []
                    }
                ]
            }
        ]
    },
    {
        //right upperarm
        length: 20,
        angle: 120,
        bones: [
            {
                //right forearm
                length: 20,
                angle: 120,
                bones: []
            }
        ]
    },
    {
        //left upperarm
        length: 20,
        angle: 60,
        bones: [
            {
                //left forearm
                length: 20,
                angle: 60,
                bones: []
            }
        ]
    },
    {
        //head
        length: 22,
        angle: -90,
        bones: []
    }
]
};