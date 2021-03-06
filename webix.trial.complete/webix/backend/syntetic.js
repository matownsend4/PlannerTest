
module.exports = function(app, root){
	app.get(root + "/hugetree",async (req,res, next)=>{
		try {
			if (req.query.parent){
				res.send(get_sub_data(req.query.parent));
				return;
			}
	
			const start =  req.query.start || 0;
			const count =  req.query.count || 50;
			res.send(get_top_level(start, count));
		} catch(e){
			next(e);
		}
	});

};

function get_top_level(start, count){
	const totalCount = 100000;
	if(start + count > totalCount )
    	count =  totalCount - start;

	const data = (new Array(count*1)).fill(undefined).map((_,i) => ({
		value: `Branch ${i*1+start*1+1}`,
		id: "x"+(i*1+start*1),
		webix_kids: true 
	}));

	return {
		total_count: totalCount,
		pos: start,
		data
	};
}

function get_sub_data(parent){
	const data = (new Array(10)).fill(undefined).map((_, i) => ({
		value:`Child ${i+1}`,
		id:`x-${i}-${parent}`
	}));
	
	return {
		parent,
		data
	};
}