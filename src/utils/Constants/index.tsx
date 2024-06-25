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
};

export const Constants = {
  apiBasePath: "https://devmaxbet9api.fairgame.club",
  thirdParty: "https://devserviceapi.fairgame.club",
  expertPath: "https://devexpertapi.fairgame.club",
  apiBasePathLive: "https://betfairapi.fairgame7.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  expertPathLive: "https://expertapi.fairgame7.com",
  thirdPartyCard: "https://casinoserviceapi.fairgame.club",
  localPath: "http://localhost:5000",
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
      url: "/admin/casinoDetail/contact-admin",
      imgSrc: dtl20,
      name: "20-20 DRAGON TIGER LION",
    },
    {
      url: "/admin/casinoDetail/contact-admin",
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
      url: "/admin/casinoDetail/contact-admin",
      imgSrc: dayteen,
      name: "1 DAY TEENPATTI",
    },
    {
      url: "/admin/casinoDetail/contact-admin",
      imgSrc: testteen,
      name: "TEST TEENPATTI",
    },
    {
      url: "/admin/casinoDetail/contact-admin",
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
      url: "/admin/casinoDetail/contact-admin",
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
      url: "/admin/casinoDetail/contact-admin",
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
      url: "/admin/casinoDetail/contact-admin",
      imgSrc: abjlist,
      name: "ANDAR BAHAR",
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
  dragonTiger20: "dt20",
  andarBahar2: "abj",
  teen20: "teen20",
  card32: "card32",
  lucky7: "lucky7",
};

export const cardGamesId: any = {
  dragonTiger20: 3035,
  andarBahar2: 3043,
  teen20: 3030,
  card32: 3055,
  lucky7: 3058,
};
