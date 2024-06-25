export const numberInputOnWheelPreventChange = (e: any) => {
  e.target.blur();
  e.stopPropagation();
  setTimeout(() => {
    e.target.focus();
  }, 0);
};

export const handleRoundId = (id: any) => {
  if (typeof id !== "string" || !id.includes(".")) {
    return 0;
  }
  const Id = id.split(".");
  return Id[1];
};

