import Server from './server';

/**
 * @typedef {import("./server").ServerType} ServerType
 */

/**
 * @description Service - Calculates the server hardware for a data center.
 * @param {Object} data
 * @param {ServerType} data.serverType
 * @param {ServerType[]} data.virtualMachines
 * @returns {number} The number of required server(s)
 */
const serverPlanner = ({ serverType, virtualMachines }) => {
  const skippedVMs = [];
  let serverCount = 0;
  let server = new Server(serverType);

  virtualMachines.forEach((vm, index) => {
    if (server.canAccomodateVM(vm)) {
      server.addVM(vm);
      if (server.vmCount === 1) serverCount += 1;
    } else if (new Server(serverType).canAccomodateVM(vm)) {
      server = new Server(serverType);
      server.addVm(vm);
      serverCount += 1;
    } else {
      skippedVMs.push(index);
    }
  });

  // If we ever need information about the skipped VMs,
  // we can also return skippedVMs array.
  return serverCount;
};


export default serverPlanner;
