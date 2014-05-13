d3plus.method.size = {
  "accepted": [ Array , Boolean , Function , Object , String ],
  "data_filter": true,
  "deprecates": ["value"],
  "mute": d3plus.method.filter(true),
  "scale": {
    "deprecates": ["size_scale"],
    "value": d3.scale.sqrt()
  },
  "solo": d3plus.method.filter(true),
  "threshold": true,
  "value": false
}