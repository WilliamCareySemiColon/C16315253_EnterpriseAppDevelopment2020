//var Numerlogy = require("./Numerlogy");

$("#VistAccount").click(function () {
  window.location.replace("/ViewAccount.html");
});

$("#logout").click(function () {
  if (confirm("Logout of the application")) {
    //alert("hello world");
    $.ajax({
      type: "POST",
      url: "/logout",
      success: function () {
        window.location.replace("http://localhost:7777/");
      },
      error: function () {
        console.log("error in logout the account");
      },
    });
  }
});

var Storeddata = {};
$(document).ready(function () {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/GetUserDetails",
    success: function (data) {
      //console.log(data);
      Storeddata = data.items;
      console.log(Storeddata);

      let divSection = document.getElementById("PersonalUserWelcomeMessageDiv");
      var personalHeader = document.createElement("h3");
      let headerText = document.createTextNode(
        Storeddata.firstname +
          ", your details for numerlogy and tarot are below"
      );
      personalHeader.appendChild(headerText);
      divSection.appendChild(personalHeader);
    },
    error: function (data) {
      console.log(data);
    },
  }); //end ajax call
});

/*The button handlers for the home page of the application itself*/
$("#LifepathBtn").click(function () {
  var stringDateObj = Storeddata.DOB.split("/");

  var numberArray = GetLifePathNumber(stringDateObj);

  var elementToDisplay = 0;

  for (var i = 0; i < numberArray.length; i++) {
    elementToDisplay += numberArray[i];
  }

  elementToDisplay = GetLifePathNumberFromDays(String(elementToDisplay));

  //getting the div and create the documents to load onto the page
  var div = document.getElementById("LifepathDiv");

  //craetion of the elements and appending them together
  var lifepathH3 = document.createElement("h3");
  var text = document.createTextNode("Life Path Description");
  lifepathH3.appendChild(text);
  var lifepathP = document.createElement("p");
  var lifepathPText = document.createTextNode(LifepathNumberDesc);
  lifepathP.appendChild(lifepathPText);

  //appending the created elements together
  div.appendChild(lifepathH3);
  div.appendChild(lifepathP);

  GenerateNumerlogyTarotDiv("lifepath", elementToDisplay, div);

  document.getElementById("LifepathBtnHideDetails").disabled = false;
});

$("#LifepathBtnShowDetails").click(function () {
  document.getElementById("LifepathDiv").style.visibility = "visible";
  document.getElementById("LifepathBtnShowDetails").disabled = true;
  document.getElementById("LifepathBtnHideDetails").disabled = false;
});

$("#LifepathBtnHideDetails").click(function () {
  document.getElementById("LifepathDiv").style.visibility = "hidden";
  document.getElementById("LifepathBtnShowDetails").disabled = false;
  document.getElementById("LifepathBtnHideDetails").disabled = true;
});

$("#ExpressionNumberBtn").click(function () {
  var name = Storeddata.firstname + Storeddata.mname + Storeddata.surname;

  var element = CalculateExpressionNumber(name);

  //getting the div and create the documents to load onto the page
  var div = document.getElementById("ExpressionNumberDiv");

  //craetion of the elements and appending them together
  var lifepathH3 = document.createElement("h3");
  var text = document.createTextNode("Expression Number Description");
  lifepathH3.appendChild(text);
  var lifepathP = document.createElement("p");
  var lifepathPText = document.createTextNode(ExpressionNumber);
  lifepathP.appendChild(lifepathPText);

  //appending the created elements together
  div.appendChild(lifepathH3);
  div.appendChild(lifepathP);

  GenerateNumerlogyTarotDiv("Expression Number", element, div);

  document.getElementById("ExpressionNumberBtnHideDetails").disabled = false;
});

$("#ExpressionNumberBtnShowDetails").click(function () {
  document.getElementById("ExpressionNumberDiv").style.visibility = "visible";
  document.getElementById("ExpressionNumberBtnShowDetails").disabled = true;
  document.getElementById("ExpressionNumberBtnHideDetails").disabled = false;
});

$("#ExpressionNumberBtnHideDetails").click(function () {
  document.getElementById("ExpressionNumberDiv").style.visibility = "hidden";
  document.getElementById("ExpressionNumberBtnShowDetails").disabled = false;
  document.getElementById("ExpressionNumberBtnHideDetails").disabled = true;
});

$("#SoulUrgeBtn").click(function () {
  var name = Storeddata.firstname + Storeddata.mname + Storeddata.surname;

  var element = CalculateWithVowels(name, true);

  //getting the div and create the documents to load onto the page
  var div = document.getElementById("SoulUrgeNumber");

  //craetion of the elements and appending them together
  var lifepathH3 = document.createElement("h3");
  var text = document.createTextNode("Soul Urge Description");
  lifepathH3.appendChild(text);
  var lifepathP = document.createElement("p");
  var lifepathPText = document.createTextNode(HeartsDesireNumber);
  lifepathP.appendChild(lifepathPText);

  //appending the created elements together
  div.appendChild(lifepathH3);
  div.appendChild(lifepathP);

  GenerateNumerlogyTarotDiv("Soul Urge Number", element, div);

  document.getElementById("SoulUrgeBtnHideDetails").disabled = false;
});

$("#SoulUrgeBtnShowDetails").click(function () {
  document.getElementById("SoulUrgeNumber").style.visibility = "visible";
  document.getElementById("SoulUrgeBtnShowDetails").disabled = true;
  document.getElementById("SoulUrgeBtnHideDetails").disabled = false;
});

$("#SoulUrgeBtnHideDetails").click(function () {
  document.getElementById("SoulUrgeNumber").style.visibility = "hidden";
  document.getElementById("SoulUrgeBtnShowDetails").disabled = false;
  document.getElementById("SoulUrgeBtnHideDetails").disabled = true;
});

$("#PersonalityNumberBtn").click(function () {
  var name = Storeddata.firstname + Storeddata.mname + Storeddata.surname;

  var element = CalculateWithVowels(name, false);
  //getting the div and create the documents to load onto the page
  var div = document.getElementById("PersonalityNumberDiv");

  //craetion of the elements and appending them together
  var lifepathH3 = document.createElement("h3");
  var text = document.createTextNode("Personality Number Description");
  lifepathH3.appendChild(text);
  var lifepathP = document.createElement("p");
  var lifepathPText = document.createTextNode(PersonalityNumber);
  lifepathP.appendChild(lifepathPText);

  //appending the created elements together
  div.appendChild(lifepathH3);
  div.appendChild(lifepathP);

  GenerateNumerlogyTarotDiv("Personality Number", element, div);

  document.getElementById("PersonalityNumberBtnHideDetails").disabled = false;
});

$("#PersonalityNumberBtnShowDetails").click(function () {
  document.getElementById("PersonalityNumberDiv").style.visibility = "visible";
  document.getElementById("PersonalityNumberBtnShowDetails").disabled = true;
  document.getElementById("PersonalityNumberBtnHideDetails").disabled = false;
});

$("#PersonalityNumberBtnHideDetails").click(function () {
  document.getElementById("PersonalityNumberDiv").style.visibility = "hidden";
  document.getElementById("PersonalityNumberBtnShowDetails").disabled = false;
  document.getElementById("PersonalityNumberBtnHideDetails").disabled = true;
});

$("#BirthdayNumberBtn").click(function () {
  var stringDateObj = Storeddata.DOB.split("/");

  elementToDisplay = GetLifePathNumberFromDays(stringDateObj[0]);

  //getting the div and create the documents to load onto the page
  var div = document.getElementById("BirthdayNumberDiv");

  //craetion of the elements and appending them together
  var lifepathH3 = document.createElement("h3");
  var text = document.createTextNode("Birthday Number Description");
  lifepathH3.appendChild(text);
  var lifepathP = document.createElement("p");
  var lifepathPText = document.createTextNode(BirthdayNumberDetails);
  lifepathP.appendChild(lifepathPText);

  //appending the created elements together
  div.appendChild(lifepathH3);
  div.appendChild(lifepathP);

  GenerateNumerlogyTarotDiv("Birthday Number", elementToDisplay, div);
  document.getElementById("BirthdayNumberBtnHideDetails").disabled = false;
});

$("#BirthdayNumberBtnShowDetails").click(function () {
  document.getElementById("BirthdayNumberDiv").style.visibility = "visible";
  document.getElementById("BirthdayNumberBtnShowDetails").disabled = true;
  document.getElementById("BirthdayNumberBtnHideDetails").disabled = false;
});

$("#BirthdayNumberBtnHideDetails").click(function () {
  document.getElementById("BirthdayNumberDiv").style.visibility = "hidden";
  document.getElementById("BirthdayNumberBtnShowDetails").disabled = false;
  document.getElementById("BirthdayNumberBtnHideDetails").disabled = true;
});

//the life path number
function GetLifePathNumber(StringNumber) {
  var element = GetLifePathNumberFromDays(StringNumber[2]);

  return [
    GetLifePathNumberFromDays(StringNumber[0]),
    GetLifePathNumberFromDays(StringNumber[1]),
    element,
  ];
}

//the lifepath and the birthday number
function GetLifePathNumberFromDays(StringNumbersDays) {
  var regularNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55];

  if (regularNumbers.includes(Number(StringNumbersDays))) {
    return Number(StringNumbersDays);
  }

  var sumElement = 0;
  var LoopedElement = StringNumbersDays;

  do {
    var elementsArray = [];
    for (var i = 0; i < LoopedElement.length; i++) {
      elementsArray.push(Number(LoopedElement[i]));
      sumElement += elementsArray[i];
    }
    if (!regularNumbers.includes(sumElement)) {
      LoopedElement = String(sumElement);
      sumElement = 0;
    }
  } while (!regularNumbers.includes(sumElement));

  return sumElement;
}

//Pythagorean Alphabet for the expression number, soul urge and personality number
var PythagAlpSinglePoint = ["a", "j", "s"];
var PythagAlpDoublePoint = ["b", "k", "t"];
var PythagAlpTriplePoint = ["c", "l", "u"];
var PythagAlpFourthlyPoint = ["d", "m", "w"];
var PythagAlpFifthlyPoint = ["e", "n", "x"];
var PythagAlpSixthlyPoint = ["f", "o", "x"];
var PythagAlpSeventhlyPoint = ["g", "p", "y"];
var PythagAlpEightlyPoint = ["h", "q", "z"];
var PythagAlpNineltyPoint = ["i", "r"];
var vowels = ["a", "e", "i", "o", "u"];

//calculate the expresion number - also known as destiny number
function CalculateExpressionNumber(Name) {
  var loweredName = Name.toLowerCase();
  var nameCalc = 0;

  for (var i = 0; i < loweredName.length; i++) {
    if (PythagAlpSinglePoint.includes(loweredName[i])) {
      nameCalc += 1;
    }

    if (PythagAlpDoublePoint.includes(loweredName[i])) {
      nameCalc += 2;
    }

    if (PythagAlpTriplePoint.includes(loweredName[i])) {
      nameCalc += 3;
    }

    if (PythagAlpFourthlyPoint.includes(loweredName[i])) {
      nameCalc += 4;
    }

    if (PythagAlpFifthlyPoint.includes(loweredName[i])) {
      nameCalc += 5;
    }

    if (PythagAlpSixthlyPoint.includes(loweredName[i])) {
      nameCalc += 6;
    }

    if (PythagAlpSeventhlyPoint.includes(loweredName[i])) {
      nameCalc += 7;
    }

    if (PythagAlpEightlyPoint.includes(loweredName[i])) {
      nameCalc += 8;
    }

    if (PythagAlpNineltyPoint.includes(loweredName[i])) {
      nameCalc += 9;
    }
  }

  return GetLifePathNumberFromDays(String(nameCalc));
}

function CalculateWithVowels(Name, VowelsAllowed) {
  //console.log(Name);
  var loweredName = Name.toLowerCase();
  var nameCalc = 0;

  for (var i = 0; i < loweredName.length; i++) {
    if (vowels.includes(loweredName[i]) == VowelsAllowed) {
      if (PythagAlpSinglePoint.includes(loweredName[i])) {
        nameCalc += 1;
      }

      if (PythagAlpDoublePoint.includes(loweredName[i])) {
        nameCalc += 2;
      }

      if (PythagAlpTriplePoint.includes(loweredName[i])) {
        nameCalc += 3;
      }

      if (PythagAlpFourthlyPoint.includes(loweredName[i])) {
        nameCalc += 4;
      }

      if (PythagAlpFifthlyPoint.includes(loweredName[i])) {
        nameCalc += 5;
      }

      if (PythagAlpSixthlyPoint.includes(loweredName[i])) {
        nameCalc += 6;
      }

      if (PythagAlpSeventhlyPoint.includes(loweredName[i])) {
        nameCalc += 7;
      }

      if (PythagAlpEightlyPoint.includes(loweredName[i])) {
        nameCalc += 8;
      }

      if (PythagAlpNineltyPoint.includes(loweredName[i])) {
        nameCalc += 9;
      }
    } //end if statement for checking with the vowels
  }

  return GetLifePathNumberFromDays(String(nameCalc));
}

function GenerateNumerlogyTarotDiv(HeaderContext, NumberPassed, DivToAppendTo) {
  var textGnerated = "Your " + HeaderContext + " is " + NumberPassed;
  //creating the header generated into the application
  var h4 = document.createElement("h4");
  var h4Text = document.createTextNode(textGnerated);
  h4.appendChild(h4Text);

  var p = document.createElement("p");
  var pText = document.createTextNode(
    NumerologyNumberDefiantions[NumberPassed]
  );
  p.appendChild(pText);

  //appendding them to the div section
  DivToAppendTo.appendChild(h4);
  DivToAppendTo.appendChild(p);

  var data = {
    number: NumberPassed % 22,
  };

  $.ajax({
    type: "POST",
    data: data,
    dataType: "json",
    url: "/GetTarotDetails",
    success: function (data) {
      //create the tarot section for the application
      var MainTarotSection = document.createElement("h3");
      var MainTarotSectionText = document.createTextNode("Related Tarot card");
      MainTarotSection.appendChild(MainTarotSectionText);

      var tarotH4 = document.createElement("h4");
      var tarotH4Text = document.createTextNode(data.items.name);
      tarotH4.appendChild(tarotH4Text);

      var tarotH6 = document.createElement("h6");
      var tarotH6Text = document.createTextNode(
        "Type: " + data.items.type + " Number: " + data.items.value
      );
      tarotH6.appendChild(tarotH6Text);

      var descritpion = document.createElement("p");
      descritpion.innerText = data.items.desc;

      var meaningUp = document.createElement("p");
      var meaningUpText = document.createTextNode(
        "Upright meaning: " + data.items.meaning_up
      );
      meaningUp.appendChild(meaningUpText);

      var meaningDown = document.createElement("p");
      var meaningDownText = document.createTextNode(
        "Reversed meaning: " + data.items.meaning_rev
      );
      meaningDown.appendChild(meaningDownText);

      //appendding them to the div section
      DivToAppendTo.appendChild(tarotH4);
      DivToAppendTo.appendChild(tarotH6);
      DivToAppendTo.appendChild(descritpion);
      DivToAppendTo.appendChild(meaningUp);
      DivToAppendTo.appendChild(meaningDown);
    },
    error: function (data) {
      console.log(data);
    },
  }); //end ajax call
}

//function to create the div used in the application
/***************************************************************************************************************************
 * Content under this comment are from another JS file duplicated here as it is uncertain how to use them in their native
 * area
 ***************************************************************************************************************************/
//information pulled from https://numerologist.com/numerology/numerology-numbers-birthday/
const BirthdayNumberDetails =
  "The Birthday Number is of huge importance to an individual’s profession and lifestyle, " +
  "not least because it’s the number from which the “Cycle of Productivity” within your life path is calculated.  This runs " +
  "from about the age 27 to about 56 and as the name suggests, this is the most productive time of life for most people and is " +
  "when they are likely to be putting effort into their career and professional lives. In many cases, the numerical vibration of " +
  "the Cycle of Productivity (which is actually the Birthday Number) can be more prominent than the Life Path itself! SO knowing " +
  "your Birthday Number can be hugely beneficial when it comes to planning or changing your career.\n\n Being a number that can’t " +
  "be changed, it can often direct and explain why and when people mysteriously exchange one career for another, abandon a previously" +
  "cherished way of life, or experience sudden elevations in career and status.";

//information pulled from the following url:https://www.numerology.com/numerology-news/core-numbers-numerology
const PersonalityNumber =
  "Your Personality number is the first impression people get of you. It represents the parts of yourself " +
  "that you are most ready and willing to reveal, and helps you determine just how much you reveal, and to whom. This number acts as a " +
  "buffer, screening out some people and situations you don't want to deal with while welcoming the things in life that relate to your " +
  "inner nature.\n\n Your Personality number is derived from only the consonants in your full birth name.";

const HeartsDesireNumber =
  "Your Heart's Desire number\n\nWhat are the reasons behind your actions ? " +
  "What do you really want in life and love ? This is where your Heart's Desire comes in to play, and it " +
  "signifies the reasons behind the choices you make in all aspects of your life, from your career to your relationships" +
  " -- the burning fire within.\n\nYour Heart's Desire number comes from just the vowels in your name -- those soft sounds shed" +
  " light on the inner workings of your more subconscious desires.";

//from the report document I am using defination
const ExpressionNumber =
  "The Expression, or Total Name Number, describes the magic that you bring into the world; it is the number " +
  "that provides an overview of what you send out into your surroundings.People don’t usually realize that they create chains of cause " +
  "and effect through their actions which open the door to new experiences.Essentially, everyone is constantly shaping the future in " +
  "their own way.";

const LifepathNumberDesc =
  "It represents the situations and opportunities that you attract as the result of your actions," +
  " and thus the landscape of the world through which you navigate. It is a central number, or core element, in the hierarchy of" +
  " vibrations that make up your Numerology chart, and is used in almost every school of Numerology known to exist.";

const NumerologyNumberDefiantions = {
  //for the numbers 1 - 9, the url links to them: https://www.worldnumerology.com/numerology-single-digit-numbers.htm
  1:
    "From a spiritual perspective, the 1 is the number of creation - the primal force from which all other numbers spring forth." +
    " Some say once you truly understand the place and function of this elemental number, enlightenment will be yours. \n\nThe 1 is" +
    " a doer, a powerful force that produces results. The 1 is aggressive - a necessary trait for creating, and not allowing " +
    "anything to limit its potential.The 1 is the spearhead, always in the forefront directing and leading others. The shape of " +
    "this number reflects its meaning; the 1 walks upright with pride and purpose - strong, determined, and unwavering with a " +
    "specific goal in mind.The 1 is capable of turning ideas into reality - pushing obstacles aside or simply drilling right " +
    "through them.",
  2:
    "Known as the peacemaker, the 2 is almost always gentle, tactful, diplomatic, forgiving, and non- confrontational.\n\n" +
    "However, the shape of the 2 gives us a clue to its resilience and ability to survive.This symbol, as if bowing in servitude," +
    " could easily be perceived as weak and powerless.But when the humble 2 is under attack, even burdened by a crushing weight," +
    " its flexible nature allows it to bounce back quickly.\n\nThis is in stark contrast to the power and pride of the bold 1, " +
    "who is unlikely to back down. (The competitive, bold, individualistic nature of the 1 makes it strong, but its rigid posture" +
    " can shatter under prolonged pressure.)\n\nPeople in leadership positions - often individuals with a well positioned 1 in " +
    "their chart - recognize the value of their calm, thoughtful friend.The 2 is often the real power behind the throne.",
  3:
    "The number 3 is like a gifted teenager who is still under the protection of its parents - a bit spoiled, clearly scattered," +
    " and perpetually in need of guidance.However, the 3 excels in the creative field. An individual with 3s in key points of their" +
    " numerology chart will have a passionate need to express feelings, ideas, and vision.Coupled with an extroverted personality," +
    " they are likely to seek a career in art, especially the verbal arts.\n\nAnother unique quality of the 3 is the tendency to" +
    ' be "lucky," or rather, to be in the right place at the right time.This may be connected to their innate sense of rhythm' +
    " - the 3 seems to be in tune with the cyclical nature of their surroundings.",
  4:
    "The chief characteristics of the number 4 are dependability, productivity, punctuality, and obedience.It is trustworthy, " +
    "patient, conventional, and traditional.\n\nPeople with prominent 4’s can seem dispassionate and solitary, preferring to toil " +
    "in quiet obscurity.They work steadily and are extremely persistent, finding deep satisfaction in their accomplishments. The 4" +
    " favors results over financial reward and public recognition.They are humble, often dress conservatively, and don’t clash with" +
    " their surroundings.",
  5:
    "The 5 is unpredictable, always in motion, and constantly in search of change. Although it is molded from an almost equal mix" +
    " of freedom-loving and loyal characteristics, the 5 is slightly more daring, and there is nothing submissive about it.\n\nThe 5" +
    " is extremely independent in mind and soul.\n\nFor an adventurer and risk- taker who has a hard time staying in one place, one" +
    " job, or one relationship, the 5 is surprisingly loyal when the right partner comes along.",

  6:
    "Its most important attribute is its loving, caring nature.Aptly nicknamed the motherhood/ fatherhood number, the 6 is all about" +
    " sacrifice, healing, protecting, and teaching others. No family or community can function without the attention of the 6 – it is" +
    " the glue that keeps a family and community together.\n\nCreating an environment of peace and harmony is always at the forefront.\n\n" +
    "Home, family, and friends are top priorities.People with a 6 in their core numbers often focus on the young, the old, and those less" +
    "fortunate.\n\nThe 6 is sympathetic, favors the underdog, and has a keen sense of what is fair and just. Perceiving injustice," +
    " the 6 will sacrifice immense time and effort to set things straight.Highly responsible, the 6 can be counted on to show up and do" +
    " more than its fair share of the work.People with a 6 can be demanding, but they will work in the background when needed, without" +
    " an expectation of reward.",
  7:
    "The 7 doesn't take anything at face value -- it is always trying to understand the underlying, hidden truths. The 7 knows that" +
    " nothing is exactly as it seems and that reality is often hidden behind illusions.\n\nA person who has a chart dominated by the 7" +
    " is usually easily picked out of a group.\n\nHe will be somewhat introverted, perhaps shy(not to be confused with low self- esteem)," +
    " never truly comfortable in social settings.The 7 is the intellectual, but his intellect is not always obvious, especially at an" +
    " early age(as a child, Einstein was dyslexic and not particularly bright or a good student). His intelligence is that of a dreamer," +
    " an intellectual explorer of the obscure, the person who tends to have a somewhat off - beat perspective on the world around him." +
    " Many are interested in the metaphysical, not because they are believers, but because it allows access to the ambiguous, abstract" +
    " world of questions for which there are no clear answers.",

  8:
    'Numerology novices and professionals alike always seem to focus on the "money and power" image of the 8. More often than not' +
    ", when a client requests a name change consultation, it means he or she wants to add 8s to his or her chart in the mistaken belief" +
    " that it will bring money and power.\n\nIt is true that the number 8, more than any other number, puts the emphasis in the areas" +
    " of career, business, finances and authority.\n\nHowever, as with other single- digit numbers, the shape of the number reflects" +
    " its most important attribute, and in the case of the number 8, that is first and foremost, balance.The 8 is the great Karmic" +
    " equalizer, a force that just as easily creates as it destroys.When the 8 comes knocking, you can be assured that you will reap " +
    "what you've sown.",
  9:
    'The 9 is called the "Mother Theresa" number, because when she sees injustice or suffering, she will not hesitate to devote herself' +
    " to rectifying it. More importantly, she will not dedicate any energy towards receiving credit for her actions; the purity of math" +
    " that is manifested when she adds to the lives of others is mirrored in the way she goes about doing good: she will not force " +
    "herself upon others.\n\nBut when circumstances require, she can be a powerful force, strong enough to take over and bend others" +
    " to her will(just as she does when she is used to multiply any other number; she takes complete control).Yet she is not a leader" +
    " in the way both the 1 and the 8 are leaders; her leadership qualities are in the higher realms of philosophy and justice.She" +
    " changes your mind!",
  //master numbers url https://www.worldnumerology.com/numerology-master-numbers.htm
  11:
    "The 11 is the most intuitive of all numbers.It represents illumination; a channel to the subconscious; insight without rational" +
    "thought; and sensitivity, nervous energy, shyness, and impracticality. It is a dreamer.\n\nThe Master number 11 has all the aspects " +
    "of the 2, but is considerably enhanced and charged with charisma, leadership, and inspiration.It is a number with inborn duality, " +
    "which creates dynamism, inner conflict, and other catalysts with its mere presence.A number that, when not focused on a goal beyond " +
    "itself, can be turned inward to create fear and phobias.\n\nThe 11 walks the edge between greatness and self- destruction.\n\n" +
    "Its potential for growth, stability, and personal power lies in its acceptance of intuitive understanding and spiritual truths. For " +
    "the 11, peace is not found so much in logic, but in faith.The 11 is the psychic's number.",
  22:
    "Master number 22 is potentially the most successful of all numbers in numerology. It is the most powerful of all numbers and often" +
    " called the Master Builder.The Master number 22 can turn the most ambitious of dreams into reality, but only when it is supported " +
    " properly by other numbers in the chart.\n\nThe 22 has many of the inspirational insights of the 11, combined with the " +
    " practicality and methodical nature of the 4, making it unlimited yet disciplined; it sees the archetype and brings it down to " +
    " earth in a material form. It has big ideas, expansive plans, idealism, leadership, and self- confidence.",
  33:
    "The Master number 33 is considered the Master teacher and the most spiritually evolved of all numbers.\n\nThe 33 is the most " +
    "influential of all numbers; it combines the 11 and the 22, boosting their potential to another level.\n\nWhen expressed to the " +
    "fullest, the 33 lacks personal ambition and instead focuses its considerable ability on the spiritual uplifting of humanity. " +
    "What makes the 33 especially impressive, is its high level of sincere devotion.",
  //life path 44 gotten from this site https://www.numerologychart.co/numerology-44/
  44:
    "The superpower of the master number forty- four is in enterprise and business toward the path of sacred order. You have the " +
    "ability of attracting resources in perfect harmony with nature and our environment. I envision you as a pure electrical " +
    "current of energy balancing commodities in the perfect flow of giving and receiving.\n\n The master number forty - four is " +
    "known for magnificence and manifestation. It is a master architect and alchemist whose leadership skills can transform " +
    "an idea and structure into a powerful and life - altering accomplishment.The lesson of the forty - four is to go beyond " +
    "the hard work of the mundane and to see each moment as a creative challenge.The obstacle to push through might be " +
    "perfectionism in order to gain humility.",
};
