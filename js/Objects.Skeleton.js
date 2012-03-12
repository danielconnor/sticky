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
		type: "bone",
		length: 40,
		angle: 90,
		bones: [
			{
				//right thigh
				type: "bone",
				length: 20,
				angle: 120,
				bones: [
					{
						//right calf
						type: "bone",
						length: 20,
						angle: 120,
						bones: []
					}
				]
			},
			{
				//left thigh
				type: "bone",
				length: 20,
				angle: 60,
				bones: [
					{
						//left calf
						type: "bone",
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
		type: "bone",
		length: 20,
		angle: 120,
		bones: [
			{
				//right forearm
				type: "bone",
				length: 20,
				angle: 120,
				bones: []
			}
		]
	},
	{
		//left upperarm
		type: "bone",
		length: 20,
		angle: 60,
		bones: [
			{
				//left forearm
				type: "bone",
				length: 20,
				angle: 60,
				bones: []
			}
		]
	},
	{
		//head
		type: "skull",
		length: 20,
		angle: -90,
		bones: []
	}
]
};