import type { backendInterface } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleProducts = [
  {
    id: "moku-go",
    name: "Moku:Go",
    tagline: "All-in-one lab instrument for education and entry-level R&D",
    spec: {
      voltage: "±5V",
      bandwidth: "30 MHz",
      formFactor: "USB-C",
      connectivity: "USB, Wi-Fi",
      sampleRate: "122.88 MSPS",
      channels: BigInt(2),
      adcBits: BigInt(12),
    },
    useCases: [
      "Oscilloscope and waveform generation",
      "PID controller tuning",
      "Lock-in amplifier experiments",
      "Spectrum analysis up to 30 MHz",
    ],
    instruments: [
      "Oscilloscope",
      "Waveform Generator",
      "Spectrum Analyzer",
      "PID Controller",
      "Lock-in Amplifier",
    ],
  },
  {
    id: "moku-pro",
    name: "Moku:Pro",
    tagline: "High-performance platform for defense, aerospace, and research",
    spec: {
      voltage: "±1V",
      bandwidth: "600 MHz",
      formFactor: "1U Rack / Desktop",
      connectivity: "10 GbE, USB",
      sampleRate: "1.25 GSPS",
      channels: BigInt(4),
      adcBits: BigInt(16),
    },
    useCases: [
      "Radar signal processing",
      "Phase-sensitive detection",
      "Real-time DSP for aerospace",
      "Custom FPGA instrument deployment",
    ],
    instruments: [
      "Oscilloscope (4ch)",
      "Lock-in Amplifier",
      "Phasemeter",
      "FIR Filter Builder",
      "Laser Lock Box",
      "Moku Cloud Compile",
    ],
  },
  {
    id: "moku-delta",
    name: "Moku:Delta",
    tagline: "Ultra-precision platform for quantum and metrology applications",
    spec: {
      voltage: "±1V",
      bandwidth: "1 GHz",
      formFactor: "Benchtop",
      connectivity: "10 GbE, USB",
      sampleRate: "2.5 GSPS",
      channels: BigInt(4),
      adcBits: BigInt(16),
    },
    useCases: [
      "Quantum computing control electronics",
      "Gravitational wave detection",
      "Ultra-low noise signal generation",
      "Atomic clock stabilization",
    ],
    instruments: [
      "Multi-instrument (simultaneous)",
      "Phasemeter",
      "Lock-in Amplifier",
      "Arbitrary Waveform Generator",
      "Moku Cloud Compile",
    ],
  },
];

const sampleVerticals = [
  {
    id: "aerospace-defense",
    name: "Aerospace & Defense",
    overview:
      "DRDO, HAL, and private defense OEMs require test & measurement systems capable of radar, EW, and avionics signal analysis with ruggedized, programmable platforms.",
    painAreas: [
      "Expensive proprietary RF test equipment with long procurement cycles",
      "Need for real-time signal processing with custom FPGA logic",
      "Stringent EMI/EMC compliance testing requirements",
      "Rapid prototyping for radar and EW systems",
    ],
    solutionMappings: [
      {
        painArea: "Radar signal testing",
        description:
          "Moku:Pro with Phasemeter and custom Cloud Compile instrument for pulse-Doppler radar waveform verification",
        instruments: ["Phasemeter", "Cloud Compile", "Oscilloscope"],
        mokModel: "Moku:Pro",
      },
      {
        painArea: "EW signal generation",
        description:
          "Moku:Pro arbitrary waveform generation for threat emulation and jamming scenario simulation",
        instruments: ["Arbitrary Waveform Generator", "Spectrum Analyzer"],
        mokModel: "Moku:Pro",
      },
    ],
  },
  {
    id: "isro",
    name: "ISRO",
    overview:
      "Indian Space Research Organisation requires precision instrumentation for satellite payload testing, RF subsystem characterization, and ground station signal integrity validation.",
    painAreas: [
      "Satellite payload RF characterization across wide frequency range",
      "Phase noise measurement for onboard oscillators",
      "Custom DSP for telemetry signal processing",
      "Thermal and vibration testing of electronic subsystems",
    ],
    solutionMappings: [
      {
        painArea: "Payload RF testing",
        description:
          "Moku:Pro multi-instrument mode for simultaneous spectrum analysis and phase noise measurement",
        instruments: ["Spectrum Analyzer", "Phasemeter"],
        mokModel: "Moku:Pro",
      },
    ],
  },
  {
    id: "tejas-networks",
    name: "Tejas Networks",
    overview:
      "OEM telecom equipment manufacturer requiring high-speed signal integrity testing for optical and wireless backhaul systems.",
    painAreas: [
      "High-speed serial link characterization (10G/100G)",
      "Jitter and eye diagram analysis",
      "Pre-compliance EMC testing",
      "BERT and BER floor measurements",
    ],
    solutionMappings: [
      {
        painArea: "Signal integrity",
        description:
          "Moku:Pro with FIR Filter Builder for custom equalization verification on high-speed links",
        instruments: ["Oscilloscope", "FIR Filter Builder"],
        mokModel: "Moku:Pro",
      },
    ],
  },
];

const sampleChatSession = {
  id: "session-demo-001",
  messages: [
    {
      content:
        "What Moku solution would you recommend for ISRO's payload RF characterization?",
      role: "user",
      timestamp: now - BigInt(120_000_000_000),
    },
    {
      content:
        "For ISRO's payload RF characterization, Moku:Pro is the optimal choice. Run it in multi-instrument mode: Spectrum Analyzer (DC–600 MHz) alongside the Phasemeter for simultaneous phase noise and spectral purity measurement. Use Moku Cloud Compile to deploy custom matched filters if the payload frequency plan requires non-standard channelization. Python API gives you fully automated sweep control — critical for thermal cycling test sequences.",
      role: "assistant",
      timestamp: now - BigInt(60_000_000_000),
    },
  ],
  createdAt: now - BigInt(200_000_000_000),
  updatedAt: now - BigInt(60_000_000_000),
};

export const mockBackend: backendInterface = {
  listProducts: async () => sampleProducts,

  getProduct: async (id) => sampleProducts.find((p) => p.id === id) ?? null,

  listVerticals: async () => sampleVerticals,

  getVertical: async (id) =>
    sampleVerticals.find((v) => v.id === id) ?? null,

  listMaterials: async () => [
    {
      id: "mat-001",
      title: "Moku:Pro for Radar Testing — DRDO Briefing",
      content:
        "## Executive Summary\nMoku:Pro replaces 3 separate instruments in the radar test chain...",
      kind: "presentation",
      createdAt: now - BigInt(3_600_000_000_000),
    },
    {
      id: "mat-002",
      title: "Python API: Automated Phase Noise Sweep",
      content:
        "```python\nimport moku\nm = moku.Phasemeter('192.168.0.1')\n```",
      kind: "code",
      createdAt: now - BigInt(7_200_000_000_000),
    },
  ],

  getMaterial: async (id) => {
    const materials = [
      {
        id: "mat-001",
        title: "Moku:Pro for Radar Testing — DRDO Briefing",
        content: "## Executive Summary\nMoku:Pro replaces 3 separate instruments...",
        kind: "presentation",
        createdAt: now - BigInt(3_600_000_000_000),
      },
    ];
    return materials.find((m) => m.id === id) ?? null;
  },

  saveMaterial: async (kind, title, content) => ({
    id: `mat-${Date.now()}`,
    title,
    content,
    kind,
    createdAt: now,
  }),

  getSession: async (_id) => sampleChatSession,

  appendMessage: async (_sessionId, role, content) => ({
    ...sampleChatSession,
    messages: [
      ...sampleChatSession.messages,
      { content, role, timestamp: now },
    ],
    updatedAt: now,
  }),

  deleteSession: async (_sessionId) => undefined,

  getAdvisorAdvice: async (userQuery, _context) => ({
    rawResponse: `Based on your query about "${userQuery}", Moku:Pro is recommended for this application. Its 600 MHz bandwidth and multi-instrument mode enables simultaneous characterization across your signal chain.`,
    recommendedProduct: "Moku:Pro",
    recommendedInstruments: ["Phasemeter", "Spectrum Analyzer", "Cloud Compile"],
    useCaseSummary: `Solution for: ${userQuery}`,
    nextSteps: [
      "Schedule a Moku:Pro demo with the customer's RF team",
      "Prepare Python API workflow for their specific test sequence",
      "Generate Cloud Compile instrument spec for custom DSP block",
    ],
  }),

  generateCourse: async (vertical, _product) => ({
    title: `Moku FPGA Programming for ${vertical}`,
    fullMarkdown: `# Moku Cloud Compile Course\n## Module 1: Introduction\nMoku Cloud Compile enables custom FPGA instruments...\n\n## Module 2: Verilog Basics\n\`\`\`verilog\nmodule my_filter (input clk, input signed [15:0] data_in, output signed [15:0] data_out);\n  // FIR filter implementation\nendmodule\n\`\`\``,
    modules: [
      {
        moduleName: "Introduction to Moku Cloud Compile",
        objectives: [
          "Understand FPGA architecture on Moku platforms",
          "Set up development environment",
          "Deploy first custom instrument",
        ],
        labExercises: [
          "Hello World: LED blink on Moku FPGA",
          "Custom gain stage using DSP48 primitives",
        ],
      },
      {
        moduleName: "Verilog/VHDL for Signal Processing",
        objectives: [
          "Write synthesizable Verilog for FIR filters",
          "Implement IQ demodulator in VHDL",
          "Interface with Moku ADC/DAC ports",
        ],
        labExercises: [
          "FIR bandpass filter for radar IF stage",
          "Pulse compression matched filter",
        ],
      },
    ],
  }),

  generatePresentation: async (vertical, product) => ({
    title: `${product} Solution for ${vertical}`,
    talkingPointsSummary: `Key value: replace multiple lab instruments with a single ${product} platform, reducing cost and complexity while enabling custom FPGA logic via Cloud Compile.`,
    slides: [
      {
        slideTitle: "The Challenge",
        bulletPoints: [
          "Fragmented test stack — 4+ instruments per bench",
          "Long procurement and calibration cycles",
          "No programmability for custom signal processing",
        ],
      },
      {
        slideTitle: `Why ${product}`,
        bulletPoints: [
          "Multi-instrument mode: run 2–4 instruments simultaneously",
          "Moku Cloud Compile: deploy custom FPGA logic in minutes",
          "Python & MATLAB API for full automation",
          "NIST-traceable calibration included",
        ],
      },
      {
        slideTitle: "ROI",
        bulletPoints: [
          "60–70% cost reduction vs equivalent multi-instrument stack",
          "Zero reconfiguration downtime",
          "10x faster prototyping cycles",
        ],
      },
    ],
  }),

  generateSchematic: async (useCaseDescription) => ({
    title: `System Schematic: ${useCaseDescription}`,
    asciiDiagram: `
  ┌─────────────────────────────────────────────────────────┐
  │                    MOKU:PRO                             │
  │  ┌──────────────┐    ┌──────────────┐                  │
  │  │  Spectrum    │    │ Phasemeter   │                   │
  │  │  Analyzer    │    │              │                   │
  │  └──────┬───────┘    └──────┬───────┘                  │
  │         │                   │                           │
  │  IN1 ───┘           IN2 ────┘                          │
  └─────────────────────────────────────────────────────────┘
       │                    │
  ┌────┴────┐          ┌────┴────┐
  │  DUT    │          │  Ref    │
  │ RF Out  │          │ 10 MHz  │
  └─────────┘          └─────────┘`,
    notes:
      "Connect DUT RF output to IN1. Reference clock to IN2 for phase-coherent measurement.",
    componentList: [
      "Moku:Pro (qty: 1)",
      "DUT under test",
      "10 MHz reference oscillator",
      "SMA cables (qty: 2)",
      "Power splitter (optional for multi-tone)",
    ],
  }),

  search: async (term) => [
    {
      id: "moku-pro",
      title: "Moku:Pro",
      kind: "product",
      snippet: `High-performance platform matching "${term}" — 600 MHz bandwidth, 4-channel, multi-instrument.`,
      score: BigInt(95),
    },
    {
      id: "aerospace-defense",
      title: "Aerospace & Defense",
      kind: "vertical",
      snippet: `Industry vertical with strong fit for "${term}" use cases in radar and EW.`,
      score: BigInt(88),
    },
  ],

  setApiKey: async (_key) => undefined,

  getModel: async () => "claude-opus-4-5",

  setModel: async (_model) => undefined,

  getExtendedThinking: async () => false,

  setExtendedThinking: async (_enabled) => undefined,

  transform: async (_input) => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
};
