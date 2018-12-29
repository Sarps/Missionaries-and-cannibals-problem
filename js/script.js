
function TreeSearch()
{
	this.initial = [3,3,1];
	this.explored = [];
	this.__path = [];
	this.__visited = [this.initial];
	this.__tree = {
		"name": JSON.stringify(this.initial),
		"children": []
	};
}

TreeSearch.prototype.search = function()
{
	$result = this.__iterate(this.initial, this.__tree);
	if($result == false) {
		console.log("Search Failed: Couldn't generate path");
		return;
	}
	console.log("Search Complete: Generating path");
	return this.__traceback();
}

TreeSearch.prototype.__iterate = function(state, tree) {
	if (this.isGoal(state)) {
		this.__path.push(state);
		return true;
	}
	var frontiers = this.getFrontiers(state, tree);
	if(frontiers.length === 0) {
		return false;
	}
	for (let i = 0; i < frontiers.length; i++) {
		const frontier = frontiers[i];
		this.__visited.push(frontier);
		size = tree.children.push({
			"name": JSON.stringify(frontier),
			"children": []
		})
		var result = this.__iterate(frontier, tree.children[size-1]);
		if(result == true) {
			this.__path.push(frontier);
			return true;
		}
	}
	return false;
}

TreeSearch.prototype.__traceback = function() {
	let actions = [];
	for (let i = this.__path.length-1; i > 0; i--) {
		let ps = this.__path[i], cs = this.__path[i-1];
		if(ps[2] == 1) {
			actions.push([
				ps[0] - cs[0], ps[1] - cs[1], 1
			])
		} else {
			actions.push([
				cs[0] - ps[0], cs[1] - ps[1], 1
			])
		}
		
	}
	return actions;
}

TreeSearch.prototype.getFrontiers = function(state, tree)
{
	var actions = this.getActions(state);
	var frontiers = [];
	for (let i = 0; i < actions.length; i++) {
		t_state = this.getResult(state, actions[i]);
		if (t_state[1] > t_state[0]) {
			tree.children.push({
				"name": JSON.stringify(t_state),
				"children": []
			})
			continue;
		} 
		if (this.__is_invalid(t_state)) {
			continue;
		}
		if(this.isVisited(t_state)) {
			continue;
		}
		frontiers.push(t_state);
	}
	return frontiers;
}

TreeSearch.prototype.isVisited = function(state)
{
	let visited = this.__visited.findIndex(function(v) {
		return (v[0] == state[0] && v[1] == state[1] && v[2] == state[2])
	});
	return visited > -1;
}

TreeSearch.prototype.isGoal = function(state)
{
	$state = (state[0] == 0 && state[1] == 0 && state[2] == 0);
	return $state;
}

TreeSearch.prototype.getActions = function(state)
{
	return [
		[1,0,1], [0,1,1], [2,0,1], [0,2,1], [1,1,1]
	];
}

TreeSearch.prototype.getResult = function(state, action)
{
	if(state[2] == 0) {
		return [
			state[0] + action[0],
			state[1] + action[1],
			1
		]
	}
	return [
		state[0] - action[0],
		state[1] - action[1],
		0
	]
}

TreeSearch.prototype.__is_invalid = function(t_state)
{
	return (t_state[0] > this.initial[0] || t_state[0] < 0 ||
		t_state[1] > this.initial[1] || t_state[1] < 0);
}

window.onload = function() {
    var tree = new TreeSearch;
    tree.search();
    update(tree.__tree);
}
