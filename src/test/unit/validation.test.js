import validation from '../../validation';

const testCases = [
  [
    'should fail for empty data object',
    {},
    { valid: false },
  ],
  [
    'should fail for invalid serverType',
    {
      serverType: { HDD: 100, RAM: 32 },
      virtualMachines: [
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 100, CPU: 2, RAM: 32 },
      ],
    },
    { valid: false },
  ],
  [
    'should fail if serverType property is not given',
    {
      virtualMachines: [
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 100, CPU: 2, RAM: 32 },
      ],
    },
    { valid: false },
  ],
  [
    'should fail for invalid virtualMachine',
    {
      serverType: { HDD: 100, CPU: 2, RAM: 32 },
      virtualMachines: [
        { HDD: 10, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 110, CPU: 2, RAM: 32 },
      ],
    },
    { valid: false },
  ],
  [
    'should fail if invalid virtualMachin property is not given',
    {
      serverType: { HDD: 100, CPU: 2, RAM: 32 },
    },
    { valid: false },
  ],
  [
    'should fail if virtualMachines array does not have atleast one item',
    {
      serverType: { HDD: 100, CPU: 2, RAM: 32 },
      virtualMachines: [],
    },
    { valid: false },
  ],
  [
    'should pass for valid data object',
    {
      serverType: { HDD: 100, CPU: 2, RAM: 32 },
      virtualMachines: [
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
      ],
    },
    {
      valid: true,
      data: {
        serverType: { HDD: 100, CPU: 2, RAM: 32 },
        virtualMachines: [
          { HDD: 10, CPU: 1, RAM: 16 },
          { HDD: 10, CPU: 1, RAM: 16 },
        ],
      },
    },
  ],
];


describe('Validation', () => {
  const { validateServerPlanningRequest } = validation;
  test.each(testCases)('%s', (title, data, result) => {
    expect(validateServerPlanningRequest(data)).toMatchObject(result);
  });
});
