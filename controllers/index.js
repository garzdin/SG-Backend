var index = function(request, response) {
  return response.send({
    "message": "Welcome to the SmartGarden API"
  });
}

module.exports = index;
