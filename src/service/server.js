/**
 * Type definition for the serverType object
 * @typedef {Object} ServerType
 * @property {number} HDD
 * @property {number} CPU
 * @property {number} RAM
 */

export default class Server {
  /**
   * @param {ServerType} serverType
   */
  constructor(serverType) {
    /** @private */
    this.CPU = serverType.CPU;
    /** @private */
    this.RAM = serverType.RAM;
    /** @private */
    this.HDD = serverType.HDD;
    /** @private */
    this.vmCount = 0;
  }

  /**
   * @description Checks if a server can accomodate a virtual machine
   * @param {ServerType} VMSpec - The spec of the virtual machine
   * @returns {boolean} A thruty value telling if server can accomodate the vm or not
   */
  canAccomodateVM(VMSpec) {
    const { CPU, RAM, HDD } = VMSpec;
    if (CPU <= this.CPU && RAM <= this.RAM && HDD <= this.HDD) return true;
    return false;
  }

  /**
   * @description Adds a virtual machine to a server by deducting
   * the compute power necessary for the vm from the server
   * @param {ServerType} VMSpec
   * @returns {undefined}
   */
  addVM(VMSpec) {
    const { CPU, RAM, HDD } = VMSpec;
    this.CPU -= CPU;
    this.RAM -= RAM;
    this.HDD -= HDD;
    this.vmCount += 1;
  }

  /**
   * @returns {number} The number of virtuals machines successfully
   * added to a server instance
   */
  get vmCount() {
    return this.vmCount;
  }
}
