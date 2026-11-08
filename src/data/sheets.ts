export type CheatSheet = {
  id: string;
  title: string;
  line: string;
  image: string;
};

/** One printed page each. Pictures live in public/sheets. */
export const SHEETS: CheatSheet[] = [
  {
    id: "formulas",
    title: "Formulas",
    line: "Ohm’s law, power, prefixes, and decibels.",
    image: "/sheets/formulas.png",
  },
  {
    id: "electrical",
    title: "Electrical",
    line: "Volts, amps, ohms, AC and DC, series and parallel.",
    image: "/sheets/electrical.png",
  },
  {
    id: "rules",
    title: "Rules",
    line: "License, where a Technician may transmit, what not to do.",
    image: "/sheets/rules.png",
  },
  {
    id: "operating",
    title: "Operating",
    line: "Repeaters, simplex, calling frequencies, Q signals.",
    image: "/sheets/operating.png",
  },
  {
    id: "propagation",
    title: "Propagation",
    line: "Skip, line of sight, wavelength, polarization.",
    image: "/sheets/propagation.png",
  },
  {
    id: "station",
    title: "Station",
    line: "SWR, tuners, coax, meters, RF exposure.",
    image: "/sheets/station.png",
  },
  {
    id: "parts",
    title: "Parts",
    line: "Schematic symbols and what each part does.",
    image: "/sheets/parts.png",
  },
  {
    id: "gear",
    title: "Gear",
    line: "Receivers, interference, and what to check first.",
    image: "/sheets/gear.png",
  },
  {
    id: "modes",
    title: "Modes",
    line: "CW, SSB, FM, digital, and satellites.",
    image: "/sheets/modes.png",
  },
  {
    id: "antennas",
    title: "Antennas",
    line: "Dipoles, verticals, beams, and feed line.",
    image: "/sheets/antennas.png",
  },
  {
    id: "safety",
    title: "Safety",
    line: "Power lines, RF exposure, lightning, and shock.",
    image: "/sheets/safety.png",
  },
];
