import Server from '../../service/server';

describe('Server Class', () => {
  let server;
  const serverType = {
    HDD: 100,
    CPU: 5,
    RAM: 32,
  };
  beforeEach(() => {
    server = new Server(serverType);
  });

  it('should instantiate without error', () => {
    expect(server).toBeInstanceOf(Server);
  });

  it('should return initial vmCount as 0', () => {
    expect(server.vmCount).toEqual(0);
  });
  it('should accomodate a VM of lesser spec', () => {
    const vmSpec = { ...serverType, HDD: 50 };
    expect(server.canAccomodateVM(vmSpec)).toEqual(true);
  });
  it('should accomodate a VM of equal spec', () => {
    const vmSpec = { ...serverType };
    expect(server.canAccomodateVM(vmSpec)).toEqual(true);
  });
  it('should not accomodate a VM of higher spec', () => {
    const vmSpec = { ...serverType, HDD: serverType.HDD + 50 };
    expect(server.canAccomodateVM(vmSpec)).toEqual(false);
  });
  it('shoudl decrement server capacity after adding a vm', () => {
    const vmSpec = { ...serverType, HDD: 50 };
    const expectedCPU = server.CPU - vmSpec.CPU;
    const expectedHDD = server.HDD - vmSpec.HDD;
    const expectedRAM = server.RAM - vmSpec.RAM;

    server.addVM(vmSpec);

    expect(server.vmCount).toEqual(1);
    expect(server.CPU).toEqual(expectedCPU);
    expect(server.RAM).toEqual(expectedRAM);
    expect(server.HDD).toEqual(expectedHDD);
  });
});
