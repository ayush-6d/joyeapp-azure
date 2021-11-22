export function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

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
  if (weight === "2X") {
    weightValue = value * 2;
  } else if (weight === "Inverse 1x") {
    weightValue = 11 - value;
  } else {
    weightValue = value;
  }
  return weightValue;
}

export const mappingMessages = {
  Joyful: {
    type: "sprint_feelings",
    0: "suggestion_messages",
    1: "suggestion_messages",
    2: "suggestion_messages",
    3: "suggestion_messages",
    4: "suggestion_messages",
    5: "suggestion_messages",
    6: "suggestion_messages",
    7: "appreciation_messages",
    8: "appreciation_messages",
    9: "appreciation_messages",
    10: "appreciation_messages",
  },
  Irritable: {
    type: "sprint_feelings",
    0: "suggestion_messages",
    1: "appreciation_messages",
    2: "appreciation_messages",
    3: "suggestion_messages",
    4: "suggestion_messages",
    5: "suggestion_messages",
    6: "suggestion_messages",
    7: "suggestion_messages",
    8: "suggestion_messages",
    9: "suggestion_messages",
    10: "suggestion_messages",
  },
  Motivated: {
    type: "sprint_behaviour",
    0: "suggestion_messages",
    1: "suggestion_messages",
    2: "suggestion_messages",
    3: "suggestion_messages",
    4: "suggestion_messages",
    5: "suggestion_messages",
    6: "suggestion_messages",
    7: "appreciation_messages",
    8: "appreciation_messages",
    9: "appreciation_messages",
    10: "appreciation_messages",
  },
  Social: {
    type: "sprint_behaviour",
    0: "suggestion_messages",
    1: "suggestion_messages",
    2: "suggestion_messages",
    3: "suggestion_messages",
    4: "suggestion_messages",
    5: "suggestion_messages",
    6: "suggestion_messages",
    7: "appreciation_messages",
    8: "appreciation_messages",
    9: "appreciation_messages",
    10: "appreciation_messages",
  },
  Anxious: {
    type: "sprint_feelings",
    0: "suggestion_messages",
    1: "appreciation_messages",
    2: "appreciation_messages",
    3: "suggestion_messages",
    4: "suggestion_messages",
    5: "suggestion_messages",
    6: "suggestion_messages",
    7: "suggestion_messages",
    8: "suggestion_messages",
    9: "suggestion_messages",
    10: "suggestion_messages",
  },
  Optimistic: {
    type: "sprint_behaviour",
    0: "suggestion_messages",
    1: "suggestion_messages",
    2: "suggestion_messages",
    3: "suggestion_messages",
    4: "suggestion_messages",
    5: "suggestion_messages",
    6: "suggestion_messages",
    7: "appreciation_messages",
    8: "appreciation_messages",
    9: "appreciation_messages",
    10: "appreciation_messages",
  },
  Active: {
    type: "sprint_behaviour",
    0: "suggestion_messages",
    1: "suggestion_messages",
    2: "suggestion_messages",
    3: "suggestion_messages",
    4: "suggestion_messages",
    5: "suggestion_messages",
    6: "suggestion_messages",
    7: "appreciation_messages",
    8: "appreciation_messages",
    9: "appreciation_messages",
    10: "appreciation_messages",
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
    emotion: "Anxious",
    color: "#6A2EDF",
    sColor: "#BA81FF",
    cColor: "#BA81FF",
  },
  {
    emotion: "Irritable",
    color: "#F00046",
    sColor: "#FFEE00",
    cColor: "#FF2267",
  },
  {
    emotion: "Joyful",
    color: "#006CFF",
    sColor: "#00EAFF",
    cColor: "#00BBFF",
  },
  {
    emotion: "Optimistic",
    color: "#006CFF",
    sColor: "#00EAFF",
    cColor: "#00BBFF",
  },
  {
    emotion: "Motivated",
    color: "#007026",
    sColor: "#75FF00",
    cColor: "#5CC900",
  },
  {
    emotion: "Active",
    color: "#007026",
    sColor: "#75FF00",
    cColor: "#5CC900",
  },
  {
    emotion: "Social",
    color: "#FF07BF",
    sColor: "#FD83F2",
    cColor: "#E619D4",
  },
];

export const EMOTIONS = {
  anxious: {
    slider: ["How <span>Stressed</span> are you <br/>feeling today?", "How <span>Anxious</span> are you <br/>feeling today?", "How <span>Nervous</span> are you <br/>feeling today?", "How is your <span>Anxiety</span> <br/>level today?", "How is your <span>Stress</span> <br/>level today?"],
    pie: ["Anxiety"],
    dailyChart: ["Stressed", "Anxious", "Calm"],
    prePieMessage: ["your fear of dangers and threats in the future pulls down the wellbeing. A smaller pie is a desirable state to be in. If it is a big pie, you need to manage your anxiety by focusing on actions which are in your control!"],
  },
  irritable: {
    slider: ["How <span>Irritable</span> are you <br/>feeling today?", "How <span>Angry</span> <br />are you feeling today?", "How <span>Annoyed</span> <br/>are you feeing today?","How is your <span>Anger</span> <br/>level today?","How is your <span>Irritability</span> <br/>level today?"],
    pie: ["Anger"],
    dailyChart: ["Angry", "Irritable", "Peaceful"],
    prePieMessage: [" when something blocks you or when you think you're being treated unfairly it impacts your wellbeing. A smaller pie is a great state to be in. If it is big, you need to control your anger immediately!"],
  },
  joyful: {
    slider: ["How <span>Happy</span> are you <br />feeling today?", "How <span>Peaceful</span> are you <br />feeling today?", "How <span>Joyful</span> are you <br/>feeling today?", "How <span>Good</span> are you <br/>feeling today?", "How <span>Good</span> is your <br />day going?", "How <span>Excited</span> are <br />you today?"],
    pie: ["Joyful"],
    dailyChart: ["Joyful", "Sad", "Happy"],
    prePieMessage: ["while the higher state of Joy is a good and desirable feeling, the lower state is sadness. A large pie is helping your overall wellbeing, and vice-as-versa!"],
  },
  optimistic: {
    slider: ["How <span>Optimistic</span> <br/>are you feeling today?", "How <span>Positive</span> <br/>are you feeling today?","How <span>Blessed</span> <br/>are you feeling today?","How is your <span>Positivity</span> <br/>level today?","How is your <span>Optimism</span> <br/>level today?"],
    pie: ["Joyful"],
    dailyChart: ["Joyful", "Sad", "Happy"],
    prePieMessage: ["while the higher state of Joy is a good and desirable feeling, the lower state is sadness. A large pie is helping your overall wellbeing, and vice-as-versa!"],
  },
  motivated: {
    slider: ["How <span>Successful</span> <br/>are you feeling today?", "How <span>Energetic</span> <br/.are you feeling today?", "How is your <span>Energy</span> <br/>level today?","How is your <span>Motivation</span> <br/>level today?","How <span>Motivated</span> <br/>are you feeling today?","How clear are you on your <span>Goals</span><br/>?","How <span>Confident</span> are you feeling today?","How <span>Committed</span> <br/>are you feeling today?"],
    pie: ["Motivation"],
    dailyChart: ["Motivated", "Low", "Active"],
    prePieMessage: ["behaving positive, healthy, engaged and working towards success helps us feel happier and successful. A larger pie size is helping your wellbeing and a smaller one needs attention!"],
  },
  active: {
    slider: ["How <span>Healthy<span/> <br/>are you feeling today?", "How <span>Active</span> <br/>are you feeling today?", "How <span>Fresh</span> <br/>are you feeling today?","How <span>Fit</span> <br/>are you feeling today?","How well did you <span>Sleep</span> <br/>last night?","How good is your <span>Diet</span> <br/>these days?","How much are you <span>Exercising</span> <br/>these days?","How good is your <span>Fitness</span> <br/>level these days?"],
    pie: ["Motivation"],
    dailyChart: ["Motivated", "Low", "Active"],
    prePieMessage: ["behaving positive, healthy, engaged and working towards success helps us feel happier and successful. A larger pie size is helping your wellbeing and a smaller one needs attention!"],
  },
  social: {
    slider: ["How <span>Connected</span> <br/>are you feeling today?", "How <span>Loved</span> <br/>are you feeling today?", "How <span>Social</span> <br/>are you feeling today?","How <span>Kind</span> <br/>are you feeling today?","How <span>Caring</span> <br/>are you feeling today?","How is your <span>Love</span> <br/>quotient today?","How is your <span>Empathy</span> <br/>quotient today?","How is your <span>Social</span> <br/>quotient today?","How is your <span>Relationship</span> <br/>quotient today?"],
    pie: ["Relationships"],
    dailyChart: ["Social", "Relationships", "Friendly"],
    prePieMessage: ["all about your relationships and interaction with people in your life! Good relationships will make the pie bigger and help your overall happiness. If the pie is small, you should immediately get back to rebuilding your relationships!"],
  },
};
