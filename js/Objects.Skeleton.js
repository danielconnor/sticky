Objects.C.Skeleton = function(paper, position) {
	var skeleton = this;

	Objects.Composite.call(this, position, Objects.C.Skeleton.create);
};

Objects.C.Skeleton.create = function(position, callback) {
	var obj = new BoneCollection("g", position);

	obj.addBones(Objects.C.Skeleton.layout, function(bone) {
		callback && callback(bone);
	});

	return obj;
};


Objects.C.Skeleton.layout =  {
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
				angle: 120,
				bones: [
					{
						name: "right calf",
						type: "bone",
						length: 20,
						angle: 120,
						bones: []
					}
				]
			},
			{
				name: "left thigh",
				type: "bone",
				length: 20,
				angle: 60,
				bones: [
					{
						name: "right thigh",
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
		name: "right upperarm",
		type: "bone",
		length: 20,
		angle: 120,
		bones: [
			{
				name: "right forearm",
				type: "bone",
				length: 20,
				angle: 120,
				bones: []
			}
		]
	},
	{
		name: "left upperarm",
		type: "bone",
		length: 20,
		angle: 60,
		bones: [
			{
				name: "left forearm",
				type: "bone",
				length: 20,
				angle: 60,
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