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

export const serviceUrl =
  process.env.NODE_ENV === "production"
    ? Constants.apiBasePath
    : Constants.localPath;

export const baseUrls = {
  socket:
    process.env.NODE_ENV === "production"
      ? Constants.apiBasePath
      : Constants.localPath,
  thirdParty:
    process.env.NODE_ENV === "production"
      ? Constants.thirdParty
      : Constants.localPathThird,
  expertSocket:
    process.env.NODE_ENV === "production"
      ? Constants.expertPath
      : Constants.localPathExpert,
  cardSocket:
    process.env.NODE_ENV === "production"
      ? Constants.thirdPartyCard
      : Constants.localThirdCard,
};

// use below baseUrl for live build

// export const serviceUrl =
//   process.env.NODE_ENV === "production"
//     ? Constants.apiBasePathLive
//     : Constants.localPath;

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === "production"
//       ? Constants.apiBasePathLive
//       : Constants.localPath,
//   thirdParty:
//     process.env.NODE_ENV === "production"
//       ? Constants.thirdPartyLive
//       : Constants.localPathThird,
//   expertSocket:
//     process.env.NODE_ENV === "production"
//       ? Constants.expertPathLive
//       : Constants.localPathExpert,
//   cardSocket:
//     process.env.NODE_ENV === "production"
//       ? Constants.thirdPartyCardLive
//       : Constants.localThirdCard,
// };

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

export const routeKeyContant: any = {
  listClients: "userList",
  listAccount: "userList",
  "active-inactive-user-list": "userList",
  "add-account": "insertUser",
  multiLogin: "loginUserCreation",
  "market-analysis": "marketAnalysis",
  "account-statement": "accountStatement",
  "current-bets": "currentBets",
  "casino-report": "liveCasinoResult",
  "profit-loss": "partyWinLoss",
  "casino-result": "casinoResult",
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

export const gameConstantsAccountStatement = [
  { value: "cricket", label: "Cricket" },
  { value: "football", label: "Football" },
  { value: "tennis", label: "Tennis" },
  { value: "politics", label: "Politics" },
  { value: "horseRacing", label: "Horse Racing" },
  { value: "greyHound", label: "Greyhound Racing" },
];
