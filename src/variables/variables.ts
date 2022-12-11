import {
  card,
  info,
  cv,
  profile,
  profileHeader,
  profileSub,
  profileContent,
  cardWork,
} from "../types/types";

export const emptyCards: card[] = [];

// function randomString(length: number): string {
//   const stringBrut: string =
//     "fusce sodales orci non tempor elementum." +
//     " vestibulum pharetra sapien leo, nec tincidunt lacus accumsan ut." +
//     " aenean convallis porttitor erat, et imperdiet orci finibus sit amet." +
//     " integer neque enim, rhoncus non vestibulum in, rutrum tincidunt nunc." +
//     " duis a sem gravida, aliquam tortor eget, scelerisque lectus." +
//     " nullam vitae purus quis magna aliquam egestas in vitae purus." +
//     " interdum et malesuada fames ac ante ipsum primis in faucibus." +
//     " nullam hendrerit, arcu non facilisis tempus, ante turpis condimentum arcu," +
//     " at mattis mauris nisl id nulla aliquam erat volutpat." +
//     " etiam arcu tellus, commodo a diam aliquet, tempus porta metus. nulla rutrum," +
//     " lectus quis elementum eleifend, orci arcu malesuada magna, vel pharetra elit sapien quis risus." +
//     " vivamus ornare molestie sapien quis varius." +
//     " integer iaculis odio id neque commodo, vitae interdum neque facilisis." +
//     " quisque sollicitudin mi at neque ullamcorper, non elementum magna luctus." +
//     " nullam a tincidunt quam, vitae eleifend ex." +
//     " donec a porttitor diam. nulla et mattis velit, a tempus dui." +
//     " sed dictum, erat nec elementum rhoncus, mauris ex laoreet massa, vel scelerisque tellus libero non magna." +
//     " sed ac nibh vitae ligula pellentesque rutrum.";
//   const stringGlobal: string[] = stringBrut.split(" ");
//   let stringRet: string = "";

//   for (let i = 0; i < Math.floor(Math.random() * length) + 3; i++) {
//     stringRet += stringGlobal[Math.floor(Math.random() * stringGlobal.length)];
//     stringRet += " ";
//   }
//   return stringRet;
// }

// function randomImages(): string[] {
//   const images: string[] = [];
//   let random: number = 0;

//   for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
//     random = Math.floor(Math.random() * 11);
//     images.push("assets/cardImage/image-" + random + ".jpg");
//   }

//   return images;
// }

// function randomCards(): card[] {
//   const cards: card[] = [];
//   let random: number = 0;

//   for (let i = 0; i < 10; i++) {
//     random = Math.floor(Math.random() * 11);
//     cards.push({
//       username: "Default User",
//       title: randomString(5),
//       usernameIcon: "assets/icon/icon.png",
//       image: randomImages(),
//       description: randomString(90),
//       like: Math.floor(Math.random() * 500),
//       share: Math.floor(Math.random() * 500),
//       comments: Math.floor(Math.random() * 500),
//     });
//   }

//   console.log("const cards : card[] = [");
//   for (let i = 0; i < cards.length; i++) {
//     console.log("{");
//     console.log('username : "' + cards[i].username + '",');
//     console.log('title : "' + cards[i].title + '",');
//     console.log('usernameIcon : "' + cards[i].usernameIcon + '",');
//     console.log("image : [");
//     for (let j = 0; j < cards[i].image!.length; j++) {
//       console.log('"' + cards[i].image![j] + '",');
//     }
//     console.log("]" + ",");
//     console.log('description : "' + cards[i].description + '",');
//     console.log("like : " + cards[i].like + ",");
//     console.log("share : " + cards[i].share + ",");
//     console.log("comments : " + cards[i].comments + ",");

//     console.log("},");
//   }
//   console.log("]");

//   return cards;
// }

export const defaultCardsWork: cardWork[] = [
  {
    idCard : 0,
    username: "Default User",
    title: "erat quis neque mauris varius. gravida, ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: false,
  },
  {
    idCard : 1,
    username: "Default User",
    title: "sit magna. sollicitudin imperdiet ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: true,
  },
  {
    idCard : 2,
    username: "Default User",
    title: "magna vitae ante ipsum enim, interdum ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: false,
  },
  {
    idCard : 3,
    username: "Default User",
    title: "et nulla nec ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: false,
  },
  {
    idCard : 4,
    username: "Default User",
    title: "tortor neque vitae sollicitudin malesuada porta ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: true,
  },
  {
    idCard : 5,
    username: "Default User",
    title: "sapien convallis mi fames ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: false,
  },
  {
    idCard : 6,
    username: "Default User",
    title: "nullam eleifend, id neque ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: false,
  },
  {
    idCard : 7,
    username: "Default User",
    title: "tellus egestas sapien convallis faucibus. eleifend non ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: false,
  },
  {
    idCard : 8,
    username: "Default User",
    title: "enim, neque ex. porttitor tortor ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: true,
  },
  {
    idCard : 9,
    username: "Default User",
    title: "integer nisl porttitor ",
    usernameIcon: "assets/icon/icon.png",
    job: "example job",
    area: "example area",
    contract: "example contract",
    favorite: false,
  },
];

export const defaultCards: card[] = [
  {
    username: "Default User",
    title: "erat quis neque mauris varius. gravida, ",
    usernameIcon: "assets/icon/icon.png",
    image: [
      "assets/cardImage/image-10.jpg",
      "assets/cardImage/image-7.jpg",
      "assets/cardImage/image-4.jpg",
    ],
    description:
      "non laoreet neque scelerisque elementum neque interdum mauris pharetra volutpat. sodales eget, erat ",
    like: 455,
    share: 2,
    comments: 27,
  },
  {
    username: "Default User",
    title: "sit magna. sollicitudin imperdiet ",
    usernameIcon: "assets/icon/icon.png",
    image: [
      "assets/cardImage/image-5.jpg",
      "assets/cardImage/image-3.jpg",
      "assets/cardImage/image-7.jpg",
    ],
    description:
      "at sed vel commodo amet. rutrum elementum lectus. varius. arcu magna. eleifend, diam sodales commodo leo, facilisis sapien a scelerisque volutpat. vel leo, ornare a faucibus. ",
    like: 341,
    share: 457,
    comments: 31,
  },
  {
    username: "Default User",
    title: "magna vitae ante ipsum enim, interdum ",
    usernameIcon: "assets/icon/icon.png",
    image: [
      "assets/cardImage/image-8.jpg",
      "assets/cardImage/image-5.jpg",
      "assets/cardImage/image-6.jpg",
    ],
    description:
      "aliquet, dictum, facilisis ornare vitae vitae sapien nullam in, diam. amet. arcu orci sed sapien malesuada eleifend a donec et tempus, ",
    like: 133,
    share: 149,
    comments: 37,
  },
  {
    username: "Default User",
    title: "et nulla nec ",
    usernameIcon: "assets/icon/icon.png",
    image: ["assets/cardImage/image-8.jpg", "assets/cardImage/image-9.jpg"],
    description:
      "nibh nisl ex. massa, porttitor arcu donec orci odio ullamcorper, ipsum leo, non ",
    like: 236,
    share: 344,
    comments: 229,
  },
  {
    username: "Default User",
    title: "tortor neque vitae sollicitudin malesuada porta ",
    usernameIcon: "assets/icon/icon.png",
    image: ["assets/cardImage/image-3.jpg", "assets/cardImage/image-6.jpg"],
    description:
      "mauris lectus vitae arcu in quam, tempus, vivamus mi non eget, condimentum molestie non interdum ",
    like: 83,
    share: 163,
    comments: 24,
  },
  {
    username: "Default User",
    title: "sapien convallis mi fames ",
    usernameIcon: "assets/icon/icon.png",
    image: ["assets/cardImage/image-2.jpg", "assets/cardImage/image-9.jpg"],
    description:
      "purus. hendrerit, lectus in, ex in faucibus. primis malesuada eleifend, metus. ",
    like: 25,
    share: 56,
    comments: 302,
  },
  {
    username: "Default User",
    title: "nullam eleifend, id neque ",
    usernameIcon: "assets/icon/icon.png",
    image: ["assets/cardImage/image-7.jpg", "assets/cardImage/image-5.jpg"],
    description:
      "nullam vel interdum volutpat. erat, laoreet sodales tincidunt tempor metus. lectus. vestibulum et finibus rutrum. donec vel ",
    like: 271,
    share: 110,
    comments: 220,
  },
  {
    username: "Default User",
    title: "tellus egestas sapien convallis faucibus. eleifend non ",
    usernameIcon: "assets/icon/icon.png",
    image: [
      "assets/cardImage/image-10.jpg",
      "assets/cardImage/image-4.jpg",
      "assets/cardImage/image-6.jpg",
    ],
    description:
      "nulla in, ex. erat, aliquam vitae sed nulla nisl convallis rutrum ex arcu, ",
    like: 308,
    share: 370,
    comments: 78,
  },
  {
    username: "Default User",
    title: "enim, neque ex. porttitor tortor ",
    usernameIcon: "assets/icon/icon.png",
    image: [
      "assets/cardImage/image-6.jpg",
      "assets/cardImage/image-7.jpg",
      "assets/cardImage/image-0.jpg",
      "assets/cardImage/image-7.jpg",
    ],
    description:
      "etiam iaculis condimentum aliquam magna orci lacus nulla sed arcu, tellus, et non erat tempus, sollicitudin orci ",
    like: 195,
    share: 54,
    comments: 20,
  },
  {
    username: "Default User",
    title: "integer nisl porttitor ",
    usernameIcon: "assets/icon/icon.png",
    image: [
      "assets/cardImage/image-5.jpg",
      "assets/cardImage/image-0.jpg",
      "assets/cardImage/image-4.jpg",
      "assets/cardImage/image-6.jpg",
    ],
    description:
      "orci interdum condimentum nulla pharetra nulla purus. odio eleifend elementum tellus ac neque et ",
    like: 240,
    share: 290,
    comments: 488,
  },
];
export const emptyInfos: info[] = [];

export const defaultInfos: info[] = [
  {
    key: 0,
    label: "infos 1",
    subInfos: [
      {
        key: 0,
        label: "sub info 0",
        desc: "Je suis une description.",
      },
      {
        key: 1,
        label: "sub info 1",
        desc: "Je suis une description. Je suis une description.",
      },
      {
        key: 2,
        label: "sub info 2",
        desc:
          "Je suis une description. Je suis une description. Je suis une description.",
      },
      {
        key: 3,
        label: "sub info 3",
        desc:
          "Je suis une description. Je suis une description. Je suis une description. Je suis une description.",
      },
      {
        key: 4,
        label: "sub info 4",
        desc:
          "Je suis une description. Je suis une description. Je suis une description. Je suis une description. Je suis une description.",
      },
    ],
  },
  {
    key: 1,
    label: "infos 2",
    subInfos: [
      {
        key: 0,
        label: "sub info 0",
        desc: "Je suis une description.",
      },
      {
        key: 1,
        label: "sub info 1",
        desc: "Je suis une description. Je suis une description.",
      },
      {
        key: 2,
        label: "sub info 2",
        desc:
          "Je suis une description. Je suis une description. Je suis une description.",
      },
      {
        key: 3,
        label: "sub info 3",
        desc:
          "Je suis une description. Je suis une description. Je suis une description. Je suis une description.",
      },
      {
        key: 4,
        label: "sub info 4",
        desc:
          "Je suis une description. Je suis une description. Je suis une description. Je suis une description. Je suis une description.",
      },
    ],
  },
  {
    key: 2,
    label: "infos 3",
    subInfos: [
      {
        key: 0,
        label: "sub info 0",
        desc: "Je suis une description.",
      },
      {
        key: 1,
        label: "sub info 1",
        desc: "Je suis une description. Je suis une description.",
      },
      {
        key: 2,
        label: "sub info 2",
        desc:
          "Je suis une description. Je suis une description. Je suis une description.",
      },
      {
        key: 3,
        label: "sub info 3",
        desc:
          "Je suis une description. Je suis une description. Je suis une description. Je suis une description.",
      },
      {
        key: 4,
        label: "sub info 4",
        desc:
          "Je suis une description. Je suis une description. Je suis une description. Je suis une description. Je suis une description.",
      },
    ],
  },
];

export const emptyCV: cv = {
  key: -1,
  label: "curriculum vitae",
  cvLink: "",
};

export const defaultCV: cv = {
  key: -1,
  label: "voici un cv",
  cvLink: "assets/file/cv.pdf",
};

export const emptyProfileHeader: profileHeader = {
  username: "",
  usernameIcon: "",
  formation: "",
  city: "",
  description: "",
};

export const defaultProfileHeader: profileHeader = {
  username: "Julien Durest",
  usernameIcon:
    "https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg",
  formation: "Graphiste Freelance",
  city: "Bordeaux, FR",
  description:
    "Logos / redesign\nProjet NFT en cours ...\nContactez moi pour vos projets",
};

export const emptyProfileSub: profileSub = {
  subscribeds: 0,
  subscribers: 0,
};

export const defaultProfileSub: profileSub = {
  subscribers: 354,
  subscribeds: 102,
};

export const emptyProfileContent: profileContent = {
  cards: emptyCards,
  infos: emptyInfos,
  cv: emptyCV,
};

export const defaultProfileContent: profileContent = {
  cards: defaultCards,
  cv: defaultCV,
  infos: defaultInfos,
};

export const emptyProfile: profile = {
  profilHeader: emptyProfileHeader,
  profilSub: emptyProfileSub,
  profileContent: emptyProfileContent,
};

export const defaultProfile: profile = {
  profilHeader: defaultProfileHeader,
  profilSub: defaultProfileSub,
  profileContent: defaultProfileContent,
};
