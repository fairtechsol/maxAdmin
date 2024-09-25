import {
  A,
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
  ballByBall,
  ballW,
  cards32A,
  cards32B,
  crick5,
  dayteen,
  dt20,
  dt2020,
  dt6,
  dtl20,
  eight,
  eleven,
  five,
  four,
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
  p1d,
  p20,
  p6,
  seven,
  six,
  superover,
  // teencasino,
  teenplayer,
  ten,
  testteen,
  thirteen,
  three,
  twelve,
  twentyteen,
  two,
} from "../../assets";

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
    USER_MATCH_LOCK_ALL_CHILD: "/user/getMatchLockAllChild",
    USER_DETAIL_FOR_PARENT: "/user/getUserDetailsForParent",
    USER_CHECK_CHILD_DEACTIVATE: "/user/checkChildDeactivate",
    TOTAL_BALANCE: "user/child/totalBalance",
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
    CARD_REPORT: "/card/result/",
  },
  MATCH: {
    MATCHLIST: "/match/list",
    SEARCHLIST: "/user/searchlist",
    MATCHDETAILS: "/match/",
    OTHERMATCHDETAILS: "/match/other/",
    CURRENTBET: "/bet",
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
};

export const cardUrl =
  process.env.NODE_ENV === "production"
    ? "https://maxbet07.com/videoPage/"
    : "https://maxbet07.com/videoPage/";

// const oldVideoUrl = "https://video.proexch.in/route/?id="
// use below baseUrl for live build

export const baseUrls = {
  socket:
    process.env.NODE_ENV === "production"
      ? `${Constants.apiBasePath}`
      : `${Constants.localPath}`,
  thirdParty:
    process.env.NODE_ENV === "production"
      ? `${Constants.thirdParty}`
      : `${Constants.localPathThird}`,
  expertSocket:
    process.env.NODE_ENV === "production"
      ? `${Constants.expertPath}`
      : `${Constants.localPathExpert}`,
  cardSocket:
    process.env.NODE_ENV === "production"
      ? Constants.thirdPartyCard
      : Constants.localThirdCard,
};

// use below baseUrl for live build

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.apiBasePathLive}`
//       : `${Constants.localPath}`,
//   thirdParty:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.thirdPartyLive}`
//       : `${Constants.localPathThird}`,
//   expertSocket:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.expertPathLive}`
//       : `${Constants.localPathExpert}`,
//  cardSocket:
//     process.env.NODE_ENV === "production"
//       ? Constants.thirdPartyCardLive
//       : Constants.localThirdCard,
// };

export const teamStatus = {
  suspended: "suspended",
  active: "active",
  closed: "closed",
  ballStart: "ball start",
  ballStop: "ball stop",
  ballRunning: "ball running",
};

export const sessionBettingType = {
  session: "session",
  fancy1: "fancy1",
  overByOver: "overByover",
  ballByBall: "ballByBall",
  oddEven: "oddEven",
  cricketCasino: "cricketCasino",
};

export const matchBettingType = {
  matchOdd: "matchOdd",
  bookmaker: "bookmaker",
  quickbookmaker1: "quickbookmaker1",
  quickbookmaker2: "quickbookmaker2",
  quickbookmaker3: "quickbookmaker3",
  tiedMatch1: "tiedMatch1",
  tiedMatch2: "tiedMatch2",
  completeMatch: "completeMatch",
  completeManual: "completeManual",
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`overUnder${curr}.5`] = `overUnder${curr}.5`;
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`firstHalfGoal${curr}.5`] = `firstHalfGoal${curr}.5`;
      return prev;
    },
    {}
  ),
  halfTime: "halfTime",
};

export const profitLossDataForMatchConstants = {
  [matchBettingType.matchOdd]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker1]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker3]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.tiedMatch1]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch2]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.completeMatch]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeManual]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`overUnder${curr}.5`] = {
        A: `yesRateUnderOver${curr}.5`,
        B: `noRateUnderOver${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`setWinner${curr}`] = {
        A: `userTeamARateSetWinner${curr}`,
        B: `userTeamBRateSetWinner${curr}`,
        C: `userTeamRateSetWinner${curr}`,
      };
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`firstHalfGoal${curr}.5`] = {
        A: `yesRateFirstHalfGoal${curr}.5`,
        B: `noRateFirstHalfGoal${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  [matchBettingType.halfTime]: {
    A: "userTeamARateHalfTime",
    B: "userTeamBRateHalfTime",
    C: "userTeamCRateHalfTime",
  },
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
    { id: 15, url: "", imgSrc: ballByBall, name: "BALL BY BALL" },
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
  dragonTiger20: "dt20", //
  andarBahar2: "abj", //
  andarBahar1: "ab20", //
  teen20: "teen20", //
  card32: "card32", //
  card32B: "card32eu", //
  lucky7: "lucky7", //
  dragonTiger202: "dt202", //
  dragonTigerLion: "dtl20", //
  teenOneDay: "teen", //
  teenOpen: "teen8", //
  teenTest: "teen9", //
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
  dragonTigerLion: 30470,
  teenOneDay: 3031,
  teenOpen: 3049,
  teenTest: 3048,
  dragonTigerOneDay: 3057,
  lucky7B: 3032,
  casinoWar: 3038,
  race20: 3036,
  superover: 3060,
  poker: 30500,
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

export const cardConstantsAccountStatement = [
  { value: "all", label: "All" },
  { value: "cricket", label: "Cricket" },
  { value: "football", label: "Football" },
  { value: "horseRacing", label: "Horse Racing" },
  { value: "greyHound", label: "Greyhound Racing" },
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
];
