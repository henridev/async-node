const EventEmitter = require("events");

class DataMonitor extends EventEmitter {
  constructor() {
    super();
    this.logLevel = "DEV";
  }
}

module.exports = DataMonitor;
