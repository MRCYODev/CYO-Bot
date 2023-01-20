

module.exports = {
    name: "autohack",
    aliases: null,
    usage: null,
    desciption: "Fake Hack Discord Account",
    timeout: 60000,
    run: async (client, message, args) => {


 let password = ["shithead","brucecool","simp123","ihavesex","wishimsuperman","havecorona","havingsex","underagekid","cantcode","ateAshark"];
 let email = ["discord21awsome@outlook.com","BruceBuchananBape21@gmail.com","imWeak@kid.com","ImALoser@outlook.com","iHateMyBrain@gmail.com","ImATotalShit@hotmail.com","AngryBirds123@gmail.com","LoveToEatPoop@outlook.com","IHaveCorona@wimp.com","ApplesAndBananas@loser.com"];
 let age = ["Underage","Underage","15","13","21","97","85", "17", "99", "300", "231", "39198"];
 let sexy = ["Yes","No","Yes"];
 let gender = ["boy","girl"];
 let stuff = ["he","she"];
 let status = ["dancing","cyberbullying","having sex","looking out the window", "playing ping pong", "coding","emailing a jillion people","chatting","being bullied", "playing brawl stars in the middle of the night"];
 let phonenumber = ["714-122-9902", "940-232-2393", "714-234-2933", "949-932-3233", "923-329-3233", "714-234-2323"];
 let ipadress = ["92.211.2.2", "990.202.2.2", "9.9.9.333", "18.323.33.3", "1.12.222.2", "3.2323.3.3", "93.3.3.33", "1.1.1.323"]
 let creditcard = ["9933-2323-3333-2222", "9022-1114-2146-3233", "9000-3923-4334-2323", "9122-1221-2222-1033", "8884-3333-3333-0923", "9233-2111-4032-2388", "9999-2222-0928-2397"]

 let e = Math.round(Math.random() * email.length);
 let a = Math.round(Math.random() * age.length);
 let p = Math.round(Math.random() * password.length);
 let g = Math.round(Math.random());
 let s = Math.round(Math.random() * sexy.length);
 let st = Math.round(Math.random() * status.length);
 let ph = Math.round(Math.random() * phonenumber.length);
 let ip = Math.round(Math.random() * ipadress.length);
 let cc = Math.round(Math.random() * creditcard.length);
 if(e === email.length){e = email.length - 1;}     if(p === password.length){p = password.length - 1;}    if(a === age.length){a = age.length - 1;} if(s === sexy.length){s = sexy.length - 1;} if(g === gender.length){g = gender.length - 1;} if(st === status.length){st = status.length - 1;} if(ph === phonenumber.length){ph = phonenumber.length - 1;}

  message.channel.send("Starting HACK")
     .then(msg => {
                      setTimeout(function() {
             msg.edit({embed: {
                color: 10038562,
                description: 'Loading ' + message.member.user.tag + "'s Profile .",
                timestamp: new Date(),
              }})
             }, 500);
                      setTimeout(function() {
             msg.edit({embed: {
                color: 10038562,
                description: 'Loading ' + message.member.user.tag + "'s Profile ..",
                timestamp: new Date(),
              }})
             }, 1000);
                      setTimeout(function() {
             msg.edit({embed: {
                color: 10038562,
                description: 'Loading ' + message.member.user.tag + "'s Profile ...",
                timestamp: new Date(),
              }})
             }, 1500);
             setTimeout(function() {
             msg.edit({embed: {
                color: 2123412,
                description: '[▘] ``Email:`` ' + email[e],
                timestamp: new Date(),
              }})
             }, 3000);
             setTimeout(function() {
             msg.edit({embed: {
                color: 2067276,
                description: '[▝] ``Password:`` ' + password[p],
                timestamp: new Date(),
              }})
             }, 5000);
             setTimeout(function() {
             msg.edit({embed: {
                color: 7419530,
                description: "[▗] ``Age:`` " + age[a],
                timestamp: new Date(),
              }})
             }, 7000)
             setTimeout(function() {
             msg.edit({embed: {
                color: 12745742,
                description: "[▖] ``Gender:`` " + gender[g],
                timestamp: new Date(),
              }})
             }, 9000)
             setTimeout(function() {
             msg.edit({embed: {
                color: 11027200,
                description:  "[▘] ``Is`` ``" + stuff[g] + "`` ``sexy?`` " + sexy[s],
                timestamp: new Date(),
              }})
             }, 11000)
             setTimeout(function() {
             msg.edit({embed: {
                color: 9936031,
                description:  "[▝] ``Currently`` " + status[st],
                timestamp: new Date(),
              }})
             }, 13000)
             setTimeout(function() {
             msg.edit({embed: {
                color: 2899536,
                description:  "[▗] ``Phone Number:`` " + phonenumber[ph],
                timestamp: new Date(),
              }})
             }, 15000)
             setTimeout(function() {
             msg.edit({embed: {
                color: 12370112,
                description:  "[▖] ``Ip Adress:`` " + ipadress[ip],
                timestamp: new Date(),
              }})
             }, 17000)
             setTimeout(function() {
             msg.edit({embed: {
                color: 9936031,
                description:  "[▘] ``Credit Card Number:`` " + creditcard[cc],
                timestamp: new Date(),
              }})
             }, 18000)
            setTimeout(function() {
              msg.edit({embed: {
                color: 10038562,
                description:  "[▝] Contacting discord TOS...",
                timestamp: new Date(),
              }})
            }, 21000);
            setTimeout(function() {
              msg.edit({embed: {
                color: 11027200,
                description:  "[▗] Reporting account to discord TOS...",
                timestamp: new Date(),
              }})
            }, 23000)
            setTimeout(function() {
              msg.edit({embed: {
                color: 12745742,
                description:  "[▖] Creating a pornhub account...",
                timestamp: new Date(),
              }})
            }, 25000)
            setTimeout(function() {
              msg.edit({embed: {
                color: 7419530,
                description:  "[▘] Now hacking the pornhub account...",
                timestamp: new Date(),
              }})
            }, 27000)
            setTimeout(function() {
              msg.edit({embed: {
                color: 2123412,
                description:  "[▝] Posting nuds on pornhub account",
                timestamp: new Date(),
              }})
            }, 29000)
            setTimeout(function() {
               msg.edit({embed: {
                color: 2067276,
                description:  "[▝] Now hacking medical records.",
                timestamp: new Date(),
              }})
            }, 31000);
    setTimeout(function() {
                   msg.edit({embed: {
                    color: 2067276,
                    description:  "[▗] Now hacking medical records..",
                    timestamp: new Date(),
                  }})
      }, 33000)
                           setTimeout(function() {
                   msg.edit({embed: {
                    color: 2067276,
                    description:  "[▖] Now hacking medical records...",
                    timestamp: new Date(),
                  }})
                    }, 35000)
            setTimeout(function() {
              msg.edit({embed: {
                color: 1146986,
                description:  "Medical record unkown",
                timestamp: new Date(),
              }})
            }, 37000)
            setTimeout(function() {
              msg.edit({embed: {
                color: 3426654,
                description:  "[▘] Now disabling your discord account.",
                timestamp: new Date(),
              }})
            }, 39000)
              setTimeout(function() {
              msg.edit({embed: {
                color: 3426654,
                description:  "[▝] Now disabling your discord account..",
                timestamp: new Date(),
                }})
              }, 41000)
                setTimeout(function() {
              msg.edit({embed: {
                color: 3426654,
                description:  "[▗] Now disabling your discord account...",
                timestamp: new Date(),
                }})
                }, 43000)
              setTimeout(function() {
                msg.edit({embed: {
                    color: 8359053,
                    description:  "Discord account disabled",
                    timestamp: new Date(),
                    }})
              }, 45000)
          setTimeout(function() {
            msg.edit({embed: {
                color: 9807270,
                description:  "Now cry please...",
                timestamp: new Date(),
                }})
          }, 47000)
          setTimeout(function() {
            msg.edit({embed: {
                color: 15158332,
                description:  'I am hacking ' +  message.member.user.tag  + "'s Profile",
                timestamp: new Date(),
                }})
          }, 49000)
            setTimeout(function() {
              msg.edit({embed: {
                color: 15105570,
                description:  "The most ``REAL!!!`` and ``DANGEROUS!!!`` hack is complete xD Gotcha",
                timestamp: new Date(),
                }})
            }, 51000);
     });
    }
}
