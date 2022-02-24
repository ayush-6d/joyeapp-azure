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
    suggestion_messages:{
      pie: ["Anxiety"],
      prePieMessage: ["worrying over future threats decreases your overall wellbeing. A large purple slice suggests that you should manage your anxiety and direct your attention only toward things that you can control in the present!"],
    },
    appreciation_messages:{
      pie: ["Calm "],
      prePieMessage: ["a smaller purple slice of anxiety indicates that you are calm and collected. Looks like you are ready to make the most of the day!"],
    },
    voice:{
      suggestion_messages:{
        pie: ["Anxiety"],
        prePieMessage: ["worrying over future threats decreases your overall wellbeing. It looks like that you should manage your anxiety and direct your attention only toward things that you can control in the present!"],
      },
      appreciation_messages:{
        pie: ["Calm "],
        prePieMessage: ["It looks like you are calm and collected. Looks like you are ready to make the most of the day!"],
      },
    },
    slider: [
      "How <span>Stressed</span> are you <br/>feeling today?",
      "How <span>Anxious</span> are you <br/>feeling today?", 
      "How <span>Nervous</span> are you <br/>feeling today?",
      "How is your <span>Anxiety</span> <br/>level today?",
      "How is your <span>Stress</span> <br/>level today?",
      "Are you <span> Worried</span> about <br/> something today?",
      "Is something <span>Worrying</span> <br/> you today?",
      "How likely that you may <br/><span>Not finish </span>your tasks today?",
      "How likely that you may <br/> <span>Not succeed</span> in what <br/>you are trying to accomplish?",
      "Have you been <span>Worrying</span> about how things will turn out?",
      "How <span>Concerned</span> are you about the future?",
      "Are you feeling <span>Concerned</span> about the future?", 
      "How  <span>Concerned</span> are you about things not going your way?"
    ],
    pie: ["Stress"],
    dailyChart: ["Stressed", "Anxious", "Calm"],
    prePieMessage: [" your fear of dangers and threats in the future pulls down the wellbeing. A smaller pie is a desirable state to be in. If it is a big pie, you need to manage your anxiety by focusing on actions which are in your control!"],
  },
  irritable: {
    suggestion_messages:{
      pie: ["Angry"],
      prePieMessage: ["feeling frustrated or irritated can lead to impulsive and undesirable behaviour. It’s time to take a moment, take a step back, and become mindful of your emotions."],
    },
    appreciation_messages:{
      pie: ["Composed"],
      prePieMessage: ["a smaller orange pie of anger is great, and you should be feeling in control of your emotions. Keep doing what you’re doing, it is working well for you!"],
    },
    voice: {
      suggestion_messages:{
        pie: ["Angry"],
        prePieMessage: ["feeling frustrated or irritated can lead to impulsive and undesirable behaviour. It’s time to take a moment, take a step back, and become mindful of your emotions."],
      },
      appreciation_messages:{
        pie: ["Composed"],
        prePieMessage: ["It seems like you are feeling in control of your emotions. Keep doing what you’re doing, it is working well for you!"],
      },
    },
    slider: [
      "How <span>Irritable</span> are you <br/>feeling today?",
      "How <span>Angry</span> <br />are you feeling today?",
      "How <span>Annoyed</span> <br/>are you feeing today?",
      "How is your <span>Anger</span> <br/>level today?",
      "How is your <span>Irritability</span> <br/>level today?",
      "Are you <span>Upset</span> <br/>  with someone today?",
      "Are you <span>Upset</span> <br/> with  something today?",
      "Is someone <br/> <span>Irritating</span> you today?",
      "Is something <br/> <span>Irritating</span> you today?",
      "Is someone driving you <br/> <span>Crazy</span> today?",
      "Is something driving you <br/> <span>Crazy</span> today?",
      "Is someone driving  you <br/> <span>Mad</span> today?",
      "Is something driving <br/> you <span>Mad</span> today?",
    ],
    pie: ["Irritability"],
    dailyChart: ["Angry", "Irritable", "Peaceful"],
    prePieMessage: [" when something blocks you or when you think you're being treated unfairly it impacts your wellbeing. A smaller pie is a great state to be in. If it is big, you need to control your anger immediately!"],
  },
  joyful: {
    suggestion_messages:{
      pie: ["Gloomy"],
      prePieMessage: ["a smaller blue slice of joy indicates that you might be feeling a little down. But not to worry, you can get back to where you need to be!"],
    },
    appreciation_messages:{
      pie: ["Joyful"],
      prePieMessage: ["a larger blue slice indicates that you are in a good state of positivity, which should help your overall wellbeing. Keep at it!"],
    },
    voice: {
      suggestion_messages:{
        pie: ["Gloomy"],
        prePieMessage: ["it seems that you might be feeling a little down. But not to worry, you can get back to where you need to be!"],
      },
      appreciation_messages:{
        pie: ["Joyful"],
        prePieMessage: ["it seems that you are in a good state of positivity, which should help your overall wellbeing. Keep at it!"],
      },
    },
    slider:[
      "How <span>Happy</span> are you <br />feeling today?",
      "How <span>Peaceful</span> are you <br />feeling today?",
      "How <span>Joyful</span> are you <br/>feeling today?",
      "How <span>Good</span> are you <br/>feeling today?", 
      "How <span>Good</span> is your <br />day going?",
      "How <span>Excited</span> are <br />you today?",
      "Are you <span>Glad</span> about how<br/> the day is going?",
      "Are you <span>Glad</span> about how<br/> the day is unfolding?", 
      "Are you <span>Happy</span> with the <br/>way things are going?", 
      "Is your day <span>Going well</span> ?",
      "How are you <br/> <span>Feeling</span> today ?",
      "Are you having  a <br/> <span>Good day</span> ?",
      "Is today a <span>Good day</span> ?",
      "Are you having a <span>Great day</span> ?",
      "Is today a  <span>Great day</span> ?"
    ],
    pie: ["Positivity"],
    dailyChart: ["Joyful", "Sad", "Happy"],
    prePieMessage: ["while the higher state of Joy is a good and desirable feeling, the lower state is sadness. A large pie is helping your overall wellbeing, and vice-as-versa!"],
  },
  optimistic: {
    suggestion_messages:{
      pie: ["Gloomy"],
      prePieMessage: ["a smaller blue slice of joy indicates that you might be feeling a little down. But not to worry, you can get back to where you need to be!"],
    },
    appreciation_messages:{
      pie: ["Joyful"],
      prePieMessage: ["a larger blue slice indicates that you are in a good state of positivity, which should help your overall wellbeing. Keep at it!"],
    },
    voice: {
      suggestion_messages:{
        pie: ["Gloomy"],
        prePieMessage: ["it seems that you might be feeling a little down. But not to worry, you can get back to where you need to be!"],
      },
      appreciation_messages:{
        pie: ["Joyful"],
        prePieMessage: ["it seems that you are in a good state of positivity, which should help your overall wellbeing. Keep at it!"],
      },
    },
    slider: [
      "How <span>Optimistic</span> <br/>are you feeling today?",
      "How <span>Positive</span> <br/>are you feeling today?",
      "How <span>Blessed</span> <br/>are you feeling today?",
      "How is your <span>Positivity</span> <br/>level today?",
      "How is your <span>Optimism</span> <br/>level today?",
      "How <span>Grateful</span> are you<br/> feeling today ?",
      "Are you feeling <span>Positive</span><br/> about today?",
      "Are you  <span>Optimistic</span> about things going well today ?",
      "Are you <span>Hopeful</span> about<br/> things going well today ?",
      "Are you feeling <span>Positive</span><br/> about things going your way ?",
      "Are you <span>Positive</span> about<br/> things going well today ?",
      "Do you think today will be a <br/><span>Great day</span> ?",
      "Do you believe today is going to <br/>be a <span>Good day</span> ?"
    ],
    pie: ["Positivity"],
    dailyChart: ["Joyful", "Sad", "Happy"],
    prePieMessage: ["while the higher state of Joy is a good and desirable feeling, the lower state is sadness. A large pie is helping your overall wellbeing, and vice-as-versa!"],
  },
  motivated: {
    suggestion_messages:{
      pie: ["Deflated"],
      prePieMessage: ["a smaller green pie may indicate that you are feeling a little unmotivated at the moment - and that’s okay. Let’s try to overcome this temporary block!"],
    },
    appreciation_messages:{
      pie: ["Motivated"],
      prePieMessage: ["feeling inspired, engaged and driven helps us to achieve our goals and be successful. Looks like you’re ready to go after them!"],
    },
    voice: {
      suggestion_messages:{
        pie: ["Deflated"],
        prePieMessage: ["It seems that you are feeling a little unmotivated at the moment - and that’s okay. Let’s try to overcome this temporary block!"],
      },
      appreciation_messages:{
        pie: ["Motivated"],
        prePieMessage: ["feeling inspired, engaged and driven helps us to achieve our goals and be successful. Looks like you’re ready to go after them!"],
      },
    },
    slider: [
      "How <span>Successful</span> <br/>are you feeling today?",
      "How <span>Energetic</span> <br/>are you feeling today?", 
      "How is your <span>Energy</span> <br/>level today?",
      "How is your <span>Motivation</span> <br/>level today?",
      "How <span>Motivated</span> <br/>are you feeling today?",
      "How clear are you on<br/>your <span>Goals</span>?",
      "How <span>Confident</span> are you feeling today?",
      "How <span>Committed</span><br/>are you feeling today?",
      "Are you feeling <span>Charged</span><br/>to take on the rest of the day?",
      "Are you <span>Charged</span> to make <br/>the most of today?",
      "Are you feeling <span>In control</span><br/>of the situation?",
      "Are you feeling <span>Committed</span><br/>to the mission of the day?",
      "Do you have a <span>Mission</span><br/>to fulfill today?",
      "Are you  <span>Clear </span> on your goals?",
      "Do you have a <br/><span>Plan </span> for the day?",
      "Are you feeling <span>Confident</span>?"
    ],
    pie: ["Motivation"],
    dailyChart: ["Motivated", "Low", "Active"],
    prePieMessage: [" behaving positive, healthy, engaged and working towards success helps us feel happier and successful. A larger pie size is helping your wellbeing and a smaller one needs attention!"],
  },
  active: {
    suggestion_messages:{
      pie: ["Deflated"],
      prePieMessage: ["a smaller green pie may indicate that you are feeling a little unmotivated at the moment - and that’s okay. Let’s try to overcome this temporary block!"],
    },
    appreciation_messages:{
      pie: ["Motivated"],
      prePieMessage: ["feeling inspired, engaged and driven helps us to achieve our goals and be successful. Looks like you’re ready to go after them!"],
    },
    voice: {
      suggestion_messages:{
        pie: ["Deflated"],
        prePieMessage: ["It seems that you are feeling a little unmotivated at the moment - and that’s okay. Let’s try to overcome this temporary block!"],
      },
      appreciation_messages:{
        pie: ["Motivated"],
        prePieMessage: ["feeling inspired, engaged and driven helps us to achieve our goals and be successful. Looks like you’re ready to go after them!"],
      },
    },
    slider:[
      "How <span>Healthy</span><br/>are you feeling today?",
      "How <span>Active</span><br/>are you feeling today?",
      "How <span>Fresh</span><br/>are you feeling today?",
      "How <span>Fit</span><br/>are you feeling today?",
      "How well did you <span>Sleep</span><br/>last night?",
      "How good is your <span>Diet</span><br/>these days?", 
      "How much are you <span>Exercising</span><br/>these days?", 
      "How good is your <span>Fitness</span><br/>level these days?",
      "Are you feeling<br/> <span>Healthy</span>  these days?",
      "Are you  <span>keeping</span><br/>Fit these days?",
      "Are you feeling <span>Fresh</span> today?",
      "Have you been <br/><span>Eating</span> well?",
      "Have you been <br/><span>Sleeping</span>  well?",
      "Have you been <span>Exercising</span>?"
    ],
    pie: ["Motivation"],
    dailyChart: ["Motivated", "Low", "Active"],
    prePieMessage: [" behaving positive, healthy, engaged and working towards success helps us feel happier and successful. A larger pie size is helping your wellbeing and a smaller one needs attention!"],
  },
  social: {
    suggestion_messages:{
      pie: ["Lonely"],
      prePieMessage: ["the smaller pink pie suggests that, perhaps, your relationships have taken a back seat lately. Take this as a gentle reminder to prioritise your social life a little - small gestures can come a long way."],
    },
    appreciation_messages:{
      pie: ["Loved"],
      prePieMessage: ["you’re all about your relationships and social interactions at the moment, which is wonderful! Good relationships are the key to lasting joy."],
    },
    voice: {
      suggestion_messages:{
        pie: ["Lonely"],
        prePieMessage: ["perhaps, your relationships have taken a back seat lately. Take this as a gentle reminder to prioritise your social life a little - small gestures can come a long way."],
      },
      appreciation_messages:{
        pie: ["Loved"],
        prePieMessage: ["you’re all about your relationships and social interactions at the moment, which is wonderful! Good relationships are the key to lasting joy."],
      },
    },
    slider:[
      "How <span>Connected</span> <br/>are you feeling today?", 
      "How <span>Loved</span> <br/>are you feeling today?",
      "How <span>Social</span> <br/>are you feeling today?",
      "How <span>Kind</span> <br/>are you feeling today?",
      "How <span>Caring</span> <br/>are you feeling today?",
      "How is your <span>Love</span> <br/>quotient today?",
      "How is your <span>Empathy</span> <br/>quotient today?",
      "How is your <span>Social</span> <br/>quotient today?",
      "How is your <span>Relationship</span> <br/>quotient today?",
      "Are you feeling <span>Loved</span>?", 
      "Are you feeling <span>Cared</span> for?", 
      "Do you believe that most <br/> people <span>Love</span> you?",
      "Have most people being <br/> <span>Kind</span> to you?",
      "Are you being <br/><span>Nice</span>  to others?",
      "Are most people being<br/><span>Nice</span> to you?",
      "Are you being <br/> <span>Kind</span> to others?",
      "Have you been  <span>Meeting</span><br/>  nice people these days?"
    ],
    pie: ["Relationships"],
    dailyChart: ["Social", "Relationships", "Friendly"],
    prePieMessage: [" all about your relationships and interaction with people in your life! Good relationships will make the pie bigger and help your overall happiness. If the pie is small, you should immediately get back to rebuilding your relationships!"],
  },
};
