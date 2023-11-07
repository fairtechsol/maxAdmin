export default function menuItemJson() {
  const menuItems = [
    {
      id: "football",
      name: "football",
      type: "collapse",
      children: [
        {
          id: "teamName",
          name: "ARGENTINA Reserve League",
          type: "collapse",
          children: [
            {
              id: "teamName",
              name: "ARGENTINA Reserve League",
              type: "item",
              path: "/temp",
            },
          ],
        },
      ],
    },
  ];
  return menuItems;
}
