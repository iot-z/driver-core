const EventEmitter = require('events');
const { Observable, ObservableFn } = require('@iotz/util-observable');

class DriverCore extends EventEmitter {
  /**
  * Constructor
  * @param  {string} IP
  * @return {void}
  */
  constructor(client) {
    super();

    this._client  = client;

    this._client.on('*', (topic, data) => {
      this.emit(topic, data);
    });

    let state;
    let actions;

    Object.defineProperty(this, 'state', {
      get: () => {
        return state;
      },
      set: (newVal) => {
        state = Observable(newVal, (...params) => {
          this.emit('state', ...params);
          this.onChange(...params);
        });
      },
    });

    Object.defineProperty(this, 'actions', {
      get: () => {
        return actions;
      },
      set: (newVal) => {
        actions = ObservableFn(newVal, this.onCall);
      },
    });
  }

  /**
   * Handler for setup pins in a new connection
   * @return {void}
   */
  setup() {
    // User implementation
  }

  /**
   * Handler for changes on state on the UI
   * @param  {string} prop   Path in dot style of the changed property
   * @param  {any} oldVal    Old value of property
   * @param  {any} newVal    New value of property
   * @return {void}
   */
  onChange(prop, oldVal, newVal) {
    // User implementation
  }

  /**
   * Handler of call actions on the UI
   * @param  {string} action   The action/method name
   * @param  {array} params    All params to be passed to the function
   * @return {void}
   */
  onCall(action, params) {
    // User implementation
  }

  /**
  * Get instance of the client
  * @return {Client} Client instance
  */
  get client() {
    return this._client;
  }

  get id() {
    return this.client.id;
  }

  get name() {
    return this.client.name;
  }

  get type() {
    return this.client.type;
  }

  get version() {
    return this.client.version;
  }
}

module.exports = DriverCore;
