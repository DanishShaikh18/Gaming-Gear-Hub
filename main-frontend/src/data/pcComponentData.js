// src/data/pcComponentData.js

const pcComponents = {
    processors: {
      Intel: {
        i5: {
          generations: {
            '10th Gen': 12000,
            '11th Gen': 14000,
            '12th Gen': 16000,
            '13th Gen': 18000,
          },
        },
        i7: {
          generations: {
            '10th Gen': 18000,
            '11th Gen': 20000,
            '12th Gen': 24000,
            '13th Gen': 27000,
          },
        },
        i9: {
          generations: {
            '11th Gen': 30000,
            '12th Gen': 35000,
            '13th Gen': 40000,
          },
        },
      },
      Ryzen: {
        '5500U': 15000,
        '5600X': 18000,
        '5800X': 23000,
        '7600X': 30000,
      },
    },
  
    gpus: {
      NVIDIA: {
        'GTX 1650': 14000,
        'RTX 3050': 22000,
        'RTX 3060': 28000,
        'RTX 4060': 35000,
        'RTX 4070': 50000,
      },
      AMD: {
        'RX 6600': 20000,
        'RX 6700 XT': 32000,
        'RX 6800 XT': 45000,
      },
    },
  
    keyboards: {
      Mechanical: 3000,
      Membrane: 800,
    },
  
    mice: {
      RGB: 1500,
      Wireless:600,
      Normal: 500,
      
    },
  
    monitors: {
      '24 inch 1080p': 8000,
      '27 inch 1440p': 14000,
      '32 inch 4K': 22000,
    },
  
    cabinets: {
      Standard: 4000,
      Gaming: {
        base: 7000,
        fans: 1500,
        waterCooling: 3000,
      },
    },
  
    extras: {
      Controller: 3000,
      Mousepad: 500,
      Table: 5000,
      Headset: 2500,
    },
  };
  
  export default pcComponents;
  