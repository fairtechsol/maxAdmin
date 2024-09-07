export const convertData = (items: any) => {
  try {
    const result: any = {};

    items?.forEach((item: any) => {
      if (!result[item?.type]) {
        result[item?.type] = {
          mname: item?.type,
          rem: "",
          gtype: item?.gtype,
          status: item?.status,
          section: [],
        };
      }
      const sectionItem = {
        ...item,
      };
      result[item?.type]?.section?.push(sectionItem);
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateSessionBettingsItem = (
  matchDetailBettings: any,
  apiResponseBettings: any
) => {
  try {
    if (!apiResponseBettings || Object.keys(apiResponseBettings).length === 0) {
      for (const key in matchDetailBettings) {
        if (matchDetailBettings[key]) {
          matchDetailBettings[key].mid = apiResponseBettings[key]?.mid;
          const matchDetailSections = matchDetailBettings[key]?.section;
          matchDetailSections?.forEach((section: any) => {
            section.isComplete = true;
          });
        }
      }
      return matchDetailBettings;
    } else
      for (const key in matchDetailBettings) {
        if (apiResponseBettings[key]) {
          matchDetailBettings[key].mid = apiResponseBettings[key]?.mid;
          const apiSections = apiResponseBettings[key].section;
          const matchDetailSections = matchDetailBettings[key]?.section;
          for (const apiSection of apiSections) {
            const matchDetailSectionIndex = matchDetailSections?.findIndex(
              (section: any) => section?.id === apiSection?.id
            );
            if (matchDetailSectionIndex !== -1) {
              matchDetailBettings[key].section[matchDetailSectionIndex] = {
                ...matchDetailBettings[key].section[matchDetailSectionIndex],
                ...apiSection,
                isComplete: apiSection?.ex
                  ? apiSection?.ex?.availableToBack?.length > 0 &&
                    apiSection?.ex?.availableToLay?.length > 0
                    ? ([""].includes(apiSection?.GameStatus) &&
                        !apiSection?.ex?.availableToBack[0]?.price &&
                        !apiSection?.ex?.availableToBack[0]?.size &&
                        !apiSection?.ex?.availableToLay?.price &&
                        !apiSection?.ex?.availableToLay?.size) ||
                      apiSection?.activeStatus !== "live"
                      ? true
                      : false
                    : true
                  : true,
              };
            }
          }
        }
      }
    return matchDetailBettings;
  } catch (error) {
    console.log(error);
  }
};
