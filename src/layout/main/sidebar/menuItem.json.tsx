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
              name: "24-11-2023",
              type: "item",
              path: "/temp",
              children: [
                {
                  id: "teamName",
                  name: "dssdf",
                  type: "item",
                  path: "/temp3",
                },
                {
                  id: "teamName",
                  name: "fdsfsd",
                  type: "item",
                  path: "/temp4",
                },
                {
                  id: "teamName",
                  name: "434",
                  type: "item",
                  path: "/temp5",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return menuItems;
}
