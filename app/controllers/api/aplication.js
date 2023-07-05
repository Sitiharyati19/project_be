module.exports = {
    getRoot(req, res) {
      res.status(200).json({
        status: 'OK',
        message: 'Sistem is up and running!'
      })
    },
  
    handleNotFound(req, res) {
      const err = new Error('Root Not Found!');
      res.status(404).json({
        error: {
          name: err.name,
          message: err.message,
          details: err.details,
        }
      });
    }
  }