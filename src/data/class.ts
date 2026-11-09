export type Check = {
  prompt: string;
  choices: string[];
  answer: number;
  why: string;
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  lead: string;
  points: string[];
  picture: "people" | "license" | "radio" | "bands" | "hill" | "hello" | "rules" | "later";
  check: Check;
};

export const LESSONS: Lesson[] = [
  {
    id: "what",
    title: "What ham radio is",
    minutes: 4,
    lead: "Ham radio is a way for ordinary people to talk to each other by radio, without a phone company in the middle.",
    points: [
      "You use a radio you own. The other person uses a radio they own. The signal goes through the air.",
      "It is a hobby, a skill, and a public service. People use it to chat, to experiment, and to help when phones and internet fail.",
      "It is not your cell phone, and it is not CB. In the United States you need a license from the FCC before you transmit.",
      "Listening is always allowed. The license is for talking.",
    ],
    picture: "people",
    check: {
      prompt: "What is ham radio, in one sentence?",
      choices: [
        "A phone plan you pay for each month",
        "People talking to each other by radio, with a license",
        "A kind of Wi-Fi router",
      ],
      answer: 1,
      why: "Ham radio is licensed two-way radio between people. No monthly plan. No phone company carrying the call.",
    },
  },
  {
    id: "who",
    title: "Who it is for",
    minutes: 3,
    lead: "You do not need to be an engineer. You need curiosity and a license.",
    points: [
      "Some people want a radio in the car or a small handheld for the neighborhood and for storms.",
      "Some people want to reach other countries. Some build antennas. Some help at public events.",
      "The entry license is called Technician. It is the first step. You can stop there and still have a full, useful radio life on local airwaves.",
      "You will not be tested on Morse code. That requirement ended years ago.",
    ],
    picture: "people",
    check: {
      prompt: "Do you have to know Morse code to get a Technician license?",
      choices: ["Yes, it is still required", "No"],
      answer: 1,
      why: "Morse code is a skill some hams enjoy. It is not on the test, and you do not need it to get on the air.",
    },
  },
  {
    id: "license",
    title: "The license, and nothing else",
    minutes: 4,
    lead: "The test is smaller than it feels when you look at the whole book.",
    points: [
      "The Technician exam is 35 multiple-choice questions. You need 26 right. That is it.",
      "A team of volunteer examiners gives the test. You do not go to a government office.",
      "When you pass, the FCC gives you a call sign. That call sign is your name on the air.",
      "The license lasts 10 years. The privileges you get are written down. You do not have to memorize the whole radio universe on day one.",
    ],
    picture: "license",
    check: {
      prompt: "How many questions do you need right, out of 35?",
      choices: ["All 35", "26", "18"],
      answer: 1,
      why: "26 out of 35. You are allowed to miss 9. The book is a pool of questions. The test only uses 35 of them.",
    },
  },
  {
    id: "radio",
    title: "What a radio does",
    minutes: 4,
    lead: "A radio does two jobs. It sends, and it listens.",
    points: [
      "When you talk, the radio turns your voice into a radio wave and lets it go.",
      "When you listen, it catches a wave and turns it back into sound.",
      "The same idea is in a tiny handheld and in a big radio on a desk. The size changes the reach, not the basic job.",
      "You will hear the words transmitter, receiver, and transceiver. A transceiver is simply both jobs in one box.",
    ],
    picture: "radio",
    check: {
      prompt: "A transceiver is…",
      choices: [
        "A radio that only listens",
        "A radio that sends and listens",
        "The license itself",
      ],
      answer: 1,
      why: "Transceiver means transmitter plus receiver. Most ham radios you will buy are transceivers.",
    },
  },
  {
    id: "bands",
    title: "Channels, without the math",
    minutes: 4,
    lead: "A frequency is a spot on the dial. A band is a neighborhood of spots.",
    points: [
      "Two people who want to talk have to be on the same spot, or they will not hear each other.",
      "Hams talk about bands by a length: 2 meters, 70 centimeters, 10 meters. The name is a nickname for that neighborhood.",
      "2 meters and 70 centimeters are the local bands. A handheld lives there. That is where most new Technicians start.",
      "Longer-distance bands exist. You do not need them for the first week. The book will introduce them when you are ready.",
    ],
    picture: "bands",
    check: {
      prompt: "Where does a new Technician usually start?",
      choices: [
        "A handheld on the local 2 meter and 70 centimeter bands",
        "A huge shortwave station on day one",
        "Any frequency they feel like",
      ],
      answer: 0,
      why: "A small handheld on 2 meters and 70 centimeters is the normal first radio. You stay inside the places your license allows.",
    },
  },
  {
    id: "repeater",
    title: "The helper on the hill",
    minutes: 4,
    lead: "A handheld does not reach very far by itself. A repeater fixes that.",
    points: [
      "A repeater is a radio on a tall building or a hill. It hears you and sends you back out, louder and higher.",
      "You listen on one frequency and talk on another. The radio remembers the split. You do not do the math in your head.",
      "Many repeaters want a quiet tone so they know you meant to use them. That tone is called CTCSS. Your radio sends it. You usually cannot hear it.",
      "If you and the other person can hear each other without the repeater, you can move to the same frequency and leave the hilltop free. That is called simplex.",
    ],
    picture: "hill",
    check: {
      prompt: "What is a repeater for?",
      choices: [
        "To make a handheld reach farther",
        "To replace your license",
        "To play music",
      ],
      answer: 0,
      why: "A repeater hears a small radio and retransmits it from up high. That is why a handheld can talk across a town.",
    },
  },
  {
    id: "first",
    title: "Your first time talking",
    minutes: 4,
    lead: "The first contact is short. You do not give a speech.",
    points: [
      "Listen first. If someone is already talking, wait.",
      "On a repeater, say your call sign. That is the whole introduction. Someone will answer, or they will not. Both are normal.",
      "Speak plainly. Say your name if you want. Say where you are if you want. Then say your call sign again when you are done.",
      "Leave a short pause between transmissions so someone else can break in.",
    ],
    picture: "hello",
    check: {
      prompt: "What do you do before you transmit?",
      choices: ["Listen", "Talk immediately so people know you are there", "Send music"],
      answer: 0,
      why: "Listen first. Then say your call sign. A call sign is enough to start.",
    },
  },
  {
    id: "rules",
    title: "The few rules that matter first",
    minutes: 4,
    lead: "The rule book is long. Day one only needs four ideas.",
    points: [
      "Say your call sign every 10 minutes during a conversation, and again at the end.",
      "Stay on frequencies your license allows. A Technician has a lot of local room. The HF voice slice is small. The sheets list it when you want it.",
      "No music. No business. No hiding what you are saying. Be decent.",
      "Use the least power that still makes the contact. A handheld at low power is often enough.",
    ],
    picture: "rules",
    check: {
      prompt: "How often do you say your call sign during a conversation?",
      choices: ["Every 10 minutes, and at the end", "Only once a year", "Never, if you already said hello"],
      answer: 0,
      why: "Every 10 minutes, and when you finish. That is how other people know who is on the air.",
    },
  },
  {
    id: "next",
    title: "What to study next",
    minutes: 3,
    lead: "You do not study the whole book at once. You study the next small piece.",
    points: [
      "If the book is open to electrical ideas and it feels like noise, use the Water, Metrics, and Ohm buttons in this app. Those are the same ideas, as pictures.",
      "The printed sheets are a reference, not a lesson. Look at one sheet after you have met the idea. Do not start there.",
      "A quiz is useful after a chapter, not before. Missing questions is how you find the next thing to learn. It is not a grade on you.",
      "A good session is one lesson here, then one short chapter or one video on that same idea. Then stop.",
    ],
    picture: "later",
    check: {
      prompt: "When is a quiz most useful?",
      choices: [
        "After you have met the idea, to see what stuck",
        "Before you know any of the words, as a surprise",
        "Instead of ever learning the idea",
      ],
      answer: 0,
      why: "A quiz shows the gap. It works after a lesson. It feels cruel before one. One idea, then a few questions, then rest.",
    },
  },
];
