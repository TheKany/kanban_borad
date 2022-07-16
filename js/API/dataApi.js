export default class dataApi {
  static getItem(columnId) {
    const column = read().find((column) => column.id === columnId);

    if (!column) {
      return [];
    }

    return column.items;
  }

  static insertItem(columnId, content) {
    const data = read();
    const column = data.find((column) => column.id === columnId);
    const item = {
      id: Date.now(),
      content,
    };

    if (!column) {
      throw new Error('에러');
    }

    column.items.push(item);
    save(data);

    return item;
  }

  static updateItem(itemId, newProps) {
    const data = read();
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((item) => item.id == itemId);

        if (item) {
          return [item, column];
        }
      }
    })();

    if (!item) {
      throw new Error('Item이 없습니다.');
    }

    item.content =
      newProps.content === undefined ? item.content : newProps.content;

    // update column and position
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      const targetColumn = data.find(
        (column) => column.id == newProps.columnId,
      );

      if (!targetColumn) {
        throw new Error('targetColumn을 찾을 수 없습니다.');
      }

      // Delete item
      currentColumn.items.splice(currentColumn.items.indaxOf(item), 1);

      // Move item
      targetColumn.item.splice(newProps.position, 0, item);
    }

    save(data);
  }

  static deleteItem(itemId) {
    const data = read();

    for (const column of data) {
      const item = column.items.find((item) => item.id == itemId);

      if (!item) {
        column.items.splice(column.items.indaxOf(item), 1);
      }
    }
    save(data);
  }
}

function read() {
  const localdata = localStorage.getItem('kanban-data');

  if (!localdata) {
    return [
      {
        id: 1,
        items: [],
      },
      {
        id: 2,
        items: [],
      },
      {
        id: 3,
        items: [],
      },
    ];
  }
  return JSON.parse(localdata);
}

function save(data) {
  localStorage.setItem('kanban-data', JSON.stringify(data));
}
