import Types "../types/knowledge-data";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";

module {
  // ── Products ────────────────────────────────────────────────────────────────

  public func getProduct(
    products : Map.Map<Text, Types.Product>,
    id : Text,
  ) : ?Types.Product {
    products.get(id);
  };

  public func listProducts(products : Map.Map<Text, Types.Product>) : [Types.Product] {
    products.values().toArray();
  };

  // ── Verticals ───────────────────────────────────────────────────────────────

  public func getVertical(
    verticals : Map.Map<Text, Types.IndustryVertical>,
    id : Text,
  ) : ?Types.IndustryVertical {
    verticals.get(id);
  };

  public func listVerticals(
    verticals : Map.Map<Text, Types.IndustryVertical>
  ) : [Types.IndustryVertical] {
    verticals.values().toArray();
  };

  // ── Search ──────────────────────────────────────────────────────────────────

  func scoreText(haystack : Text, needle : Text) : Nat {
    let h = haystack.toLower();
    let n = needle.toLower();
    if (h.contains(#text n)) 1 else 0;
  };

  public func search(
    products : Map.Map<Text, Types.Product>,
    verticals : Map.Map<Text, Types.IndustryVertical>,
    term : Text,
  ) : [CommonTypes.SearchResult] {
    let results = List.empty<CommonTypes.SearchResult>();

    for ((_, p) in products.entries()) {
      var score = 0;
      score += scoreText(p.name, term) * 3;
      score += scoreText(p.tagline, term) * 2;
      for (inst in p.instruments.values()) {
        score += scoreText(inst, term);
      };
      for (uc in p.useCases.values()) {
        score += scoreText(uc, term);
      };
      score += scoreText(p.spec.bandwidth, term);
      if (score > 0) {
        results.add({
          id = p.id;
          kind = "product";
          title = p.name;
          snippet = p.tagline;
          score = score;
        });
      };
    };

    for ((_, v) in verticals.entries()) {
      var score = 0;
      score += scoreText(v.name, term) * 3;
      score += scoreText(v.overview, term) * 2;
      for (pa in v.painAreas.values()) {
        score += scoreText(pa, term);
      };
      for (sm in v.solutionMappings.values()) {
        score += scoreText(sm.painArea, term);
        score += scoreText(sm.description, term);
      };
      if (score > 0) {
        let snippet = if (v.overview.size() > 120) {
          v.overview.toArray()
            |> _.sliceToArray(0, 120)
            |> Text.fromArray(_) # "..."
        } else {
          v.overview;
        };
        results.add({
          id = v.id;
          kind = "vertical";
          title = v.name;
          snippet = snippet;
          score = score;
        });
      };
    };

    // sort descending by score
    results.sortInPlace(func(a, b) {
      if (a.score > b.score) #less
      else if (a.score < b.score) #greater
      else #equal
    });
    results.toArray();
  };

  // ── Chat Sessions ────────────────────────────────────────────────────────────

  public func getSession(
    sessions : Map.Map<Text, CommonTypes.ChatSession>,
    sessionId : Text,
  ) : ?CommonTypes.ChatSession {
    sessions.get(sessionId);
  };

  public func appendMessage(
    sessions : Map.Map<Text, CommonTypes.ChatSession>,
    sessionId : Text,
    msg : CommonTypes.ChatMessage,
  ) : CommonTypes.ChatSession {
    let now = Time.now();
    let session = switch (sessions.get(sessionId)) {
      case (?s) {
        { s with
          messages = s.messages.concat([msg]);
          updatedAt = now;
        };
      };
      case null {
        {
          id = sessionId;
          messages = [msg];
          createdAt = now;
          updatedAt = now;
        };
      };
    };
    sessions.add(sessionId, session);
    session;
  };

  public func deleteSession(
    sessions : Map.Map<Text, CommonTypes.ChatSession>,
    sessionId : Text,
  ) : () {
    sessions.remove(sessionId);
  };

  // ── Generated Materials ──────────────────────────────────────────────────────

  public func saveMaterial(
    materials : List.List<CommonTypes.GeneratedMaterial>,
    material : CommonTypes.GeneratedMaterial,
  ) : () {
    materials.add(material);
  };

  public func listMaterials(
    materials : List.List<CommonTypes.GeneratedMaterial>
  ) : [CommonTypes.GeneratedMaterial] {
    materials.toArray();
  };

  public func getMaterial(
    materials : List.List<CommonTypes.GeneratedMaterial>,
    id : Text,
  ) : ?CommonTypes.GeneratedMaterial {
    materials.find(func(m) { m.id == id });
  };

  // ── Seed ────────────────────────────────────────────────────────────────────

  public func seedProducts(products : Map.Map<Text, Types.Product>) : () {
    let data : [Types.Product] = [
      // ── Moku Go ──────────────────────────────────────────────────────────
      {
        id = "moku-go";
        name = "Moku Go";
        tagline = "Affordable, portable multi-instrument platform for education, R&D, and field use";
        spec = {
          bandwidth = "30 MHz";
          adcBits = 12;
          channels = 2;
          sampleRate = "125 MSa/s";
          formFactor = "Pocket-sized, USB-C powered";
          connectivity = "USB-C, Wi-Fi";
          voltage = "±1 V to ±10 V input range";
        };
        instruments = [
          "Oscilloscope",
          "Waveform Generator",
          "Signal Generator",
          "PID Controller",
          "Lock-in Amplifier",
          "Data Logger",
          "Spectrum Analyzer",
          "Frequency Response Analyzer",
        ];
        useCases = [
          "University lab experiments and student projects",
          "Sensor characterisation and feedback control",
          "Low-frequency signal analysis up to 30 MHz",
          "PID tuning for motors, thermal loops, optical stabilisation",
          "Phase-sensitive detection for weak signal recovery",
          "Long-duration data logging for environmental monitoring",
          "Education: replacing racks of dedicated bench instruments",
          "Basic frequency-domain analysis and Bode plots",
        ];
      },

      // ── Moku Pro ─────────────────────────────────────────────────────────
      {
        id = "moku-pro";
        name = "Moku Pro";
        tagline = "High-performance FPGA-based platform for advanced research and OEM integration";
        spec = {
          bandwidth = "600 MHz";
          adcBits = 16;
          channels = 4;
          sampleRate = "1.25 GSa/s";
          formFactor = "Compact desktop / rack-mountable";
          connectivity = "10 GbE, USB, Wi-Fi";
          voltage = "±0.5 V to ±4 V input range";
        };
        instruments = [
          "Oscilloscope",
          "Waveform Generator",
          "Arbitrary Waveform Generator",
          "Signal Generator",
          "PID Controller",
          "Lock-in Amplifier",
          "Data Logger",
          "Spectrum Analyzer",
          "Frequency Response Analyzer",
          "Phase Lock Loop",
          "Multi-Instrument Mode",
          "Real-Time Signal Processing",
          "Digital Filter Box",
          "Laser Lock Box",
        ];
        useCases = [
          "Coherent optical communications — modulation and BER testing",
          "RF signal synthesis up to 600 MHz for radar prototyping",
          "Multi-channel synchronised data acquisition",
          "FMCW radar waveform generation and intermediate frequency capture",
          "Phase-noise characterisation for VCOs and PLLs",
          "Laser frequency stabilisation with Pound-Drever-Hall locking",
          "Atomic clock / frequency reference validation",
          "Software-defined radio (SDR) research and prototyping",
          "Multi-instrument simultaneous operation on 4 channels",
          "Advanced PID for cryogenic and nanopositioning systems",
        ];
      },

      // ── Moku Delta ───────────────────────────────────────────────────────
      {
        id = "moku-delta";
        name = "Moku Delta";
        tagline = "Ultra-high-bandwidth platform for quantum, defence, and cutting-edge research";
        spec = {
          bandwidth = "2 GHz analog bandwidth";
          adcBits = 14;
          channels = 4;
          sampleRate = "5 GSa/s";
          formFactor = "Rack-mount, precision chassis";
          connectivity = "100 GbE, USB-C";
          voltage = "±0.5 V to ±2 V input range";
        };
        instruments = [
          "Ultra-Fast Oscilloscope (2 GHz)",
          "Advanced Arbitrary Waveform Generator",
          "Advanced Signal Processing Engine",
          "Quantum Control Waveform Sequencer",
          "Optical Communications Tester",
          "Phase Lock Loop (Advanced)",
          "Lock-in Amplifier (Ultra-fast)",
          "Spectrum Analyzer (DC–2 GHz)",
          "Real-Time Signal Processor",
          "Pulse Generator",
        ];
        useCases = [
          "Qubit control: spin-echo, dynamical decoupling, gate pulse generation",
          "Quantum state measurement and readout at microwave frequencies",
          "Optical coherence tomography signal processing",
          "100G/400G coherent optical transceiver testing",
          "Electronic Warfare: fast-chirp jamming signal generation",
          "Threat simulation waveforms for EW test benches",
          "AESA radar T/R module characterisation at 2 GHz",
          "Ultra-wideband (UWB) signal generation and capture",
          "Photonic integrated circuit (PIC) test and measurement",
          "Cryogenic qubit lab: low-latency feedback for error correction",
        ];
      },
    ];

    for (p in data.values()) {
      products.add(p.id, p);
    };
  };

  public func seedVerticals(verticals : Map.Map<Text, Types.IndustryVertical>) : () {
    let data : [Types.IndustryVertical] = [
      // ── Aerospace and Defense ─────────────────────────────────────────────
      {
        id = "aerospace-defense";
        name = "Aerospace and Defense";
        overview = "High-reliability signal generation, capture, and analysis for radar, EW, avionics, and satellite payloads. Requirements: MIL-SPEC accuracy, wide bandwidth, synchronised multi-channel operation, real-time processing.";
        painAreas = [
          "FMCW and pulse-Doppler radar waveform generation and validation",
          "Radar target simulation and range-Doppler testing",
          "Electronic Warfare (EW) — jamming signal generation and threat simulation",
          "Receiver sensitivity testing and spurious emissions measurement",
          "Avionics bus (MIL-STD-1553, ARINC-429) signal integrity",
          "RF front-end characterisation for GaN PAs and LNAs",
          "Synchronised multi-channel phase-coherent capture",
          "High-speed ADC/DAC evaluation for radar signal chains",
        ];
        solutionMappings = [
          {
            painArea = "FMCW radar waveform generation and validation";
            mokModel = "moku-pro";
            instruments = ["Arbitrary Waveform Generator", "Frequency Response Analyzer", "Spectrum Analyzer"];
            description = "Moku Pro's 600 MHz AWG generates precise FMCW chirp waveforms; simultaneous spectrum capture validates linearity and spurious levels. Multi-instrument mode enables transmit + receive on the same chassis.";
          },
          {
            painArea = "Electronic Warfare jamming and threat simulation";
            mokModel = "moku-delta";
            instruments = ["Advanced Arbitrary Waveform Generator", "Pulse Generator", "Ultra-Fast Oscilloscope"];
            description = "Moku Delta's 2 GHz AWG synthesises fast-chirp and noise jamming waveforms at sub-nanosecond timing resolution, enabling EW test bench threat libraries without expensive dedicated hardware.";
          },
          {
            painArea = "RF PA/LNA characterisation";
            mokModel = "moku-pro";
            instruments = ["Frequency Response Analyzer", "Waveform Generator", "Spectrum Analyzer"];
            description = "Swept S-parameter-style measurements up to 600 MHz. Moku Pro replaces a VNA for first-pass PA gain, phase, and compression point measurements at the bench.";
          },
          {
            painArea = "Synchronised multi-channel radar capture";
            mokModel = "moku-delta";
            instruments = ["Ultra-Fast Oscilloscope", "Real-Time Signal Processor", "Advanced Signal Processing Engine"];
            description = "Four phase-coherent channels at 2 GHz bandwidth enable MIMO radar and phased-array beam-forming experiments with hardware-level synchronisation.";
          },
        ];
      },

      // ── ISRO and Space Research ───────────────────────────────────────────
      {
        id = "isro-space";
        name = "ISRO and Space Research";
        overview = "Indian Space Research Organisation and affiliated space labs require calibrated signal sources, atomic clock validation, power spectral density analysis, and satellite payload testing across RF, microwave, and optical bands.";
        painAreas = [
          "Satellite transponder signal simulation and end-to-end testing",
          "Atomic clock / frequency reference characterisation",
          "Power Spectral Density (PSD) analysis for RF payloads",
          "Doppler simulation for launch vehicle telemetry",
          "Star tracker and IMU sensor output logging",
          "Onboard electronics thermal stress testing (data logging)",
          "Phase noise measurement for onboard oscillators",
          "Ground station receiver calibration",
        ];
        solutionMappings = [
          {
            painArea = "Atomic clock and frequency reference characterisation";
            mokModel = "moku-pro";
            instruments = ["Phase Lock Loop", "Frequency Response Analyzer", "Spectrum Analyzer"];
            description = "Moku Pro's 16-bit ADC and PLL instrument measure frequency stability, phase noise, and Allan deviation of rubidium / hydrogen maser references to validate ISRO satellite clock subsystems.";
          },
          {
            painArea = "Power Spectral Density analysis for RF payloads";
            mokModel = "moku-pro";
            instruments = ["Spectrum Analyzer", "Lock-in Amplifier", "Data Logger"];
            description = "Continuous PSD capture at up to 600 MHz bandwidth characterises satellite transponder noise floors, interference, and spurious products during environmental testing.";
          },
          {
            painArea = "Satellite transponder signal simulation";
            mokModel = "moku-delta";
            instruments = ["Advanced Arbitrary Waveform Generator", "Optical Communications Tester", "Ultra-Fast Oscilloscope"];
            description = "Moku Delta simulates uplink/downlink waveforms at 2 GHz, enabling closed-loop testing of transponder AGC, demodulators, and bit synchronisers in a compact bench setup.";
          },
          {
            painArea = "Ground station receiver calibration";
            mokModel = "moku-pro";
            instruments = ["Signal Generator", "Waveform Generator", "Frequency Response Analyzer"];
            description = "Inject calibrated tones and swept RF signals into ground station low-noise amplifiers, verifying gain flatness and noise figure across operational bands.";
          },
        ];
      },

      // ── Tejas Networks OEM ────────────────────────────────────────────────
      {
        id = "tejas-networks";
        name = "Tejas Networks OEM";
        overview = "Tejas Networks designs and manufactures optical networking equipment (OTN, DWDM, packet-optical). Key challenges: coherent transceiver characterisation, DSP algorithm validation, BER testing, and signal integrity for high-speed optical links.";
        painAreas = [
          "Coherent optical transceiver modulation quality (EVM, constellation)",
          "Bit Error Rate (BER) floor and FEC threshold testing",
          "DWDM channel signal integrity and crosstalk measurement",
          "DSP equaliser algorithm validation (CD, PMD compensation)",
          "Optical amplifier (EDFA) gain and noise figure testing",
          "High-speed DAC/ADC linearity for coherent DSP ASICs",
          "Jitter and phase noise on clock recovery circuits",
          "400G / 800G coherent transceiver bring-up",
        ];
        solutionMappings = [
          {
            painArea = "Coherent optical transceiver modulation quality";
            mokModel = "moku-delta";
            instruments = ["Optical Communications Tester", "Ultra-Fast Oscilloscope", "Advanced Signal Processing Engine"];
            description = "Moku Delta's 2 GHz oscilloscope and optical comms tester captures DP-QPSK / DP-16QAM I/Q waveforms, computes EVM and constellation quality, accelerating 100G/400G transceiver bring-up.";
          },
          {
            painArea = "BER testing and FEC threshold validation";
            mokModel = "moku-delta";
            instruments = ["Advanced Arbitrary Waveform Generator", "Real-Time Signal Processor", "Pulse Generator"];
            description = "Inject stressed patterns and measure pre-FEC BER curves with hardware-real-time processing, reducing test time versus traditional BERT setups for DWDM line-card validation.";
          },
          {
            painArea = "Jitter and phase noise on clock recovery circuits";
            mokModel = "moku-pro";
            instruments = ["Phase Lock Loop", "Spectrum Analyzer", "Oscilloscope"];
            description = "Moku Pro's PLL instrument and 16-bit ADC measure jitter histogram and phase noise of CDR circuits, validating compliance with ITU-T G.8262 synchronisation specs.";
          },
          {
            painArea = "High-speed DAC/ADC linearity for coherent DSP ASICs";
            mokModel = "moku-delta";
            instruments = ["Advanced Arbitrary Waveform Generator", "Ultra-Fast Oscilloscope", "Advanced Signal Processing Engine"];
            description = "Characterise DNL/INL and SFDR of coherent DSP companion ADC/DAC using calibrated multi-tone stimulus from Moku Delta's 5 GSa/s AWG.";
          },
        ];
      },

      // ── Lekha Wireless Networks ───────────────────────────────────────────
      {
        id = "lekha-wireless";
        name = "Lekha Wireless Networks";
        overview = "Lekha Wireless develops 5G NR / Open RAN baseband and PHY layer IP. Challenges include 5G NR waveform validation, MIMO antenna testing, channel emulation, and over-the-air (OTA) performance verification.";
        painAreas = [
          "5G NR waveform generation (Sub-6 GHz FR1) and conformance testing",
          "MIMO channel emulation and antenna correlation testing",
          "PHY layer throughput and latency benchmarking",
          "RF impairment injection (IQ imbalance, phase noise, AWGN)",
          "Open RAN fronthaul (eCPRI) signal quality verification",
          "LDPC / Polar code BER vs SNR performance validation",
          "Baseband clocking and synchronisation (JESD204B) testing",
        ];
        solutionMappings = [
          {
            painArea = "5G NR waveform generation and conformance testing";
            mokModel = "moku-pro";
            instruments = ["Arbitrary Waveform Generator", "Spectrum Analyzer", "Multi-Instrument Mode"];
            description = "Upload 5G NR OFDM waveforms (generated off-line by MATLAB / Python) to Moku Pro's 600 MHz AWG for real-time stimulus, while the spectrum analyzer simultaneously verifies EVM and ACLR compliance.";
          },
          {
            painArea = "RF impairment injection for PHY stress testing";
            mokModel = "moku-pro";
            instruments = ["Waveform Generator", "PID Controller", "Multi-Instrument Mode"];
            description = "Inject controlled IQ imbalance, phase noise, and AWGN using Moku Pro's multi-instrument mode to stress-test Lekha's 5G NR PHY receiver algorithms before silicon tape-out.";
          },
          {
            painArea = "MIMO antenna and channel testing";
            mokModel = "moku-delta";
            instruments = ["Ultra-Fast Oscilloscope", "Advanced Arbitrary Waveform Generator", "Real-Time Signal Processor"];
            description = "Four phase-coherent 2 GHz channels enable simultaneous capture and stimulus of 4×4 MIMO antenna ports, measuring mutual coupling, beam-forming accuracy, and spatial multiplexing gains.";
          },
          {
            painArea = "Baseband clocking and JESD204B synchronisation";
            mokModel = "moku-pro";
            instruments = ["Phase Lock Loop", "Frequency Response Analyzer", "Oscilloscope"];
            description = "Characterise JESD204B clock jitter, subclass 1 SYSREF timing, and multi-device synchronisation using Moku Pro's PLL and FRA instruments at full 600 MHz bandwidth.";
          },
        ];
      },

      // ── Telecom 5G ────────────────────────────────────────────────────────
      {
        id = "telecom-5g";
        name = "Telecom / 5G";
        overview = "Telecom operators and equipment vendors test 5G NR gNodeB baseband, mmWave RF front-ends, spectrum monitoring, and network synchronisation. Requirements include high-dynamic-range ADCs, wide spectrum capture, and precise timing.";
        painAreas = [
          "Baseband IQ data capture and EVM analysis",
          "Spectrum monitoring and interference hunting (sub-6 GHz)",
          "gNodeB timing and synchronisation (PTP / SyncE)",
          "Power amplifier linearity and DPD validation",
          "Small-cell RF front-end (RRH) testing",
          "Link budget and path loss measurement in the field",
        ];
        solutionMappings = [
          {
            painArea = "Spectrum monitoring and interference hunting";
            mokModel = "moku-pro";
            instruments = ["Spectrum Analyzer", "Data Logger", "Multi-Instrument Mode"];
            description = "Moku Pro provides a 600 MHz real-time spectrum analyser with continuous data logging, enabling interference identification and geolocation support for 5G deployment teams.";
          },
          {
            painArea = "Baseband IQ capture and EVM analysis";
            mokModel = "moku-pro";
            instruments = ["Oscilloscope", "Spectrum Analyzer", "Arbitrary Waveform Generator"];
            description = "Capture and analyse baseband I/Q from gNodeB digital front-haul using 16-bit ADC at 1.25 GSa/s; EVM, CCDF, and constellation analysis performed in post-processing.";
          },
          {
            painArea = "Power amplifier DPD validation";
            mokModel = "moku-delta";
            instruments = ["Advanced Arbitrary Waveform Generator", "Ultra-Fast Oscilloscope", "Advanced Signal Processing Engine"];
            description = "Characterise AM-AM / AM-PM curves and validate DPD algorithm performance for 5G NR massive-MIMO PA modules up to 2 GHz bandwidth.";
          },
        ];
      },

      // ── Defense Electronics ───────────────────────────────────────────────
      {
        id = "defense-electronics";
        name = "Defense Electronics";
        overview = "DRDO, BEL, and tier-1 defense electronics integrators require radar signal chain testing, EW system development, secure communication hardware verification, and EMI/EMC test support.";
        painAreas = [
          "Radar signal chain end-to-end test (T/R module, ADC, DSP)",
          "EW system: jamming waveform library generation",
          "Secure communications: encrypted RF link testing",
          "EMI/EMC pre-compliance sweeping",
          "ELINT / SIGINT receiver sensitivity measurement",
          "Directed energy weapon control signal generation",
          "Ruggedised field-deployable instrument requirements",
        ];
        solutionMappings = [
          {
            painArea = "Radar signal chain end-to-end testing";
            mokModel = "moku-pro";
            instruments = ["Arbitrary Waveform Generator", "Oscilloscope", "Spectrum Analyzer", "Frequency Response Analyzer"];
            description = "Moku Pro generates pulse / CW / FMCW radar waveforms, injects into the DUT signal chain, and captures the processed output simultaneously — replacing three separate instruments with one USB-C powered box.";
          },
          {
            painArea = "EW jamming waveform library generation";
            mokModel = "moku-delta";
            instruments = ["Advanced Arbitrary Waveform Generator", "Pulse Generator", "Real-Time Signal Processor"];
            description = "Moku Delta's 2 GHz AWG stores and replays a library of barrage, spot, and sweep jamming waveforms at hardware speed, supporting EW system hardware-in-the-loop test benches.";
          },
          {
            painArea = "EMI/EMC pre-compliance sweeping";
            mokModel = "moku-pro";
            instruments = ["Spectrum Analyzer", "Frequency Response Analyzer", "Data Logger"];
            description = "Perform conducted and radiated emission pre-scans up to 600 MHz with continuous data logging — identify problem frequencies before sending hardware to an accredited EMC chamber.";
          },
          {
            painArea = "ELINT/SIGINT receiver sensitivity measurement";
            mokModel = "moku-delta";
            instruments = ["Ultra-Fast Oscilloscope", "Spectrum Analyzer (DC-2 GHz)", "Advanced Signal Processing Engine"];
            description = "Characterise minimum detectable signal, dynamic range, and pulse-on-pulse detection capability of ELINT/SIGINT receivers using calibrated wideband stimulus from Moku Delta.";
          },
        ];
      },

      // ── Quantum Computing ─────────────────────────────────────────────────
      {
        id = "quantum-computing";
        name = "Quantum Computing";
        overview = "Quantum research labs (IISc, TIFR, BARC, and global OEMs) require ultra-low-latency qubit control, real-time feedback for error correction, and precise microwave pulse shaping for gate operations.";
        painAreas = [
          "Qubit control: spin-echo and dynamical decoupling pulse generation",
          "Quantum state measurement: dispersive readout pulse sequencing",
          "Real-time qubit feedback for active error correction",
          "Calibration of qubit frequency and anharmonicity",
          "Two-qubit gate (CNOT, CZ) pulse optimisation",
          "Qubit coherence time (T1, T2) measurement",
          "Cryostat control: dilution fridge auxiliary instrument interfaces",
          "Optical qubit labs: laser locking and stabilisation",
        ];
        solutionMappings = [
          {
            painArea = "Qubit control pulse generation (spin-echo, DRAG)";
            mokModel = "moku-delta";
            instruments = ["Quantum Control Waveform Sequencer", "Advanced Arbitrary Waveform Generator", "Pulse Generator"];
            description = "Moku Delta's quantum sequencer generates DRAG-optimised Gaussian pulses and spin-echo sequences with sub-ns timing precision, directly driving IQ modulators connected to qubit chips at GHz drive frequencies.";
          },
          {
            painArea = "Dispersive readout and quantum state measurement";
            mokModel = "moku-delta";
            instruments = ["Advanced Arbitrary Waveform Generator", "Real-Time Signal Processor", "Lock-in Amplifier (Ultra-fast)"];
            description = "Synthesise readout pulses and capture homodyne / heterodyne readout signals with hardware real-time signal processing — enabling single-shot qubit state discrimination within microseconds.";
          },
          {
            painArea = "T1, T2 coherence time measurement";
            mokModel = "moku-pro";
            instruments = ["Arbitrary Waveform Generator", "Lock-in Amplifier", "Data Logger"];
            description = "Automate Rabi oscillation, T1 inversion recovery, and Ramsey / spin-echo T2 measurement sequences using Moku Pro scripting API — logging hundreds of coherence traces overnight unattended.";
          },
          {
            painArea = "Laser locking and stabilisation for optical qubits";
            mokModel = "moku-pro";
            instruments = ["Laser Lock Box", "PID Controller", "Frequency Response Analyzer"];
            description = "Moku Pro's Laser Lock Box implements Pound-Drever-Hall (PDH) locking with sub-kHz linewidth; the FRA characterises the servo bandwidth — essential for ion trap and neutral atom qubit experiments.";
          },
        ];
      },
    ];

    for (v in data.values()) {
      verticals.add(v.id, v);
    };
  };
};
