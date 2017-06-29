(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BackgroundGenerator, backgroundsList, el, getRandomBackground, getRandomFromList,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

el = React.createElement;

backgroundsList = [require('./backgrounds/acolyte'), require('./backgrounds/charlatan'), require('./backgrounds/criminal'), require('./backgrounds/entertainer')];

getRandomFromList = function(list) {
  return list[Math.floor(Math.random() * list.length)];
};

getRandomBackground = function() {
  return getRandomFromList(backgroundsList);
};

BackgroundGenerator = (function(superClass) {
  extend(BackgroundGenerator, superClass);

  function BackgroundGenerator(props) {
    this.revealDestiny = bind(this.revealDestiny, this);
    BackgroundGenerator.__super__.constructor.call(this, props);
    this.state = {
      background: null,
      flaw: null,
      bond: null,
      ideal: null,
      personality: null
    };
  }

  BackgroundGenerator.prototype.componentWillMount = function() {
    return this.revealDestiny();
  };

  BackgroundGenerator.prototype.renderDestiny = function() {
    var description, summary;
    summary = this.state.flaw.quip + " " + this.state.background.quip + " " + this.state.bond.quip + ".";
    description = this.state.ideal.quip + " and " + this.state.personality.quip + ".";
    return el('div', {
      className: 'container-fluid'
    }, el('div', {
      className: 'row'
    }, el('div', {
      className: 'col-xs-12'
    }, el('div', {
      className: 'background-summary text-center'
    }, el('div', {
      className: 'background-main-line'
    }, summary.toLowerCase()), el('div', {
      className: 'background-sub-line'
    }, description.toLowerCase()), el('button', {
      className: 'refresh-button',
      onClick: this.revealDestiny
    }, 'Show another ↻')))));
  };

  BackgroundGenerator.prototype.renderBackgroundTrait = function(title, text) {
    return el('div', null, el('h3', {
      className: 'mighty-text'
    }, title), el('p', null, text));
  };

  BackgroundGenerator.prototype.renderIdeal = function(summary, text) {
    return el('span', null, el('strong', null, summary + ": "), text);
  };

  BackgroundGenerator.prototype.renderDetails = function() {
    var ideal;
    ideal = this.renderIdeal(this.state.ideal.summary, this.state.ideal.text);
    return el('div', {
      className: 'container'
    }, el('div', {
      className: 'row'
    }, el('div', {
      className: 'col-xs-12'
    }, el('div', {
      className: 'background-details'
    }, this.renderBackgroundTrait("Background", this.state.background.name + " (" + this.state.background.source + ")"), this.renderBackgroundTrait("Flaw", this.state.flaw.text), this.renderBackgroundTrait("Bond", this.state.bond.text), this.renderBackgroundTrait("Ideal", ideal), this.renderBackgroundTrait("Personality Trait", this.state.personality.text)))));
  };

  BackgroundGenerator.prototype.revealDestiny = function() {
    var background;
    background = getRandomBackground();
    return this.setState({
      background: background,
      flaw: getRandomFromList(background.flaws),
      bond: getRandomFromList(background.bonds),
      ideal: getRandomFromList(background.ideals),
      personality: getRandomFromList(background.personalities)
    });
  };

  BackgroundGenerator.prototype.render = function() {
    return el('div', null, el('div', {
      className: 'background-generator'
    }, el('div', {
      className: 'container'
    }, el('div', {
      className: 'row'
    }, el('div', {
      className: 'col-xs-12 text-center'
    }, el('h1', null, 'D&D 5e Background Generator'), el('h2', null, 'Your Epic Destiny Awaits')))), this.renderDestiny(), this.renderDetails()));
  };

  return BackgroundGenerator;

})(React.Component);

ReactDOM.render(el(BackgroundGenerator), document.querySelector('#background-container'));


},{"./backgrounds/acolyte":2,"./backgrounds/charlatan":3,"./backgrounds/criminal":4,"./backgrounds/entertainer":5}],2:[function(require,module,exports){
module.exports = {
  name: "Acolyte",
  source: "Player's Handbook",
  quip: "priest",
  flaws: [
    {
      quip: "overly judgmental",
      text: "I judge others harshly, and myself even more severely."
    }, {
      quip: "Overly trusting",
      text: "I put too much trust in those who wield power within my temple's hierarchy."
    }, {
      quip: "Gullible",
      text: "My piety sometimes leads me to blindly trust those that profess faith in my god."
    }, {
      quip: "Dogmatic",
      text: "I am inflexible in my thinking."
    }, {
      quip: "Untrusting",
      text: "I am suspicious of strangers and expect the worst of them."
    }, {
      quip: "Workaholic",
      text: "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."
    }
  ],
  bonds: [
    {
      quip: "on a quest for a holy relic",
      text: "I would die to recover an ancient relic of my faith that was lost long ago."
    }, {
      quip: "hell-bent on revenge",
      text: "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic."
    }, {
      quip: "with dead parents",
      text: "I owe my life to the priest who took me in when my parents died."
    }, {
      quip: "who is a man of the people",
      text: "Everything I do is for the common people."
    }, {
      quip: "that would die for their temple",
      text: "I will do anything to protect the temple where I served."
    }, {
      quip: "fleeing persecution by extremists",
      text: "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."
    }
  ],
  ideals: [
    {
      quip: "loves tradition",
      summary: "Tradition",
      text: "The ancient traditions of worship and sacrifice must be preserved and upheld.",
      alignment: "Lawful"
    }, {
      quip: "generous to a fault",
      summary: "Charity",
      text: "I always try to help those in need, no matter what the personal cost.",
      alignment: "Good"
    }, {
      quip: "overzealous",
      summary: "Change",
      text: "We must help bring about the changes the gods are constantly working in the world.",
      alignment: "Chaotic"
    }, {
      quip: "lusts after power",
      summary: "Power",
      text: "I hope to one day rise to the top of my faith's religious hierarchy.",
      alignment: "Lawful"
    }, {
      quip: "faithful",
      summary: "Faith",
      text: "I trust that my deity will guide my actions, I have faith that if I work hard, things will go well.",
      alignment: "Lawful"
    }, {
      quip: "desperately seeks validation",
      summary: "Aspiration",
      text: "Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against his or her teachings.",
      alignment: "Any"
    }
  ],
  personalities: [
    {
      quip: "idolizes authority figures",
      text: "I idolize a particular hero of my faith, and constantly refer to that person's deeds and example."
    }, {
      quip: "is naturally diplomatic",
      text: "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace."
    }, {
      quip: "believes god talks to them",
      text: "I see omens in every event and action. The gods try to speak to us, we just need to listen."
    }, {
      quip: "is relentlessly naive",
      text: "Nothing can shake my optimistic attitude."
    }, {
      quip: "never stops grandstanding",
      text: "I quote (or misquote) sacred texts and proverbs in almost every situation."
    }, {
      quip: "fights religious extremism",
      text: "I am tolerant of other faiths and respect the worship of other gods."
    }, {
      quip: "is a religious extremist",
      text: "I am intolerant of other faiths and condemn the worship of other gods."
    }, {
      quip: "is a pampered snob",
      text: "I've enjoyed fine food, drink, and high society among my temple’s elite. Rough living grates on me."
    }, {
      quip: "can't interact normally with gentiles",
      text: "I’ve spent so long in the temple that I have little practical experience dealing with people in the outside world."
    }
  ]
};


},{}],3:[function(require,module,exports){
module.exports = {
  name: "Charlatan",
  source: "Player's Handbook",
  quip: "con artist",
  flaws: [
    {
      quip: "horny",
      text: "I can’t resist a pretty face."
    }, {
      quip: "financially irresponsible",
      text: "I'm always in debt. I spend my ill-gotten gains on decadent luxuries faster than I bring them in."
    }, {
      quip: "egotistical",
      text: "I’m convinced that no one could ever fool me the way I fool others."
    }, {
      quip: "greedy",
      text: "I’m too greedy for my own good. I can’t resist taking a risk if there’s money involved."
    }, {
      quip: "anti-authoritarian",
      text: "I can’t resist swindling people who are more powerful than me."
    }, {
      quip: "cowardly",
      text: "I hate to admit it and will hate myself for it, but I'll run and preserve my own hide if the going gets tough."
    }
  ],
  bonds: [
    {
      quip: "on the run from a revenge seeker",
      text: "I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about."
    }, {
      quip: "that owes a life debt to a scumbag",
      text: "I owe everything to my mentor— a horrible person who’s probably rotting in jail somewhere."
    }, {
      quip: "with a bastard child",
      text: "Somewhere out there, I have a child who doesn’t know me. I’m making the world better for him or her."
    }, {
      quip: "that has fallen from grace",
      text: "I come from a noble family, and one day I’ll reclaim my lands and title from those who stole them from me."
    }, {
      quip: "on a quest for revenge",
      text: "A powerful person killed someone I love. Some day soon, I’ll have my revenge."
    }, {
      quip: "with a heart of gold",
      text: "I swindled and ruined a person who didn’t deserve it. I seek to atone for my misdeeds but might never be able to forgive myself."
    }
  ],
  ideals: [
    {
      quip: "free spirited",
      summary: "Independence",
      text: "I am a free spirit— no one tells me what to do.",
      alignment: "Chaotic"
    }, {
      quip: "robs the rich",
      summary: "Fairness",
      text: "I never target people who can’t afford to lose a few coins.",
      alignment: "Lawful"
    }, {
      quip: "gives to the poor",
      summary: "Charity",
      text: "I distribute the money I acquire to the people who really need it.",
      alignment: "Good"
    }, {
      quip: "unpredictable",
      summary: "Creativity",
      text: "I never run the same con twice.",
      alignment: "Chaotic"
    }, {
      quip: "a bit of a softy",
      summary: "Friendship",
      text: "Material goods come and go. Bonds of friendship last forever.",
      alignment: "Good"
    }, {
      quip: "desperately seeks validation",
      summary: "Aspiration",
      text: "I’m determined to make something of myself.",
      alignment: "Any"
    }
  ],
  personalities: [
    {
      quip: "is a hopeless romantic",
      text: "I fall in and out of love easily, and am always pursuing someone."
    }, {
      quip: "can't take anything seriously",
      text: "I have a joke for every occasion, especially occasions where humor is inappropriate."
    }, {
      quip: "manipulates people for personal gain",
      text: "Flattery is my preferred trick for getting what I want."
    }, {
      quip: "is addicted to gambling",
      text: "I’m a born gambler who can't resist taking a risk for a potential payoff."
    }, {
      quip: "is a pathological liar",
      text: "I lie about almost everything, even when there’s no good reason to."
    }, {
      quip: "is just generally a jerk",
      text: "Sarcasm and insults are my weapons of choice."
    }, {
      quip: "exploits religious beliefs for personal gain",
      text: "I keep multiple holy symbols on me and invoke whatever deity might come in useful at any given moment."
    }, {
      quip: "can't stop stealing",
      text: "I pocket anything I see that might have some value."
    }
  ]
};


},{}],4:[function(require,module,exports){
module.exports = {
  name: "Criminal",
  source: "Player's Handbook",
  quip: "scoundrel",
  flaws: [
    {
      quip: "thieving",
      text: "When I see something valuable, I can’t think about anything but how to steal it."
    }, {
      quip: "greedy, untrustworthy",
      text: "When faced with a choice between money and my friends, I usually choose the money."
    }, {
      quip: "unreliable",
      text: "If there’s a plan, I’ll forget it. If I don’t forget it, I’ll ignore it."
    }, {
      quip: "loose-lipped",
      text: "I have a 'tell' that reveals when I'm lying."
    }, {
      quip: "cowardly",
      text: "I turn tail and run when things look bad."
    }, {
      quip: "self righteous",
      text: "An innocent person is in prison for a crime that I committed. I’m okay with that."
    }
  ],
  bonds: [
    {
      quip: "that's deeply in debt",
      text: "I’m trying to pay off an old debt I owe to a generous benefactor."
    }, {
      quip: "with a family to support",
      text: "My ill-gotten gains go to support my family."
    }, {
      quip: "on a quest for vengeance",
      text: "Something important was taken from me, and I aim to steal it back."
    }, {
      quip: "lusting for fame and fortune",
      text: "I will become the greatest thief that ever lived."
    }, {
      quip: "with a dark secret",
      text: "I’m guilty of a terrible crime. I hope I can redeem myself for it."
    }, {
      quip: "with a dead wife or something",
      text: "Someone I loved died because of a mistake I made. That will never happen again."
    }
  ],
  ideals: [
    {
      quip: "follows a code of honor",
      summary: "Honor",
      text: "I don’t steal from others in the trade.",
      alignment: "Lawful"
    }, {
      quip: "advocates anarchy",
      summary: "Freedom",
      text: "Chains are meant to be broken, as are those who would forge them.",
      alignment: "Chaotic"
    }, {
      quip: "gives to the poor",
      summary: "Charity",
      text: "I steal from the wealthy so that I can help people in need.",
      alignment: "Good"
    }, {
      quip: "covets wealth",
      summary: "Greed",
      text: "I will do whatever it takes to become wealthy.",
      alignment: "Evil"
    }, {
      quip: "rejects causes or ideals",
      summary: "People",
      text: "I’m loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care.",
      alignment: "Neutral"
    }, {
      quip: "thinks anyone can be good",
      summary: "Redemption",
      text: "There’s a spark of good in everyone.",
      alignment: "Good"
    }
  ],
  personalities: [
    {
      quip: "has a plan to kill everyone they meet",
      text: "I always have a plan for what to do when things go wrong."
    }, {
      quip: "is stoic as all hell",
      text: "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me."
    }, {
      quip: "is always looking for something to steal",
      text: "The first thing I do in a new place is note the locations of everything valuable-or where such things could be hidden."
    }, {
      quip: "is a natural people person",
      text: "I would rather make a new friend than a new enemy."
    }, {
      quip: "never believes anyone",
      text: "I am incredibly slow to trust. Those who seem the fairest often have the most to hide."
    }, {
      quip: "doesn't give a damn about risk",
      text: "I don't pay attention to the risks in a situation. Never tell me the odds."
    }, {
      quip: "picks fights with anyone, over anything",
      text: "The best way to get me to do something is to tell me I can't do it."
    }, {
      quip: "can't handle even the slightest insult",
      text: "I blow up at the slightest insult."
    }
  ]
};


},{}],5:[function(require,module,exports){
module.exports = {
  name: "Entertainer",
  source: "Player's Handbook",
  quip: "minstrel",
  flaws: [
    {
      quip: "attention whoring",
      text: "I’ll do anything to win fame and renown."
    }, {
      quip: "promiscuous",
      text: "I’m a sucker for a pretty face."
    }, {
      quip: "scandalous",
      text: "A scandal prevents me from ever going home again. That kind of trouble seems to follow me around."
    }, {
      quip: "provocative",
      text: "I once satirized a noble who still wants my head. It was a mistake that I will likely repeat."
    }, {
      quip: "oversharing",
      text: "I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble."
    }, {
      quip: "unreliable",
      text: "Despite my best efforts, I am unreliable to my friends."
    }
  ],
  bonds: [
    {
      quip: "that's sexually attracted to a lute",
      text: "My instrument is my most treasured possession, and it reminds me of someone I love."
    }, {
      quip: "looking for the man who stole their guitar",
      text: "Someone stole my precious instrument, and someday I’ll get it back."
    }, {
      quip: "who'll do anything to be famous",
      text: "I want to be famous, whatever it takes."
    }, {
      quip: "who tries to emulate their hero",
      text: "I idolize a hero of the old tales and measure my deeds against that person’s."
    }, {
      quip: "with a petty yet intense rivalry",
      text: "I will do anything to prove myself superior to my hated rival."
    }, {
      quip: "who can't move past their salad days",
      text: "I would do anything for the other members of my old troupe."
    }
  ],
  ideals: [
    {
      quip: "makes the world better through song",
      summary: "Beauty",
      text: "When I perform, I make the world better than it was.",
      alignment: "Good"
    }, {
      quip: "prefers the oldies",
      summary: "Tradition",
      text: "The stories, legends, and songs of the past must never be forgotten, for they teach us who we are.",
      alignment: "Lawful"
    }, {
      quip: "lives to shake things up",
      summary: "Creativity",
      text: "The world is in need of new ideas and bold action.",
      alignment: "Chaotic"
    }, {
      quip: "just in it for the money",
      summary: "Greed",
      text: "I’m only in it for the money and fame.",
      alignment: "Evil"
    }, {
      quip: "craves the spotlight",
      summary: "People",
      text: "I like seeing the smiles on people’s faces when I perform. That’s all that matters.",
      alignment: "Neutral"
    }, {
      quip: "seeks the truth in all things",
      summary: "Honesty",
      text: "Art should reflect the soul; it should come from within and reveal who we really are.",
      alignment: "Any"
    }
  ],
  personalities: [
    {
      quip: "loves to tell stories",
      text: "I know a story relevant to almost every situation."
    }, {
      quip: "loves to gossip",
      text: "Whenever I come to a new place, I collect local rumors and spread gossip."
    }, {
      quip: "is a hopeless romantic",
      text: "I’m a hopeless romantic, always searching for that “special someone.”"
    }, {
      quip: "has the most silvery of tongues",
      text: "Nobody stays angry at me or around me for long, since I can defuse any amount of tension."
    }, {
      quip: "loves trading insults",
      text: "I love a good insult, even one directed at me."
    }, {
      quip: "always needs to be the center of attention",
      text: "I get bitter if I’m not the center of attention."
    }, {
      quip: "always has to be a perfectionist",
      text: "I’ll settle for nothing less than perfection."
    }, {
      quip: "is emotionally unstable",
      text: "I change my mood or my mind as quickly as I change key in a song."
    }
  ]
};


},{}]},{},[1]);
