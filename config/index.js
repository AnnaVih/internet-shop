module.exports = {
    getDBConnection() {
      return `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0-laanw.mongodb.net/${process.env.MONGODB_DEFAULT_DATABASE}`;
    }
  }
  