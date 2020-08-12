import planner from '../../service';

const testCases = [
  [
    'Should return 1',
    {
      serverType: { HDD: 100, CPU: 2, RAM: 32 },
      virtualMachines: [
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
      ],
    },
    1,
  ],
  [
    'Should return 2',
    {
      serverType: { HDD: 100, CPU: 2, RAM: 32 },
      virtualMachines: [
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 100, CPU: 2, RAM: 32 },
      ],
    },
    2,
  ],
  [
    'Should return 1... Skipping too large vm',
    {
      serverType: { HDD: 100, CPU: 2, RAM: 32 },
      virtualMachines: [
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 10, CPU: 1, RAM: 16 },
        { HDD: 110, CPU: 2, RAM: 32 },
      ],
    },
    1,
  ],
];


describe('Server Planner', () => {
  test.each(testCases)('%s', (title, data, result) => {
    expect(planner(data)).toEqual(result);
  });
});
