var index = function(request, response) {
  return response.json({
    "message": "Welcome to the SmartGarden API"
  });
}

module.exports = index;
