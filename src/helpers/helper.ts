export function shuffle(array) {
  let currentIndex = array.length; let temporaryValue; let
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    // eslint-disable-next-line no-param-reassign
    array[currentIndex] = array[randomIndex];
    // eslint-disable-next-line no-param-reassign
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function weightedValue(weight, value) {
  let weightValue = 0;
  if (weight === '2X') {
    weightValue = value * 2;
  } else if (weight === 'Inverse 1x') {
    weightValue = 11 - value;
  } else {
    weightValue = value;
  }
  return weightValue;
}

export const mappingMessages = {
  Joyful: {
    type: 'sprint_feelings',
    0: 'suggestion_messages',
    1: 'suggestion_messages',
    2: 'suggestion_messages',
    3: 'suggestion_messages',
    4: 'suggestion_messages',
    5: 'suggestion_messages',
    6: 'suggestion_messages',
    7: 'appreciation_messages',
    8: 'appreciation_messages',
    9: 'appreciation_messages',
    10: 'appreciation_messages',
  },
  Irritable: {
    type: 'sprint_feelings',
    0: 'suggestion_messages',
    1: 'appreciation_messages',
    2: 'appreciation_messages',
    3: 'suggestion_messages',
    4: 'suggestion_messages',
    5: 'suggestion_messages',
    6: 'suggestion_messages',
    7: 'suggestion_messages',
    8: 'suggestion_messages',
    9: 'suggestion_messages',
    10: 'suggestion_messages',
  },
  Motivated: {
    type: 'sprint_behaviour',
    0: 'suggestion_messages',
    1: 'suggestion_messages',
    2: 'suggestion_messages',
    3: 'suggestion_messages',
    4: 'suggestion_messages',
    5: 'suggestion_messages',
    6: 'suggestion_messages',
    7: 'appreciation_messages',
    8: 'appreciation_messages',
    9: 'appreciation_messages',
    10: 'appreciation_messages',
  },
  Social: {
    type: 'sprint_behaviour',
    0: 'suggestion_messages',
    1: 'suggestion_messages',
    2: 'suggestion_messages',
    3: 'suggestion_messages',
    4: 'suggestion_messages',
    5: 'suggestion_messages',
    6: 'suggestion_messages',
    7: 'appreciation_messages',
    8: 'appreciation_messages',
    9: 'appreciation_messages',
    10: 'appreciation_messages',
  },
  Anxious: {
    type: 'sprint_feelings',
    0: 'suggestion_messages',
    1: 'appreciation_messages',
    2: 'appreciation_messages',
    3: 'suggestion_messages',
    4: 'suggestion_messages',
    5: 'suggestion_messages',
    6: 'suggestion_messages',
    7: 'suggestion_messages',
    8: 'suggestion_messages',
    9: 'suggestion_messages',
    10: 'suggestion_messages',
  },
  Optimistic: {
    type: 'sprint_behaviour',
    0: 'suggestion_messages',
    1: 'suggestion_messages',
    2: 'suggestion_messages',
    3: 'suggestion_messages',
    4: 'suggestion_messages',
    5: 'suggestion_messages',
    6: 'suggestion_messages',
    7: 'appreciation_messages',
    8: 'appreciation_messages',
    9: 'appreciation_messages',
    10: 'appreciation_messages',
  },
  Active: {
    type: 'sprint_behaviour',
    0: 'suggestion_messages',
    1: 'suggestion_messages',
    2: 'suggestion_messages',
    3: 'suggestion_messages',
    4: 'suggestion_messages',
    5: 'suggestion_messages',
    6: 'suggestion_messages',
    7: 'appreciation_messages',
    8: 'appreciation_messages',
    9: 'appreciation_messages',
    10: 'appreciation_messages',
  },
};

export const pieLogic = {
  0: 5,
  1: 5,
  2: 4,
  3: 3,
  4: 2,
  5: 1,
  6: 1,
  7: 2,
  8: 3,
  9: 4,
  10: 5,
};

export const EMOTIONS_MASTER = [
  {
    emotion: 'Anxious', color: '#6A2EDF', sColor: '#BA81FF', cColor: '#BA81FF',
  },
  {
    emotion: 'Irritable', color: '#F00046', sColor: '#FFEE00', cColor: '#FF2267',
  },
  {
    emotion: 'Joyful', color: '#006CFF', sColor: '#00EAFF', cColor: '#00BBFF',
  },
  {
    emotion: 'Optimistic', color: '#006CFF', sColor: '#00EAFF', cColor: '#00BBFF',
  },
  {
    emotion: 'Motivated', color: '#007026', sColor: '#75FF00', cColor: '#5CC900',
  },
  {
    emotion: 'Active', color: '#007026', sColor: '#75FF00', cColor: '#5CC900',
  },
  {
    emotion: 'Social', color: '#FF07BF', sColor: '#FD83F2', cColor: '#E619D4',
  },
];

export const EMOTIONS = {
  anxious: {
    slider: ['Anxious', 'Stressed', 'Nervous'],
    pie: ['Anxiety'],
    dailyChart: ['Stressed', 'Anxious', 'Calm'],
    prePieMessage: ["your fear of dangers and threats in the future"]
  },
  irritable: {
    slider: ['Irritable', 'Angry', 'Annoyed'],
    pie: ['Anger'],
    dailyChart: ['Angry', 'Irritable', 'Peaceful'],
    prePieMessage: ["when something blocks you or when you think you're being treated unfairly"]
  },
  joyful: {
    slider: ['Joyful', 'Happy', 'Excited'],
    pie: ['Joy'],
    dailyChart: ['Joyful', 'Sad', 'Happy'],
    prePieMessage: ["while higher state of Joy is good feeling and enjoyment, the lower state of Joy is sadness"]
  },
  optimistic: {
    slider: ['Optimistic', 'Positive'],
    pie: ['Joy'],
    dailyChart: ['Joyful', 'Sad', 'Happy'],
    prePieMessage: ["while higher state of Joy is good feeling and enjoyment, the lower state of Joy is sadness"]
  },
  motivated: {
    slider: ['Motivated', 'Engaged', 'Successful'],
    pie: ['Motivation'],
    dailyChart: ['Motivated', 'Low', 'Active'],
    prePieMessage: ["behaving positive, healthy, engaged and working towards success"]
  },
  active: {
    slider: ['Active', 'Energetic', 'Healthy'],
    pie: ['Motivation'],
    dailyChart: ['Motivated', 'Low', 'Active'],
    prePieMessage: ["behaving positive, healthy, engaged and working towards success"]
  },
  social: {
    slider: ['Social', 'Friendly', 'Empathetic'],
    pie: ['Social'],
    dailyChart: ['Social', 'Relationships', 'Friendly'],
    prePieMessage: ["all about your relationships and interaction with people in your life"]
  },
};
