import {
  dt6,
  dt20,
  dt2020,
  dtl20,
  lucky7A,
  luck7B,
  cards32A,
  cards32B,
  abjlist2,
  abjlist,
  testteen,
  dayteen,
  twentyteen,
  teencasino,
  teenplayer,
  A,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
  imgA,
  ball0,
  img2,
  ball1,
  img3,
  ball2,
  img4,
  ball3,
  img6,
  ball4,
  img10,
  ball6,
  imgK,
  ballW,
  ballByBall,
  superover,
  crick5,
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
};

export const Constants = {
  apiBasePath: "https://devmaxbet9api.fairgame.club",
  thirdParty: "https://devserviceapi.fairgame.club",
  expertPath: "https://devexpertapi.fairgame.club",
  apiBasePathLive: "https://betfairapi.fairgame7.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  expertPathLive: "https://expertapi.fairgame7.com",
  thirdPartyCard: "https://casinoserviceapi.fairgame.club",
  localPath: "http://localhost:5001",
  localPathThird: "http://localhost:3200",
  localPathExpert: "http://localhost:6060",
  localThirdCard: "http://localhost:3201",
  WEBSOCKET: "websocket",
  POLLING: "polling",
  PAGELIMIT: 15,
};

export const cardUrl = "https://video.proexch.in/route/?id=";

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
//   matchSocket:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.thirdPartyLive}`
//       : `${Constants.localPathThird}`,
//   expertSocket:
//     process.env.NODE_ENV === "production"
//       ? `${Constants.expertPathLive}`
//       : `${Constants.localPathExpert}`,
// };

export const teamStatus = {
  suspended: "suspended",
  active: "active",
  closed: "closed",
  ballStart: "ball start",
  ballStop: "ball stop",
  ballRunning: "ball running",
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
      url: "/admin/casinoDetail/dt202",
      imgSrc: dt2020,
      name: "20-20 DRAGON TIGER 2",
    },
    {
      url: "/admin/casinoDetail/dtl20",
      imgSrc: dtl20,
      name: "20-20 DRAGON TIGER LION",
    },
    {
      url: "/admin/casinoDetail/dt6",
      imgSrc: dt6,
      name: "1 DAY DRAGON TIGER",
    },
    {
      url: "/admin/casinoDetail/dt20",
      imgSrc: dt20,
      name: "20-20 DRAGON TIGER",
    },
  ],
  teenPatti: [
    {
      url: "/admin/casinoDetail/contact-admin",
      imgSrc: teencasino,
      name: "TEENPATTI 2.0",
    },
    {
      url: "/admin/casinoDetail/teenPatti20",
      imgSrc: twentyteen,
      name: "20-20 TEENPATTI",
    },
    {
      url: "/admin/casinoDetail/teen",
      imgSrc: dayteen,
      name: "1 DAY TEENPATTI",
    },
    {
      url: "/admin/casinoDetail/contact-admin",
      imgSrc: testteen,
      name: "TEST TEENPATTI",
    },
    {
      url: "/admin/casinoDetail/teen8",
      imgSrc: teenplayer,
      name: "OPEN TEENPATTI",
    },
  ],
  lucky7: [
    {
      url: "/admin/casinoDetail/lucky7-A",
      imgSrc: lucky7A,
      name: "Lucky 7 A",
    },
    {
      url: "/admin/casinoDetail/lucky7eu",
      imgSrc: luck7B,
      name: "Lucky 7 B",
    },
  ],
  cards32: [
    {
      url: "/admin/casinoDetail/32cards-A",
      imgSrc: cards32A,
      name: "Lucky 7 A",
    },
    {
      url: "/admin/casinoDetail/card32eu",
      imgSrc: cards32B,
      name: "Lucky 7 B",
    },
  ],
  abj: [
    {
      url: "/admin/casinoDetail/abj2",
      imgSrc: abjlist2,
      name: "ANDAR BAHAR 2",
    },
    {
      url: "/admin/casinoDetail/ab20",
      imgSrc: abjlist,
      name: "ANDAR BAHAR",
    },
  ],
  sportCasino: [
    {
      url: "/",
      imgSrc: ballByBall,
      name: "BALL BY BALL",
    },
    {
      url: "/admin/casinoDetail/superover",
      imgSrc: superover,
      name: "SUPER OVER",
    },
    {
      url: "/admin/casinoDetail/cricketv3",
      imgSrc: crick5,
      name: "5 5 Cricket",
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
  { value: "dt20", label: "20-20 Dragon Tiger" },
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
    label: "32 Card - B",
  },
  {
    value: "war",
    label: "Casino War",
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
];