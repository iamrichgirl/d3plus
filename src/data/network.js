//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Calculates node positions, if needed for network
//-------------------------------------------------------------------
d3plus.data.network = function(vars) {

  var edge_req = d3plus.apps[vars.type.value].requirements.indexOf("edges") >= 0,
      node_req = d3plus.apps[vars.type.value].requirements.indexOf("nodes") >= 0,
      node_create = node_req && !vars.nodes.value

  if (!vars.edges.linked && edge_req && vars.edges.value) {

    if (node_create) {
      vars.nodes.value = []
      var placed = []
      vars.nodes.changed = true
    }

    vars.edges.value.forEach(function(e){

      if (typeof e.source != "object") {
        var obj = {}
        obj[vars.id.key] = e.source
        e.source = obj
      }
      if (typeof e.target != "object") {
        var obj = {}
        obj[vars.id.key] = e.target
        e.target = obj
      }

      if (node_create) {
        if (placed.indexOf(e.source[vars.id.key]) < 0) {
          placed.push(e.source[vars.id.key])
          vars.nodes.value.push(e.source)
        }
        if (placed.indexOf(e.target[vars.id.key]) < 0) {
          placed.push(e.target[vars.id.key])
          vars.nodes.value.push(e.target)
        }
      }

    })

    vars.edges.linked = true

  }

  if (node_req && !vars.nodes.positions && vars.nodes.value && vars.edges.value) {

    var set = vars.nodes.value.filter(function(n){
      return typeof n.x == "number" && typeof n.y == "number"
    }).length

    if (set == vars.nodes.value.length) {
      vars.nodes.positions = true
    }
    else {

      var force = d3.layout.force()
        .size([vars.app_width,vars.app_height])
        .nodes(vars.nodes.value)
        .links(vars.edges.value)

      var iterations = 50,
          threshold = 0.01;

      force.start(); // Defaults to alpha = 0.1
      for (var i = iterations; i > 0; --i) {
        force.tick();
        if(force.alpha() < threshold) {
          break;
        }
      }
      force.stop();

      vars.nodes.positions = true

    }

  }

}
