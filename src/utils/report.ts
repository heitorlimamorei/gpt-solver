import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FinalSheetProps } from "../types/sheetTypes";
export default function generatePDFReport(
  currentSheet: FinalSheetProps,
  sumAllItems: () => number,
  getStatistics: () => {
    name: string;
    value: number;
    percentOfSpents: number;
    length: number;
  }[]
) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  let reportTitle = [
    {
      text: `Resultados de ${currentSheet.data.name}`,
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];
  let data = currentSheet.items.map((item) => {
    function getFormetedDate() {
      const dataFormatada = new Date(item.date.seconds * 1000);
      return {
        day: dataFormatada.getDate(),
        month: dataFormatada.getMonth() + 1,
        year: dataFormatada.getFullYear(),
      };
    }
    const { day, month, year } = getFormetedDate();
    return [
      {
        text: item.name,
        fontSize: 8,
      },
      {
        text: `R$${item.value}`,
        fontSize: 8,
      },
      {
        text: item.type,
        fontSize: 8,
      },
      {
        text: `${day}/${month}/${year}`,
        fontSize: 8,
      },
    ];
  });
  let usersData = currentSheet.users.map((user) => {
    return [
      {
        text: user.email,
        fontSize: 8,
      },
      {
        text: user.role,
        fontSize: 8,
      },
    ];
  });
  let details = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*"],
        margin: [5, 2, 10, 20],
        body: [
          [
            {
              text: "Nome",
              fontSize: 10,
            },
            {
              text: "Valor",
              fontSize: 10,
            },
            {
              text: "Tipo",
              fontSize: 10,
            },
            {
              text: "Date",
              fontSize: 10,
            },
          ],
          ...data,
          [
            {
              text: "Total",
              fontSize: 10,
            },
            {
              text: `R$${sumAllItems()}`,
              fontSize: 10,
            },
            {
              text: "Todos",
              fontSize: 10,
            },
            {
              text: "Datas",
              fontSize: 10,
            },
          ],
        ],
      },
    },
  ];
  let itemsStats = () => {
    const getData = () => {
      let stats = getStatistics();
      return stats.map((stat) => {
        return [
          {
            text: stat.name,
            fontSize: 10,
          },
          {
            text: `R$${stat.value}`,
            fontSize: 10,
          },
          {
            text: `${stat.length}`,
            fontSize: 10,
          },
          {
            text: `${stat.percentOfSpents}%`,
            fontSize: 10,
          },
        ];
      });
    };
    return [
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*"],
          body: [
            [
              {
                text: "tipo de gasto",
                fontSize: 10,
              },
              {
                text: "valor total",
                fontSize: 10,
              },
              {
                text: "qtd",
                fontSize: 10,
              },
              {
                text: "%",
                fontSize: 10,
              },
            ],
            ...getData(),
            [
              {
                text: "total",
                fontSize: 10,
              },
              {
                text: `R$${sumAllItems()}`,
                fontSize: 10,
              },
              {
                text: `${currentSheet.items.length}`,
                fontSize: 10,
              },
              {
                text: "100%",
                fontSize: 10,
              },
            ],
          ],
        },
      },
    ];
  };
  let users = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*"],
        margin: [5, 2, 10, 20],
        body: [
          [
            {
              text: "usuário",
              fontSize: 10,
            },
            {
              text: "cargo",
              fontSize: 10,
            },
          ],
          ...usersData,
        ],
      },
    },
  ];
  let getStatsResuls = () => {
    let totalValue = sumAllItems();
    let values = [
      {
        name: "criador",
        value: currentSheet.data.owner,
      },
      {
        name: "Valor estimado",
        value: `R$${currentSheet.data.totalValue}`,
      },
      {
        name: "número de gastos",
        value: currentSheet.items.length,
      },
      {
        name: "% entre  gasto e estimado",
        value: `${((totalValue / currentSheet.data.totalValue) * 100).toFixed(
          2
        )}%`,
      },
    ];
    let items = values.map((value) => {
      return [
        {
          text: value.name,
          fontSize: 10,
        },
        {
          text: value.value,
          fontSize: 10,
        },
      ];
    });
    return [
      {
        table: {
          headerRows: 1,
          widths: ["*", "*"],
          body: [
            [
              {
                text: "nome",
                fontSize: 10,
              },
              {
                text: "valor",
                fontSize: 10,
              },
            ],
            ...items,
          ],
        },
      },
    ];
  };
  let footer = [];
  const docDefinitions: any = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [
      [{ text: "Informações gerais ", margin: [5, 5] }],
      [getStatsResuls()],
      [{ text: "Lista de usuários ", margin: [5, 5] }],
      users,
      [{ text: "Estatísticas de gastos ", margin: [5, 5] }],
      [itemsStats()],
      [{ text: "Lista de gastos", margin: [5, 5] }],
      details,
    ],
    footer: [footer],
  };
  pdfMake.createPdf(docDefinitions).download();
}
