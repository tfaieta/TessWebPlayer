import React, { Component }  from 'react'
import {AsideNav} from '../../components/AsideNav/AsideNav'
import {Header} from '../../components/Header/Header'
import firebase from 'firebase';
import {store} from "../../store/index";
import {ExpansionPanel} from 'react-md';
import {Pod} from "../../components/Pod/Pod";


export class Category extends React.Component {

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }

    constructor(props) {
        super(props);

        this.state = {
            news: [], newsData: [],
            fitness: [], fitnessData: [],
            religion: [], religionData: [],
            society: [], societyData: [],
            comedy: [], comedyData: [],
            lifestyle: [], lifestyleData: [],
            science: [], scienceData: [],
            travel: [], travelData: [],
            learn: [], learnData: [],
            story: [], storyData: [],
            sports: [], sportsData: [],
            entertainment: [], entertainmentData: [],
            music: [], musicData: [],
            tech: [], techData: [],
            gaming: [], gamingData: [],
            business: [], businessData: []
        };

        let currentUser = {uid: store.getState().auth.uid};

        // categories
        this.state.news.push('This American Life');
        this.state.news.push('The Daily');
        this.state.news.push('The Ezra Klein Show');
        this.state.news.push('The Tom Woods Show');
        this.state.news.push('Pod Save America');
        this.state.news.push('Pod Save the People');
        this.state.news.push('Lovett or Leave It');
        this.state.news.push('Chapo Trap House');
        this.state.news.push('Global News Podcast');
        this.state.news.push('Innovation Hub');
        this.state.news.push('In the Dark');
        this.state.news.push('The Daily Show With Trevor Noah: Ears Edition');
        this.state.news.push('Throwing Shade');

        let newsPods = [];
        this.state.news.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    newsPods.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                newsPods.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            newsPods.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        newsPods.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });

        this.state.fitness.push('Trail Runner Nation');
        this.state.fitness.push('Ben Greenfield Fitness: Diet, Fat Loss and Performance');
        this.state.fitness.push('The Rich Roll Podcast');
        this.state.fitness.push('The Bearded Vegans');
        this.state.fitness.push('Vegan Warrior Princesses Attack!');

        let fitnessData = [];
        this.state.fitness.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    fitnessData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                fitnessData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            fitnessData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        fitnessData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });

        this.state.society.push('Oprah’s SuperSoul Conversations');
        this.state.society.push('Philosophize This!');
        this.state.society.push('Atlanta Monster');
        this.state.society.push('Hello Internet');
        this.state.society.push('Nancy');
        this.state.society.push('Revisionist History');
        this.state.society.push('In Our Time');
        this.state.society.push('Missing Richard Simmons');
        this.state.society.push('On Being with Krista Tippett');
        this.state.society.push('Still Processing');
        this.state.society.push('The Mission Daily');
        this.state.society.push('Stuff You Should Know');
        this.state.society.push('Freakonomics Radio');
        this.state.society.push('The Best Ideas Podcast');
        this.state.society.push('The Lively Show');
        this.state.society.push('American Innovations');
        this.state.society.push('Love + Radio');
        this.state.society.push('Couples Therapy with Candice and Casey');
        this.state.society.push('Batman');

        let societyData = [];
        this.state.society.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    societyData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                societyData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            societyData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        societyData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });

        this.state.religion.push('New World Kirtan');
        this.state.religion.push('Waking Up with Sam Harris');

        let religionData = [];
        this.state.religion.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    religionData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                religionData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            religionData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        religionData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.comedy.push('The Joe Rogan Experience');
        this.state.comedy.push('VIEWS with David Dobrik and Jason Nash');
        this.state.comedy.push('Guys We F****d');
        this.state.comedy.push('WTF with Marc Maron Podcast');
        this.state.comedy.push('Ear Biscuits');
        this.state.comedy.push('H3 Podcast');
        this.state.comedy.push('2 Dope Queens');
        this.state.comedy.push('ID10T with Chris Hardwick');
        this.state.comedy.push('Comedy Bang Bang: The Podcast');
        this.state.comedy.push('The Adam Carolla Show');
        this.state.comedy.push('How Did This Get Made?');
        this.state.comedy.push('IDK Podcast');
        this.state.comedy.push('Psychobabble with Tyler Oakley & Korey Kuhl');
        this.state.comedy.push('The Great Debates');
        this.state.comedy.push('My Favorite Murder with Karen Kilgariff and Georgia Hardstark');
        this.state.comedy.push('The Official Podcast');
        this.state.comedy.push('Welcome to Night Vale');
        this.state.comedy.push('Last Podcast On The Left');
        this.state.comedy.push('My Dad Wrote A Porno');
        this.state.comedy.push('The Daily Show With Trevor Noah: Ears Edition');
        this.state.comedy.push('Potterless');
        this.state.comedy.push('Shmanners');
        this.state.comedy.push('Throwing Shade');
        this.state.comedy.push('TigerBelly');
        this.state.comedy.push('The World of Phil Hendrie');
        this.state.comedy.push('The Adventure Zone');

        let comedyData = [];
        this.state.comedy.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    comedyData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                comedyData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            comedyData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        comedyData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.lifestyle.push('Design Matters with Debbie Millman');
        this.state.lifestyle.push('The Unbeatable Mind Podcast with Mark Divine');
        this.state.lifestyle.push('The Colin and Samir Podcast');
        this.state.lifestyle.push('The Ground Up Show');

        let lifestyleData = [];
        this.state.lifestyle.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    lifestyleData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                lifestyleData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            lifestyleData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        lifestyleData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.science.push('Radiolab');
        this.state.science.push('StarTalk Radio');
        this.state.science.push("Invisibilia");
        this.state.science.push('Sword and Scale');
        this.state.science.push('Why We Do What We Do');
        this.state.science.push('Waking Up with Sam Harris');
        this.state.science.push("The Struggling Archaeologist's Guide to Getting Dirty");

        let scienceData = [];
        this.state.science.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    scienceData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                scienceData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            scienceData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        scienceData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.travel.push('Zero to Travel');
        this.state.travel.push('Travel with Rick Steves');
        this.state.travel.push('The Budget Minded Traveler: Travel | Adventure | Lifestyle');

        let travelData = [];
        this.state.travel.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    travelData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                travelData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            travelData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        travelData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });

        this.state.learn.push('TED Radio Hour');
        this.state.learn.push('The Blog of Author Tim Ferriss');
        this.state.learn.push('Entrepreneurs On Fire | Ignite your Entrepreneurial journey');
        this.state.learn.push('Forward Tilt by Praxis');
        this.state.learn.push('Omitted');
        this.state.learn.push('Quick Talk Podcast - Growing Your Cleaning Or Home Service Business');
        this.state.learn.push('RadiusBombcom - Quick Talk Podcast');
        this.state.learn.push('TED Talks');
        this.state.learn.push('The Art of Charm | High Performance Techniques| Cognitive Development | Relationship Advice | Mastery of Human Dynamics');
        this.state.learn.push('The Creative Exchange');
        this.state.learn.push('The Mixology Talk Podcast: Better Bartending and Making Great Drinks');
        this.state.learn.push("The Struggling Archaeologist's Guide to Getting Dirty");
        this.state.learn.push('Wow in the World');

        let learnData = [];
        this.state.learn.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    learnData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                learnData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            learnData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        learnData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.story.push('Serial');
        this.state.story.push("Dan Carlin's Hardcore History");
        this.state.story.push('S-Town');
        this.state.story.push('Dirty John');
        this.state.story.push('Crimetown');
        this.state.story.push('Criminal');
        this.state.story.push('Lum and Abner – Retro Radio Podcast');

        let storyData = [];
        this.state.story.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    storyData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                storyData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            storyData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        storyData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.sports.push('The Bill Simmons Podcast');
        this.state.sports.push('The Herd with Colin Cowherd');
        this.state.sports.push('Men In Blazers');
        this.state.sports.push('The Steve Austin Show');

        let sportsData = [];
        this.state.sports.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    sportsData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                sportsData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            sportsData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        sportsData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });

        this.state.entertainment.push('Fresh Air');
        this.state.entertainment.push('You Must Remember This');
        this.state.entertainment.push('The Colin and Samir Podcast');
        this.state.entertainment.push('Couples Therapy with Candice and Casey');
        this.state.entertainment.push('Curious with Josh Peck');
        this.state.entertainment.push('The Creative Exchange');
        this.state.entertainment.push('Fantastic Geeks (and where to find them)');
        this.state.entertainment.push('The Inner Tube: Answering Your Content Creation Questions!');
        this.state.entertainment.push('La Corneta');

        let entertainmentData = [];
        this.state.entertainment.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    entertainmentData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                entertainmentData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            entertainmentData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        entertainmentData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.music.push('No Jumper');
        this.state.music.push('Song Exploder');
        this.state.music.push('CLUBLIFE');
        this.state.music.push('The Combat Jack Show');

        let musicData = [];
        this.state.music.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    musicData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                musicData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            musicData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        musicData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.tech.push('Reply All');
        this.state.tech.push('Y Combinator');
        this.state.tech.push('StartUp Podcast');
        this.state.tech.push('The Pitch');
        this.state.tech.push('Recode Decode, hosted by Kara Swisher');
        this.state.tech.push('Recode Media with Peter Kafka');
        this.state.tech.push('Recode Replay');
        this.state.tech.push('Full Stack Radio');
        this.state.tech.push('Hanselminutes - Fresh Talk and Tech for Developers');
        this.state.tech.push('Presentable');
        this.state.tech.push('The Changelog');
        this.state.tech.push('JS Party');
        this.state.tech.push('Practical AI');
        this.state.tech.push('Spotlight');

        let techData = [];
        this.state.tech.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    techData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                techData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            techData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        techData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.gaming.push('Game Scoop!');
        this.state.gaming.push('Triforce!');
        this.state.gaming.push('The Adventure Zone');
        this.state.gaming.push('Painkiller Already');
        this.state.gaming.push('Ask Me Another');
        this.state.gaming.push('FrazlCast - A World of Warcraft Podcast');
        this.state.gaming.push('Frazley Report - Your World of Warcraft News');

        let gamingData = [];
        this.state.gaming.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    gamingData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                gamingData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                           gamingData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                       gamingData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });


        this.state.business.push('The GaryVee Audio Experience');
        this.state.business.push('Girlboss Radio with Sophia Amoruso');
        this.state.business.push('HBR IdeaCast');
        this.state.business.push('How I Built This with Guy Raz');
        this.state.business.push('Masters of Scale with Reid Hoffman');
        this.state.business.push('Planet Money');
        this.state.business.push('StartUp Podcast');
        this.state.business.push('The Smart Passive Income Online Business and Blogging Podcast');
        this.state.business.push('The Indie Hackers Podcast');
        this.state.business.push('Y Combinator');
        this.state.business.push('The Pitch');
        this.state.business.push('Accidental Tech Podcast');
        this.state.business.push('This Week in Startups - Audio');
        this.state.business.push('Founders Talk');

        let businessData = [];
        this.state.business.forEach(function (data) {
            firebase.database().ref(`users/${data}/username`).once("value", function (user) {
                if(user.val()){
                    firebase.database().ref(`users/${data}/bio`).once("value", function (bio) {
                        if(bio.val()){
                            firebase.database().ref(`users/${data}/profileImage`).once('value', function (image) {
                                if(image.val()){
                                    businessData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: false});
                                    if(currentUser.uid != ''){
                                        firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                            if(following.val()){
                                                businessData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                            }
                                        })
                                    }
                                }
                                else{
                                    const storageRef = firebase.storage().ref(`/users/${data}/image-profile-uploaded`);
                                    storageRef.getDownloadURL()
                                        .then(function(url) {
                                            businessData.push({username: user.val().username, id: data, profileImage: url, bio: bio.val().bio, following: false});
                                            if(currentUser.uid != ''){
                                                firebase.database().ref(`users/${currentUser.uid}/following/${data}`).once('value', function (following) {
                                                    if(following.val()){
                                                        businessData.push({username: user.val().username, id: data, profileImage: image.val().profileImage, bio: bio.val().bio, following: true});
                                                    }
                                                })
                                            }
                                        }).catch(function(error) {
                                        //
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });



        this.timeout1 = setTimeout(() => {this.setState({newsData: newsPods, fitnessData: fitnessData, societyData: societyData, religionData: religionData, comedyData: comedyData, lifestyleData: lifestyleData, scienceData: scienceData, travelData: travelData, learnData: learnData, storyData: storyData, sportsData: sportsData, entertainmentData: entertainmentData, musicData: musicData, techData: techData, gamingData: gamingData, businessData: businessData })}, 2500);

    }

    render() {
        return (
            <div>
                <Header props={this.props}/>

                <div className="tcontent">
                    <AsideNav/>
                    <div className="tsscrollwrap">
                        <div className="tsscrollcontent">
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>News</h1>
                                    }>
                                    <div className="row">
                                        {this.state.newsData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Fitness</h1>
                                    }>
                                    <div className="row">
                                        {this.state.fitnessData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Society</h1>
                                    }>
                                    <div className="row">
                                        {this.state.societyData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Religion</h1>
                                    }>
                                    <div className="row">
                                        {this.state.religionData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Comedy</h1>
                                    }>
                                    <div className="row">
                                        {this.state.comedyData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Lifestyle</h1>
                                    }>
                                    <div className="row">
                                        {this.state.lifestyleData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Travel</h1>
                                    }>
                                    <div className="row">
                                        {this.state.travelData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Learn</h1>
                                    }>
                                    <div className="row">
                                        {this.state.learnData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Story</h1>
                                    }>
                                    <div className="row">
                                        {this.state.storyData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Sports</h1>
                                    }>
                                    <div className="row">
                                        {this.state.sportsData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Entertainment</h1>
                                    }>
                                    <div className="row">
                                        {this.state.entertainmentData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Music</h1>
                                    }>
                                    <div className="row">
                                        {this.state.musicData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Tech</h1>
                                    }>
                                    <div className="row">
                                        {this.state.techData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Gaming</h1>
                                    }>
                                    <div className="row">
                                        {this.state.gamingData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                            <div className="container">
                                <ExpansionPanel
                                    headerStyle={null}
                                    animateContent={true}
                                    footer={null}
                                    label = {
                                        <h1>Business</h1>
                                    }>
                                    <div className="row">
                                        {this.state.businessData.map((_, i) => (
                                            <div key={i} className="col-xs-4 col-sm-4 col-md-3 col-lg-2">
                                                <Pod menukey={i} user={_}/>
                                            </div>
                                        ))}
                                    </div>
                                </ExpansionPanel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}