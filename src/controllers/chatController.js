const postMessage = async (req, res, next) => {
  res
    .status(201)
    .json(`Response from postMessage controller: ${req.body.message}`);
};

module.exports = { postMessage };

