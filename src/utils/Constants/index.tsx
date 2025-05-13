import {
  A,
  A1,
  abjlist,
  abjlist2,
  bac1,
  bac2,
  ball0,
  ball1,
  ball2,
  ball3,
  ball4,
  ball6,
  ballW,
  cards32A,
  cards32B,
  cmeter,
  crick5,
  dayteen,
  dt20,
  dt2020,
  dt6,
  dtl20,
  eight,
  eight8,
  eleven,
  eleven11,
  five,
  five5,
  four,
  four4,
  img10,
  img2,
  img3,
  img4,
  img6,
  imgA,
  imgK,
  luck7B,
  lucky7A,
  nine,
  nine9,
  p1d,
  p20,
  p6,
  seven,
  seven7,
  six,
  six6,
  superover,
  teenplayer,
  ten,
  ten10,
  testteen,
  thirteen,
  thirteen13,
  three,
  three3,
  twelve,
  twelve12,
  twentyteen,
  two,
  two2,
} from "../../assets";
import AndarBaharRules from "../../components/cardGames/games/abj2/rules";
import AmarAkbarRules from "../../components/cardGames/games/amarAkbarAnthony/rules";
import BaccaratRules from "../../components/cardGames/games/baccarat1/rules";
import BaccaratRules2 from "../../components/cardGames/games/baccarat2/rules";
import BallByBallRules from "../../components/cardGames/games/ballbyball/desktop/rules";
import BollywoodTableGameRules from "../../components/cardGames/games/bollywoodTable/rules";
import Card32ARules from "../../components/cardGames/games/card32A/rules";
import CasinoRulesImage from "../../components/cardGames/games/casinoMeter/rules";
import CasinoWarRules from "../../components/cardGames/games/casinoWar/rules";
import Cricket5Rules from "../../components/cardGames/games/cricket5/rules";
import Cricket20Rules from "../../components/cardGames/games/cricketMatch_20/rules";
import DragonRules from "../../components/cardGames/games/dragon2nd20/rules";
import DTLGameRules from "../../components/cardGames/games/dragonTigerLion/rules";
import Lucky7Rules from "../../components/cardGames/games/lucky7/rules";
import PokerRules from "../../components/cardGames/games/poker1Day/rules";
import Race20Rules from "../../components/cardGames/games/race20/rules";
import SuperOverRules from "../../components/cardGames/games/superOver/rules";
import TeenpattiRules from "../../components/cardGames/games/teenpatti1D/rules";
import Teen20Rules from "../../components/cardGames/games/teenpatti2020/rules";
export const ApiConstants = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    OLD_PASSWORD: "/user/check/oldPassword",
  },
  USER: {
    BALANCEUPDATE: "/balance/update",
    USERBALANCE: "/user/balance",
    CHANGEPASSWORD: "/user/changePassword",
    LIST: "/user/list",
    SEARCH_LIST: "/user/searchlist",
    ADDFGADMIN: "/user/add",
    ADDURLADMIN: "/superadmin/create",
    ADDEXPERT: "/expert/add",
    ALREADY_EXIST: "/user/exist",
    UPDATE: "/user/updateUser",
    PROFILE: "/user/profile",
    USER_DETAILS_FOR_PARENT: "/user/getUserDetailsForParent",
    LOCKUNLOCK: "/user/lockUnlockUser",
    CREDITREFERRENCE: "/user/update/creditreferrence",
    EXPOSURELIMIT: "/user/update/exposurelimit",
    USER_MATCH_LOCK: "/user/userMatchLock",
    USER_MARKET_LOCK: "/user/userMarketLock",
    USER_MATCH_LOCK_ALL_CHILD: "/user/getMatchLockAllChild",
    USER_MARKET_LOCK_ALL_CHILD: "/user/getMarketLockAllChild",
    USER_DETAIL_FOR_PARENT: "/user/getUserDetailsForParent",
    USER_CHECK_CHILD_DEACTIVATE: "/user/checkChildDeactivate",
    TOTAL_BALANCE: "user/child/totalBalance",
    USER_WISE_EVENTWISE_EXPOSURE: "/match/eventWise/exposure",
  },
  EXPERT: {
    COMPETITIONLIST: "/expert/match/competitionList/",
    COMPETITIONDATES: "/expert/match/competition/dates/",
    COMPETITIONMATCHES: "/expert/match/competition/getMatch/",
  },
  REPORT: {
    ACCOUNTLIST: "/transaction/get",
    BETHISTORY: "/bet",
    GENRALREPORT: "user/generalReport",
    PROFIT_LOSS: "/bet/profitLoss",
    BET_ACCOUNTSTATEMENT: "/bet/accountStatement",
    CARD_RESULT_REPORT: "/card/result/",
    CASINO_REPORT: "/mac88/bets",
    CASINO_REPORT_PROVIDERS: "/mac88/providers",
  },
  MULTILOGIN: {
    ACCESSUSER: "/accessUser",
    LOCKACCESSUSER: "/accessUser/lock",
    CHANGEPASSWORDACCESSUSER: "/accessUser/change/password",
  },
  MATCH: {
    MATCHLIST: "/match/list",
    SEARCHLIST: "/user/searchlist",
    MATCHDETAILS: "/match/",
    CURRENTBET: "/bet",
    MARKETANALYSIS: "/match/marketAnalysis",
    MARKETWISE_USERBOOK: "/match/marketWise/userBook/",
  },
  BET: {
    PLACEBETSESSION: "bet/session",
    PLACEBETMATCHBETTING: "bet/matchBetting",
    GETPLACEDBETS: "bet",
    RUN_AMOUNT: "bet/session/profitLoss",
  },
  CARDS: {
    MATCH: {
      GET_CARD_DETAIL: "/match/card",
      GET_CARD_DETAIL_INITIAL: "/match/initial/card",
      PLACE_BET: "/bet/cardBetting",
      RESULT: "/card/result/detail",
    },
  },
  SCOREBOARD: {
    match: "/api/tunnel/casino/sport-score",
  },
  LIVESTREAM: {
    GET_CHANNEL_ID: "https://scoreapi.365cric.com/api/match/getStream",
    GET_VIDEO: "https://video.proexch.in/tv/static",
  },
  AUTHENTICATOR: {
    generateAuthToken: "/auth/generateAuthToken",
    verifyAuthToken: "/auth/verifyAuthToken",
    getAuthenticator: "/auth/getAuthenticator",
    resendToken: "/auth/resend/token",
    removeAuthenticator: "/auth/removeAuthenticator",
  },
};

export const Constants = {
  apiBasePath: "https://devmaxbet9api.fairgame.club",
  thirdParty: "https://devserviceapi.fairgame.club",
  expertPath: "https://devexpertapi.fairgame.club",
  apiBasePathLive: "https://api.maxbet07.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  expertPathLive: "https://expertapi.fairgame7.com",
  thirdPartyCard: "https://casinoserviceapi.fairgame.club",
  thirdPartyCardLive: "https://casinoserviceapi.fairgame7.com",
  localPath: "http://localhost:5000",
  localPathThird: "http://localhost:3200",
  localPathExpert: "http://localhost:6060",
  localThirdCard: "http://localhost:3201",
  WEBSOCKET: "websocket",
  POLLING: "polling",
  PAGELIMIT: 15,
  randomeNumber: "JiskaPataNaLageG",
  publicNumber: `U2FsdGVkX1+7Lz0LzD8AsrBoHiQrViZiWhIWBqYuL4dgfGXwUbjJndfELn+Usn4xpSEl8s1RoIqzSS/EHUfPLYK/iq/6V0lKQpDaaK52maKES7/cOdFiuXYTVTGu+/HajYeHTly+Xgn1egPHG1NcK9wP6U3vTUDEkHaB2C4hNejgB/JPzdDD8pp60kc+VzCrkbxbRM2oiR4iEtCRQPac4vz0SdQFaSPaG1gexmBFdu/w5ZMSPoPxuSM2rSA0UvmYobUoP5VkQbkIlL1fZhlwOmJ2bm5AHUyfzfHU1njCgwYhB6eJswzg0Qr8lu2cstCaB6zmxeXmdYF41o157foAyeXgBT/TRYt4nwFQ4WuKngLRPPjM6/LD/sY9sZBFv58i`,
  privateNumber: `U2FsdGVkX19PB0k7pc6tsaolSzWPHY2kgJvHhevrMQ7JuPxXzoTJ/RVKBD6yBUt3xnPx4Nu+beP2YSbQ5GvSxw0ZJRzPMDNp1UOtOPzl5afvOf2wbvZLzhHSkW/qUmERYHLa7b24YLZDY0nIjS6PRLxc22qlRavxSa0/LCRGN0tWmTneiwD6aCgYPkD6YyzpL7qhBPCPSzCJ4CG05wknMfhg6kZSfNEYssJy3moQdlNTjr/6H923TMHCyE5GNfXeLgEYFdA2xxfbRiDJNvm9oJeDyhOiKOqM5kw7GceZQ4pHbtd4snOkfrMjVCY+ogpkXGpauvyTO+dJrqb2rDJ2OZlfHgXhCbWXlyq6CPFmmwqly5ZtJMDyOLhUZ/yJ2z4e/vLJYFuEcOFk4BQrpmnsAiVsCZyV9WGZER5mR11Wri0kWBw0Nya/mbGljAYWJzB8PcpUvZcwa3/Zoh6WgYzoSeAKWP8ftQvcHOQIa7XrFUWWYGH9DpHFJ4f2TnLb+azIMeFkdLXRTO0wETkf3G1H8uSND7B95tHn4L77wcXe5lHTguj4vFHs3dy+o+sqRKqilB6et/ehikfinAh6aBg2isbVnnp5BFzvfwwPKEMb1bKfMpFB3xg9ip8qsVKN6t3Igx5ur8E6ZQ/GpQ4IBUqFc/gkj3cA4v+inA/x/J4Al3RB2kw5V3Jm0Nq9cDf7pUY9AGOoTWZz+TOGKXCrctWBRolCLBmJRKMBGcPCZd7WgCTU3dMzqb4MB8e86QBVNQO8rAr1Nb4IQIcohAthGaFScD0VmWv1/omL0GxIvFY+tNl0IT9OK0rF9pAM+LjuCzP56MeMpEQx+K5LR8sUQtN9QXcHaQfmkBv8ThPmQGkyRKM7t6Pimf9j1niiUp3HArtIFCKFTzYpPEXHc0LeAYLr7TQ06zlLuQLsOcHsIim/0aNAjyXVUFcVvNX673sKA6wvaAMLdJOAzea54U+MVOgeP1t2WTJGjr7TiUKm8SWxVy0OhxRKyjFtJPGktUCYA/4h0oNtVb1atSBBGfcbtt6RubdtQzGfYGjjJHSc329dS17AgoCdlyu1FllcJ3MqGya6LySxBN29Jh9qM9N5Qw3cnvvkkhG/f0yj44Vcna3MjxS4gobAFa5jZacxQ8w0xGRkjETfN/22Kt7qUZnKwQ5f21iMeTDXDtNwN/Pld866Z9GVBQKekM6J9AhR0kWVZJQJ`,
};

export const cardUrl =
  process.env.NODE_ENV === "production"
    ? "https://alpha-n.qnsports.live/route/jat.php?id="
    : "https://alpha-n.qnsports.live/route/jat.php?id=";

export const liveStreamUrlCricket =
  "https://dpmatka.in/dd.php?sportId=4&eventId=";
export const liveStreamUrl = "https://maxbet07.com";
export const tvUrl = "https://serviceapi.fairgame7.com";
export const scoreBoardUrlMain =
  "https://dpmatka.in/anm.php?type=scorecard&eventId=";

// const oldVideoUrl = "https://video.proexch.in/route/?id="
// use below baseUrl for live build

// export const serviceUrl =
//   process.env.NODE_ENV === "production"
//     ? Constants.apiBasePath
//     : Constants.localPath;

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.apiBasePath}`
//       : `${Constants.localPath}`,
//   thirdParty:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.thirdParty}`
//       : `${Constants.localPathThird}`,
//   expertSocket:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.expertPath}`
//       : `${Constants.localPathExpert}`,
//   cardSocket:
//     process.env.NODE_ENV === "production"
//       ? Constants.thirdPartyCard
//       : Constants.localThirdCard,
// };

// use below baseUrl for live build

export const serviceUrl =
  process.env.NODE_ENV === "production"
    ? Constants.apiBasePathLive
    : Constants.localPath;

export const baseUrls = {
  socket:
    process.env.NODE_ENV === "production"
      ? `${Constants.apiBasePathLive}`
      : `${Constants.localPath}`,
  thirdParty:
    process.env.NODE_ENV === "production"
      ? `${Constants.thirdPartyLive}`
      : `${Constants.localPathThird}`,
  expertSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.expertPathLive}`
      : `${Constants.localPathExpert}`,
  cardSocket:
    process.env.NODE_ENV === "production"
      ? Constants.thirdPartyCardLive
      : Constants.localThirdCard,
};

export const sessionBettingType = {
  session: "session",
  fancy1: "fancy1",
  overByOver: "overByover",
  ballByBall: "ballByBall",
  oddEven: "oddEven",
  cricketCasino: "cricketCasino",
  khado: "khado",
  meter: "meter",
};

export const card3 = {
  dragonTiger: [
    {
      id: 1,
      url: "/admin/casinoDetail/dt202",
      imgSrc: dt2020,
      name: "20-20 DRAGON TIGER 2",
    },
    {
      id: 2,
      url: "/admin/casinoDetail/dtl20",
      imgSrc: dtl20,
      name: "20-20 DRAGON TIGER LION",
    },
    {
      id: 3,
      url: "/admin/casinoDetail/dt6",
      imgSrc: dt6,
      name: "1 DAY DRAGON TIGER",
    },
    {
      id: 4,
      url: "/admin/casinoDetail/dt20",
      imgSrc: dt20,
      name: "20-20 DRAGON TIGER",
    },
  ],
  teenPatti: [
    {
      id: 5,
      url: "/admin/casinoDetail/teenPatti20",
      imgSrc: twentyteen,
      name: "20-20 TEENPATTI",
    },
    {
      id: 6,
      url: "/admin/casinoDetail/teen",
      imgSrc: dayteen,
      name: "1 DAY TEENPATTI",
    },
    {
      id: 7,
      url: "/admin/casinoDetail/teen9",
      imgSrc: testteen,
      name: "TEST TEENPATTI",
    },
    {
      id: 8,
      url: "/admin/casinoDetail/teen8",
      imgSrc: teenplayer,
      name: "OPEN TEENPATTI",
    },
  ],
  lucky7: [
    {
      id: 9,
      url: "/admin/casinoDetail/lucky7-A",
      imgSrc: lucky7A,
      name: "Lucky 7 A",
    },
    {
      id: 10,
      url: "/admin/casinoDetail/lucky7eu",
      imgSrc: luck7B,
      name: "Lucky 7 B",
    },
  ],
  cards32: [
    {
      id: 11,
      url: "/admin/casinoDetail/32cards-A",
      imgSrc: cards32A,
      name: "Card 32 A",
    },
    {
      id: 12,
      url: "/admin/casinoDetail/card32eu",
      imgSrc: cards32B,
      name: "Card 32 B",
    },
  ],
  abj: [
    {
      id: 13,
      url: "/admin/casinoDetail/abj2",
      imgSrc: abjlist2,
      name: "ANDAR BAHAR 2",
    },
    {
      id: 14,
      url: "/admin/casinoDetail/ab20",
      imgSrc: abjlist,
      name: "ANDAR BAHAR",
    },
  ],
  sportCasino: [
    // { id: 15, url: "", imgSrc: ballByBall, name: "BALL BY BALL" },
    {
      id: 16,
      url: "/admin/casinoDetail/superover",
      imgSrc: superover,
      name: "SUPER OVER",
    },
    {
      id: 17,
      url: "/admin/casinoDetail/cricketv3",
      imgSrc: crick5,
      name: "5 5 Cricket",
    },
    {
      id: 21,
      url: "/admin/casinoDetail/cmeter",
      imgSrc: cmeter,
      name: "CASINO METER",
    },
    {
      id: 22,
      url: "/admin/casinoDetail/cmatch20",
      imgSrc:
        "https://dataobj.ecoassetsservice.com/casino-icons/lc/cmatch20.jpg",
      name: "Cricket Match 20-20",
    },
  ],
  poker: [
    { id: 18, url: "/admin/casinoDetail/poker6", imgSrc: p6, name: "POKER 6" },
    {
      id: 19,
      url: "/admin/casinoDetail/poker",
      imgSrc: p1d,
      name: "POKER 1 DAY",
    },
    {
      id: 20,
      url: "/admin/casinoDetail/poker20",
      imgSrc: p20,
      name: "POKER 20 20",
    },
  ],
  bollywoodCasino: [
    {
      id: 23,
      url: "/admin/casinoDetail/aaa",
      imgSrc:
        "https://ik.imagekit.io/bmaxmbpyx/https://247maharaja.com/assets/images/game-icon/-1016.webp",
      name: "AMAR AKHBAR ANTHONY",
    },
    {
      id: 24,
      url: "/admin/casinoDetail/btable",
      imgSrc:
        "https://ik.imagekit.io/bmaxmbpyx/https://247maharaja.com/assets/images/game-icon/-1015.webp",
      name: "BOLLYWOOD TABLE",
    },
  ],
  worli: [
    {
      id: 25,
      url: "/admin/casinoDetail/worli2",
      imgSrc:
        "https://ik.imagekit.io/bmaxmbpyx/https://247maharaja.com/assets/images/game-icon/-1013.webp",
      name: "Worli",
    },
  ],

  "3cardj": [
    {
      id: 26,
      url: "/admin/casinoDetail/3cardj",
      imgSrc: "https://dataobj.ecoassetsservice.com/casino-icons/lc/3cardj.jpg",
      name: "3 Cards Judgement",
    },
  ],
  baccarat: [
    {
      url: "/admin/casinoDetail/baccarat2",
      imgSrc: bac1,
      name: "BACCARAT2",
    },
    {
      url: "/admin/casinoDetail/baccarat",
      imgSrc: bac2,
      name: "BACCARAT",
    },
  ],
};

export const dragonTigerCards = [
  {
    code: 0,
    imgSrc: A,
    value: 0,
  },
  {
    code: 1,
    imgSrc: two,
    value: 0,
  },
  {
    code: 2,
    imgSrc: three,
    value: 0,
  },
  {
    code: 3,
    imgSrc: four,
    value: 0,
  },
  {
    code: 4,
    imgSrc: five,
    value: 0,
  },
  {
    code: 5,
    imgSrc: six,
    value: 0,
  },
  {
    code: 6,
    imgSrc: seven,
    value: 0,
  },
  {
    code: 7,
    imgSrc: eight,
    value: 0,
  },
  {
    code: 8,
    imgSrc: nine,
    value: 0,
  },
  {
    code: 9,
    imgSrc: ten,
    value: 0,
  },
  {
    code: 10,
    imgSrc: eleven,
    value: 0,
  },
  {
    code: 11,
    imgSrc: twelve,
    value: 0,
  },
  {
    code: 12,
    imgSrc: thirteen,
    value: 0,
  },
];

export const andarBaharCards = [
  {
    code: 0,
    imgSrc: A1,
    value: 0,
  },
  {
    code: 1,
    imgSrc: two2,
    value: 0,
  },
  {
    code: 2,
    imgSrc: three3,
    value: 0,
  },
  {
    code: 3,
    imgSrc: four4,
    value: 0,
  },
  {
    code: 4,
    imgSrc: five5,
    value: 0,
  },
  {
    code: 5,
    imgSrc: six6,
    value: 0,
  },
  {
    code: 6,
    imgSrc: seven7,
    value: 0,
  },
  {
    code: 7,
    imgSrc: eight8,
    value: 0,
  },
  {
    code: 8,
    imgSrc: nine9,
    value: 0,
  },
  {
    code: 9,
    imgSrc: ten10,
    value: 0,
  },
  {
    code: 10,
    imgSrc: eleven11,
    value: 0,
  },
  {
    code: 11,
    imgSrc: twelve12,
    value: 0,
  },
  {
    code: 12,
    imgSrc: thirteen13,
    value: 0,
  },
];

export const bollywoodTableCards = [
  {
    code: 10,
    imgSrc: eleven,
    value: 0,
  },
  {
    code: 11,
    imgSrc: twelve,
    value: 0,
  },
  {
    code: 12,
    imgSrc: thirteen,
    value: 0,
  },
  {
    code: 0,
    imgSrc: A,
    value: 0,
  },
];

export const cardGamesType: any = {
  dragonTiger20: "dt20",
  andarBahar2: "abj",
  andarBahar1: "ab20",
  teen20: "teen20",
  card32: "card32",
  card32B: "card32eu",
  lucky7: "lucky7",
  dragonTiger202: "dt202",
  dragonTigerLion: "dtl20",
  teenOneDay: "teen",
  teenOpen: "teen8",
  teenTest: "teen9",
  dragonTigerOneDay: "dt6",
  lucky7B: "lucky7eu",
  casinoWar: "war",
  race20: "race20",
  superover: "superover",
  poker6: "poker6",
  poker1Day: "poker",
  poker20: "poker20",
  card3judge: "3cardj",
  cricketv3: "cricketv3",
  cmatch20: "cmatch20",
  amarAkbarAnthony: "aaa",
  btable: "btable",
  worli: "worli2",
  baccarat: "baccarat",
  baccarat2: "baccarat2",
  cardj: "3cardj",
  cmeter: "cmeter",
  queen: "queen",
  worli1: "worli",
  ballbyball: "ballbyball",
};

export const cardGamesTypeNames: any = {
  dt20: "20-20 DRAGON TIGER",
  teen20: "20-20 TEENPATTI",
  card32: "32 CARDS - A",
  lucky7: "LUCKY 7 - A",
  abj: "ANDAR BAHAR 2",
  dt202: "20-20 DRAGON TIGER 2",
  dtl20: "20-20 D T L",
  dt6: "1 DAY DRAGON TIGER",
  lucky7eu: "LUCKY 7 - B",
  teen: "TEENPATTI 1-DAY",
  teen9: "TEENPATTI TEST",
  teen8: "TEENPATTI OPEN",
  poker: "POKER 1-DAY",
  poker20: "20-20 POKER",
  poker6: "POKER 6 PLAYERS",
  baccarat: "BACCARAT",
  baccarat2: "BACCARAT 2",
  card32eu: "32 CARDS - B",
  ab20: "ANDAR BAHAR 1",
  "3cardj": "3 CARDS JUDGEMENT",
  war: "CASINO WAR",
  worli2: "INSTANT WORLI",
  superover: "SUPER OVER",
  cmatch20: "CRICKET MATCH 20-20",
  aaa: "AMAR AKBAR ANTHONY",
  btable: "BOLLYWOOD CASINO",
  race20: "RACE 20",
  cricketv3: "FIVE FIVE CRICKET",
  cricket: "Cricket",
  football: "Football",
  tennis: "Tennis",
  horseRacing: "Horse Racing",
  greyHound: "Grey Hound",
  ballbyball: "Ball By Ball",
  cmeter: "Casino Meter",
  queen: "Casino Queen",
  worli: "Worli Matka",
};

export const cardGamesId: any = {
  dragonTiger20: 3035,
  andarBahar2: 3043,
  andarBahar1: 3053,
  teen20: 3030,
  card32: 3055,
  card32B: 3034,
  lucky7: 3058,
  dragonTiger202: 3059,
  dragonTigerLion: 3047,
  teenOneDay: 3031,
  teenOpen: 3049,
  teenTest: 3048,
  dragonTigerOneDay: 3057,
  lucky7B: 3032,
  casinoWar: 3038,
  race20: 3036,
  superover: 3060,
  poker: 3050,
  poker1Day: 3051,
  poker20: 3052,
  cricketv3: 3042,
  cmatch20: 3045,
  aaa: 3056,
  btable: 3041,
  worli: 3040,
  cardj: 3039,
  baccarat: 3044,
  baccarat2: 3033,
  cmeter: 3046,
  ballbyball: 3061,
  queen: 3037,
};

export const rulesData = [
  {
    cardImage: imgA,
    count: 5,
    valueImage: ball0,
  },
  {
    cardImage: img2,
    count: 5,
    valueImage: ball1,
  },
  {
    cardImage: img3,
    count: 5,
    valueImage: ball2,
  },
  {
    cardImage: img4,
    count: 5,
    valueImage: ball3,
  },
  {
    cardImage: img6,
    count: 5,
    valueImage: ball4,
  },
  {
    cardImage: img10,
    count: 5,
    valueImage: ball6,
  },
  {
    cardImage: imgK,
    count: 5,
    valueImage: ballW,
    valueText: "Wicket",
  },
];

export const cardData = [
  {
    team: "AUS",
    cards: [
      { label: "A", imgSrc: imgA, value: "1 Run" },
      { label: "2", imgSrc: img2, value: "2 Run" },
      { label: "3", imgSrc: img3, value: "3 Run" },
      { label: "4", imgSrc: img4, value: "4 Run" },
      { label: "6", imgSrc: img6, value: "6 Run" },
      { label: "10", imgSrc: img10, value: "0 Run" },
      { label: "K", imgSrc: imgK, value: "Wicket" },
    ],
  },
  {
    team: "IND",
    cards: [
      { label: "A", imgSrc: imgA, value: "1 Run" },
      { label: "2", imgSrc: img2, value: "2 Run" },
      { label: "3", imgSrc: img3, value: "3 Run" },
      { label: "4", imgSrc: img4, value: "4 Run" },
      { label: "6", imgSrc: img6, value: "6 Run" },
      { label: "10", imgSrc: img10, value: "0 Run" },
      { label: "K", imgSrc: imgK, value: "Wicket" },
    ],
  },
];

export const gameConstantsAccountStatement = [
  // { value: "all", label: "All" },
  { value: "cricket", label: "Cricket" },
  { value: "football", label: "Football" },
  { value: "tennis", label: "Tennis" },
  { value: "politics", label: "Politics" },
  { value: "horseRacing", label: "Horse Racing" },
  { value: "greyHound", label: "Greyhound Racing" },
];
export const card2ConstantsAccountStatement = [
  // { value: "all", label: "All" },
  { value: "dt20", label: "20-20 Dragon Tiger" }, //
  {
    value: "abj",
    label: "Andar Bahar 2", //
  },
  {
    value: "teen20",
    label: "20-20 Teen Patti", //
  },
  {
    value: "card32",
    label: "32 Cards - A", //
  },
  {
    value: "lucky7",
    label: "Lucky 7 - A", //
  },
  {
    value: "lucky7eu",
    label: "Lucky 7 - B", //
  },
  {
    value: "dt202",
    label: "20-20 Dragon Tiger 2", //
  },
  {
    value: "dtl20",
    label: "Dragon Tiger Lion", //
  },
  {
    value: "dt6",
    label: "Dragon Tiger 1 Day", //
  },
  {
    value: "teen",
    label: "Teen Patti One Day", //
  },
  {
    value: "teen8",
    label: "Open Teen Patti",
  },
  {
    value: "ab20",
    label: "Andar Bahar 1",
  },
  {
    value: "cricketv3",
    label: "Five Five Cricket",
  },
  {
    value: "superover",
    label: "Super Over",
  },
  {
    value: "race20",
    label: "Race 20 20",
  },
  {
    value: "card32eu",
    label: "32 Card - B",
  },
  {
    value: "war",
    label: "Casino War",
  },
  {
    value: "poker",
    label: "Poker 1 Day",
  },
  {
    value: "poker6",
    label: "6 Player Poker",
  },
  {
    value: "poker20",
    label: "20-20 Poker",
  },
  {
    value: "teen9",
    label: "Test Teen Patti",
  },
  {
    value: "cmatch20",
    label: "CRICKET MATCH 20-20",
  },
  {
    value: "aaa",
    label: "Amar Akbar Anthony",
  },
  {
    value: "btable",
    label: "Bollywood Casino",
  },
  {
    value: "worli2",
    label: "Instant Worli",
  },
  {
    value: "baccarat",
    label: "Baccarat",
  },
  {
    value: "baccarat2",
    label: "Baccarat2",
  },
  {
    value: "3cardj",
    label: "3 Card Judgement",
  },
  {
    value: "ballbyball",
    label: "Ball By Ball",
  },
  {
    value: "queen",
    label: "Casino Queen",
  },
  {
    value: "cmeter",
    label: "Casino Meter",
  },
];
export const cardGamesCasinoResult = [
  {
    value: "",
    label: "Select Casino Type",
    disabled: true,
  },
  {
    value: "dt20",
    label: "20-20 Dragon Tiger",
  },
  {
    value: "abj",
    label: "Andar Bahar 2",
  },
  {
    value: "teen20",
    label: "20-20 Teen Patti",
  },
  {
    value: "card32",
    label: "32 Cards - A",
  },
  {
    value: "lucky7",
    label: "Lucky 7 - A",
  },
  {
    value: "lucky7eu",
    label: "Lucky 7 - B",
  },
  {
    value: "dt202",
    label: "20-20 Dragon Tiger 2",
  },
  {
    value: "dtl20",
    label: "Dragon Tiger Lion",
  },
  {
    value: "dt6",
    label: "Dragon Tiger 1 Day",
  },
  {
    value: "teen",
    label: "Teen Patti One Day",
  },
  {
    value: "teen8",
    label: "Open Teen Patti",
  },
  {
    value: "ab20",
    label: "Andar Bahar 1",
  },
  {
    value: "cricketv3",
    label: "Five Five Cricket",
  },
  {
    value: "superover",
    label: "Super Over",
  },
  {
    value: "race20",
    label: "Race 20 20",
  },
  {
    value: "card32eu",
    label: "32 Cards - B",
  },
  {
    value: "war",
    label: "Casino War",
  },
  {
    value: "poker",
    label: "Poker 1 Day",
  },
  {
    value: "poker6",
    label: "6 Player Poker",
  },
  {
    value: "poker20",
    label: "20-20 Poker",
  },
  {
    value: "teen9",
    label: "Test Teen Patti",
  },
  {
    value: "cmatch20",
    label: "CRICKET MATCH 20-20",
  },
  {
    value: "aaa",
    label: "Amar Akbar Anthony",
  },
  {
    value: "btable",
    label: "Bollywood Casino",
  },
  {
    value: "worli2",
    label: "Instant Worli",
  },
  {
    value: "baccarat",
    label: "Baccarat",
  },
  {
    value: "baccarat2",
    label: "Baccarat2",
  },
  {
    value: "3cardj",
    label: "3 Card Judgement",
  },
  {
    value: "ballbyball",
    label: "Ball By Ball",
  },
  {
    value: "queen",
    label: "Casino Queen",
  },
  {
    value: "cmeter",
    label: "Casino Meter",
  },
];

export const rulesData1 = [
  {
    title: "Run Section:",
    rules: [
      "In 1, 2, 3, 4, 6, and boundary (4 or 6) events, only bat runs will be considered.",
      "In 0 runs, only dot balls will be considered.",
      "Note: Wickets or extras with runs will not be considered in the above-mentioned events.",
    ],
  },
  {
    title: "Wicket Section:",
    rules: [
      "Particular Wickets (Caught, Bowled, Run Out, LBW, Stumped, and Others) or Wickets (Any Wickets) only wicket will be considered.",
      "Note: Any runs with Wickets will not be considered in these events.",
    ],
  },
  {
    title: "Extra Section:",
    rules: [
      "Extra balls (no ball, wide, bye, and Leg Bye) & Extras (any extras) Only extras will be considered.",
      "Note: Any runs or wicket on extra balls will not be considered in these events.",
      "In the case of No Ball with runout, the result will be No Ball.",
    ],
  },
  {
    title: "Disclaimer:",
    rules: [
      "The videos are from different broadcasters, so in such cases, the scoreboard will update late. We will give results only on the basis of our rules and as per the videos displayed.",
    ],
  },
];

export const gameRulesComponents: any = {
  ballbyball: <BallByBallRules />,
  race20: <Race20Rules />,
  baccarat: <BaccaratRules />,
  baccarat2: <BaccaratRules2 />,
  superover: <SuperOverRules />,
  cricketv3: <Cricket5Rules />,
  cmeter: <CasinoRulesImage />,
  cmatch20: <Cricket20Rules />,
  war: <CasinoWarRules />,
  card32: <Card32ARules />,
  card32eu: <Card32ARules />,
  teen20: <Teen20Rules />,
  teen: <Teen20Rules />,
  teen9: <TeenpattiRules />,
  teen8: <TeenpattiRules />,
  poker6: <PokerRules />,
  poker20: <PokerRules />,
  poker: <PokerRules />,
  abj: <AndarBaharRules />,
  lucky7: <Lucky7Rules />,
  lucky7eu: <Lucky7Rules />,
  dtl20: <DTLGameRules />,
  dt6: <DragonRules />,
  dt202: <DragonRules />,
  dt20: <DragonRules />,
  aaa: <AmarAkbarRules />,
  btable: <BollywoodTableGameRules />,
};
