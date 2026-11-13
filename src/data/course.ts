import { LESSONS, type Check } from "@/data/class";
import { QUESTIONS } from "@/data/questions";

export type Lecture = {
  id: string;
  title: string;
  minutes: number;
  lead: string;
  points: string[];
  check: Check;
};

export type QuizItem = Check;

export type Week = {
  number: number;
  title: string;
  about: string;
  outcomes: string[];
  minutes: number;
  ready: boolean;
  lectures: Lecture[];
  quiz: QuizItem[];
  pass: number;
};

export const COURSE = {
  title: "Ham Radio Technician: From Zero to the Exam",
  subtitle: "Six weeks. About two hours a week. No Morse. 26 of 35 is a pass.",
};

function fromLesson(id: string): Lecture {
  const lesson = LESSONS.find((item) => item.id === id);
  if (!lesson) throw new Error(`Missing lesson ${id}`);
  return {
    id: lesson.id,
    title: lesson.title,
    minutes: lesson.minutes,
    lead: lesson.lead,
    points: lesson.points,
    check: lesson.check,
  };
}

const examDay: Lecture = {
  id: "exam-day",
  title: "What test day looks like",
  minutes: 4,
  lead: "The test is smaller than the book. You sit with volunteer examiners, not at a government office.",
  points: [
    "35 multiple-choice questions. You need 26 right. You may miss 9.",
    "Bring a photo ID and the fee the session lists. A pencil is usually provided. Calculators are often allowed if they have no stored text.",
    "You find out if you passed before you leave. The FCC call sign usually shows in the database within a few days. You wait for that before you transmit.",
    "Sessions are run by local clubs. Search “ARRL exam session” plus your city when you are ready. You do not need to book one in week 1.",
  ],
  check: {
    prompt: "Where do you take the Technician exam?",
    choices: [
      "At a volunteer examiner session, usually run by a local club",
      "At an FCC office",
      "Online, with no one watching",
    ],
    answer: 0,
    why: "Volunteer examiners give the test. You do not go to a government office. The call sign arrives after you pass, not the same minute.",
  },
};

const week2: Lecture[] = [
  {
    id: "handheld",
    title: "The first radio",
    minutes: 5,
    lead: "A handheld is enough for the first year. You do not need a desk radio or a tower.",
    points: [
      "Look for a 2 meter and 70 centimeter handheld, often marked VHF/UHF or 144/440. Five watts is plenty for local repeaters.",
      "A rubber-duck antenna is fine for listening and for nearby repeaters. Height and a clear view matter more than a bigger radio.",
      "You can buy one before the license. You may listen the day it arrives. You may not press the talk button until your call sign is in the FCC database.",
      "Skip the extras for now: digital voice, GPS, and a second battery can wait. A charger and the manual are the whole kit.",
    ],
    check: {
      prompt: "What may you do with a new handheld before the call sign arrives?",
      choices: ["Listen", "Transmit on 146.520", "Use a repeater if you speak quietly"],
      answer: 0,
      why: "Listening is always legal. Transmitting waits for a license that shows in the FCC database.",
    },
  },
  {
    id: "listen",
    title: "How to listen",
    minutes: 4,
    lead: "The first skill is hearing other people. You learn the rhythm before you ever talk.",
    points: [
      "Turn the squelch up until the hiss stops, then back down a little. Too much squelch hides weak stations.",
      "Volume only changes your speaker. It does not change what anyone else hears.",
      "Stay on one frequency for ten minutes. Notice who identifies, how long they talk, and the pause they leave.",
      "NOAA weather radio is legal listening practice if the ham bands are quiet. It is not a ham frequency. Do not transmit there.",
    ],
    check: {
      prompt: "What does the volume knob change?",
      choices: ["Only your speaker", "Your transmit power", "The repeater’s tone"],
      answer: 0,
      why: "Volume is local. Power, frequency, and tone are separate controls.",
    },
  },
  {
    id: "local",
    title: "The repeaters near you",
    minutes: 5,
    lead: "A repeater is a radio on a hill that hears you and retransmits you. Local ones are listed, not secret.",
    points: [
      "Near Kent, a commonly listed 2 meter repeater is 146.895 MHz, minus offset, tone 118.8, call sign K8IV. Confirm it on RepeaterBook before you rely on it. Listings change.",
      "The radio listens on 146.895. When you press the button it jumps down 600 kHz, talks, and jumps back. You set the offset and the tone once.",
      "146.520 MHz is the 2 meter calling frequency. Both people use that same frequency. No tone. Do not sit there for a long chat.",
      "Akron and Cleveland have more. One local repeater is enough for the first month.",
    ],
    check: {
      prompt: "On a repeater, the offset is…",
      choices: [
        "The difference between the frequency you hear and the frequency you transmit on",
        "How loud the speaker is",
        "Your call sign",
      ],
      answer: 0,
      why: "2 meters usually uses a 600 kHz offset. The radio does the jump. The tone, if required, is what opens the repeater.",
    },
  },
  {
    id: "script",
    title: "A script for the first contact",
    minutes: 4,
    lead: "You do not need a speech. You need four short sentences and a pause.",
    points: [
      "Listen for 30 seconds. If someone is talking, wait.",
      "Press the button, pause one second, and say your call sign. Release the button.",
      "If someone answers, say your name, say you are new, and say your call sign again. Then release.",
      "If no one answers, wait a minute and try once more. Silence is normal. It is not a grade.",
    ],
    check: {
      prompt: "What is enough to start a contact on a repeater?",
      choices: ["Your call sign", "A long introduction and your address", "CQ CQ CQ, then your life story"],
      answer: 0,
      why: "Say the call sign. Leave a pause. Someone answers, or they do not. Both are a normal first night.",
    },
  },
];

// Helper to turn a QUESTIONS entry into a QuizItem
function q(id: string): QuizItem {
  const item = QUESTIONS.find((x) => x.id === id);
  if (!item) throw new Error(`Missing question ${id}`);
  return { prompt: item.prompt, choices: item.choices, answer: item.answer, why: item.why };
}

export const WEEKS: Week[] = [
  {
    number: 1,
    title: "What this is",
    about: "Ham radio, who it is for, and what the test actually is. You can stop after any lecture.",
    outcomes: [
      "Say what ham radio is, in one sentence.",
      "Name the passing score: 26 of 35.",
      "Know that listening is legal before the license, and transmitting is not.",
    ],
    minutes: 45,
    ready: true,
    lectures: ["what", "who", "license", "radio", "bands", "repeater", "first", "rules", "next"].map(fromLesson).concat(examDay),
    pass: 6,
    quiz: [
      {
        prompt: "Ham radio is…",
        choices: ["A monthly phone plan", "Licensed two-way radio between people", "The same as CB"],
        answer: 1,
        why: "You own the radio. The other person owns theirs. The signal goes through the air. A license is required to transmit.",
      },
      {
        prompt: "How many questions are on the Technician exam, and how many must you get right?",
        choices: ["50, and you need 40", "35, and you need 26", "100, and you need 70"],
        answer: 1,
        why: "35 questions. 26 is a pass. You may miss 9.",
      },
      {
        prompt: "Morse code on the Technician exam is…",
        choices: ["Required", "Not required", "Required only for 2 meters"],
        answer: 1,
        why: "Morse is a hobby some people enjoy. It is not on the test.",
      },
      {
        prompt: "A transceiver is a radio that…",
        choices: ["Only listens", "Sends and listens", "Replaces the license"],
        answer: 1,
        why: "Transmitter plus receiver, in one box.",
      },
      {
        prompt: "Before you transmit, you…",
        choices: ["Listen", "Talk immediately so people know you are there", "Send music"],
        answer: 0,
        why: "Listen first. Then say your call sign.",
      },
      {
        prompt: "You may transmit…",
        choices: [
          "As soon as you finish the book",
          "When your call sign is in the FCC database",
          "On any frequency, if you are polite",
        ],
        answer: 1,
        why: "Passing is not the same moment as being allowed to transmit. Wait for the database.",
      },
      {
        prompt: "2 meters and 70 centimeters are…",
        choices: ["The local bands a handheld uses", "Bands only Generals may use", "Weather-radio channels"],
        answer: 0,
        why: "Those are the neighborhoods a new Technician lives in.",
      },
      {
        prompt: "How often do you say your call sign during a conversation?",
        choices: ["Every 10 minutes, and at the end", "Once a year", "Never, if you already said hello"],
        answer: 0,
        why: "Every 10 minutes, and when you finish.",
      },
    ],
  },
  {
    number: 2,
    title: "Listen first",
    about: "A handheld, legal listening, the repeater near Kent, and a script for the first time you talk.",
    outcomes: [
      "Choose a simple 2 meter / 70 centimeter handheld.",
      "Listen without transmitting.",
      "Say a first contact in four short sentences.",
    ],
    minutes: 60,
    ready: true,
    lectures: week2,
    pass: 6,
    quiz: [
      {
        prompt: "A good first radio is…",
        choices: [
          "A 2 meter and 70 centimeter handheld",
          "A tower and a desk radio",
          "Any radio, including a weather radio you transmit on",
        ],
        answer: 0,
        why: "A dual-band handheld covers the local bands. A tower can wait.",
      },
      {
        prompt: "Before the call sign arrives, you may…",
        choices: ["Listen", "Transmit on a quiet frequency", "Use the repeater if no one answers"],
        answer: 0,
        why: "Listening is legal. Transmitting is not, until the license is in the database.",
      },
      {
        prompt: "Squelch is for…",
        choices: ["Quieting the hiss until a signal appears", "Raising transmit power", "Changing your call sign"],
        answer: 0,
        why: "Too much squelch also hides weak people. Volume is a different knob.",
      },
      {
        prompt: "146.895 MHz near Kent is an example of…",
        choices: ["A repeater output you listen to", "A frequency you invent", "The NOAA weather channel"],
        answer: 0,
        why: "You listen on the output. The radio jumps to the input when you transmit. Confirm the listing before you rely on it.",
      },
      {
        prompt: "The usual 2 meter repeater offset is…",
        choices: ["600 kHz", "5 MHz", "10 meters"],
        answer: 0,
        why: "600 kHz on 2 meters. 5 MHz is the usual 70 centimeter offset.",
      },
      {
        prompt: "146.520 MHz is…",
        choices: ["The 2 meter FM calling frequency", "A tone", "A General-only band"],
        answer: 0,
        why: "Simplex calling. Both people on the same frequency. Move off if the chat will last.",
      },
      {
        prompt: "To start on a repeater you say…",
        choices: ["Your call sign", "CQ and your home address", "Nothing, the radio identifies you"],
        answer: 0,
        why: "Call sign, pause, wait. That is the whole introduction.",
      },
      {
        prompt: "If no one answers…",
        choices: ["That is normal", "You failed", "You should transmit continuously until someone does"],
        answer: 0,
        why: "Silence is a normal first night. Try once more later. Do not hold the button down.",
      },
    ],
  },
  {
    number: 3,
    title: "The rules you can get wrong",
    about: "Control operator, what you may not send, power, and identifying. These are the rules that cost people points.",
    outcomes: ["Name the control operator.", "List what you may not send.", "Use the least power that works."],
    minutes: 70,
    ready: true,
    lectures: ["control", "forbidden", "oneway", "term", "share", "power", "idextra", "cq"].map(fromLesson),
    pass: 6,
    quiz: [
      {
        prompt: "Who is responsible for the transmissions from a station?",
        choices: ["The control operator", "The person who owns the antenna", "Whoever is closest to the radio"],
        answer: 0,
        why: "The control operator is the licensed person in charge of the station while it is transmitting.",
      },
      {
        prompt: "Which of the following is prohibited on ham radio?",
        choices: ["Casual conversation", "Music broadcasting", "Asking about the weather"],
        answer: 1,
        why: "You may not broadcast music, advertising, or content that is primarily for entertainment like a commercial station.",
      },
      {
        prompt: "A one-way transmission is allowed when…",
        choices: ["You are testing and identify", "You feel like it", "The other station is busy"],
        answer: 0,
        why: "One-way is allowed for testing, telemetry, or when no one is listening, but you still identify.",
      },
      {
        prompt: "A Technician license is valid for…",
        choices: ["10 years", "5 years", "Lifetime"],
        answer: 0,
        why: "Ten years, then you renew. The call sign stays with you.",
      },
      {
        prompt: "If someone is already talking on a frequency, you…",
        choices: ["Wait or ask if you may join", "Transmit over them", "Change your power to full"],
        answer: 0,
        why: "Share the frequency. Listen first. Do not step on another conversation.",
      },
      {
        prompt: "The power rule is…",
        choices: ["Use the least power that gets the job done", "Always use maximum", "5 watts is illegal"],
        answer: 0,
        why: "Minimum necessary power. On VHF/UHF a few watts is usually plenty.",
      },
      {
        prompt: "You must identify…",
        choices: ["Every 10 minutes and at the end", "Only at the start", "Only if asked"],
        answer: 0,
        why: "Call sign every 10 minutes during a contact, and when you finish.",
      },
      {
        prompt: "CQ means…",
        choices: ["I am calling any station", "I am finished", "Emergency"],
        answer: 0,
        why: "CQ is the general call. On VHF/UHF repeaters people usually just say their call sign instead.",
      },
    ],
  },
  {
    number: 4,
    title: "Signals and antennas",
    about: "How far a signal goes, dipole and vertical lengths, polarization, and a Yagi. Why VHF stops at the hill.",
    outcomes: ["Explain line of sight.", "Use 468 divided by megahertz for a dipole.", "Point a beam."],
    minutes: 90,
    ready: true,
    lectures: ["wave", "map", "paths", "modes", "digital", "links", "sight", "sky", "oddpaths", "poles", "antenna", "wires", "yagi"].map(fromLesson),
    pass: 6,
    quiz: [
      {
        prompt: "VHF and UHF signals normally travel…",
        choices: ["Line of sight", "Around the world on the first hop", "Only at night"],
        answer: 0,
        why: "They go in a straight line and stop at hills, buildings, and the horizon. Height helps more than power.",
      },
      {
        prompt: "The length of a half-wave dipole in feet is about…",
        choices: ["468 divided by frequency in MHz", "234 divided by frequency", "Any length is fine"],
        answer: 0,
        why: "468 / MHz for a half-wave dipole. Quarter-wave vertical is half of that.",
      },
      {
        prompt: "A Yagi antenna…",
        choices: ["Points in one direction and has gain", "Radiates equally in all directions", "Is only for HF"],
        answer: 0,
        why: "A beam (Yagi) focuses the signal. You aim it at the station or repeater you want.",
      },
      {
        prompt: "Polarization means…",
        choices: ["Whether the antenna is vertical or horizontal", "The color of the wire", "The tone frequency"],
        answer: 0,
        why: "Hold your antenna the same way the other station does. Most VHF/UHF is vertical.",
      },
      {
        prompt: "HF signals can travel farther because of…",
        choices: ["Reflection from the ionosphere", "Bigger batteries", "Shorter antennas"],
        answer: 0,
        why: "The sky brings HF back down. VHF and UHF mostly do not get that help.",
      },
      {
        prompt: "FM is commonly used on…",
        choices: ["2 meters and 70 centimeters", "Only 80 meters", "Only Morse frequencies"],
        answer: 0,
        why: "FM is the usual mode for local VHF/UHF repeaters and simplex.",
      },
      {
        prompt: "A digital mode like APRS is used for…",
        choices: ["Position and short messages", "High-power voice", "Replacing the license"],
        answer: 0,
        why: "APRS sends location and brief data. Digital voice and satellites are also on the exam.",
      },
      {
        prompt: "The antenna is the part that…",
        choices: ["Turns the radio’s signal into a wave in the air", "Stores the license", "Sets the squelch"],
        answer: 0,
        why: "The radio makes the signal. The antenna radiates it. A better antenna often beats more power.",
      },
    ],
  },
  {
    number: 5,
    title: "Electricity and the station",
    about: "Volts, ohms, watts, parts, coax, SWR, and safety. The numbers and the pictures that appear on the test.",
    outcomes: ["Use Ohm’s law.", "Read a schematic symbol.", "Keep a wire off a power line."],
    minutes: 90,
    ready: true,
    lectures: ["acdc", "ladder", "ohm", "watts", "storage", "parts", "semis", "schematic", "receiver", "bench", "swr", "coax", "rfi", "safe", "exposure", "shop"].map(fromLesson),
    pass: 6,
    quiz: [
      q("t5a01"),
      q("t5a02"),
      q("t5a03"),
      q("t5a05"),
      q("t5a04"),
      {
        prompt: "Ohm’s law says voltage equals…",
        choices: ["Current times resistance", "Current divided by resistance", "Power times resistance"],
        answer: 0,
        why: "E = I × R. The push equals the flow times the squeeze.",
      },
      {
        prompt: "A high SWR usually means…",
        choices: ["The antenna system is not matched", "The battery is full", "You should raise power"],
        answer: 0,
        why: "High SWR means power is reflected back. Check the antenna, coax, and connections. Use a dummy load to test the radio alone.",
      },
      {
        prompt: "Coax is used because…",
        choices: ["It keeps the signal inside the cable", "It is cheaper than wire", "It replaces the antenna"],
        answer: 0,
        why: "Coaxial cable carries the signal from radio to antenna with the shield keeping it contained.",
      },
    ],
  },
  {
    number: 6,
    title: "The practice exam",
    about: "35 questions drawn from the pool. 26 to pass. Then a short checklist for the real session.",
    outcomes: ["Sit a full practice exam.", "Know what to bring.", "See which weeks to review."],
    minutes: 60,
    ready: true,
    lectures: [examDay],
    pass: 26,
    quiz: QUESTIONS.slice(0, 35).map((item) => ({
      prompt: item.prompt,
      choices: item.choices,
      answer: item.answer,
      why: item.why,
    })),
  },
];
