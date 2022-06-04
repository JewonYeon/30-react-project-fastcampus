<h1 align="center">Sortable (Drag & Drop)</h1>

## Script
```shell
npm install @jewon-yeon/sortable
```

## 사용
```js
import SortableList from '@jewon-yeon/sortable';

function App() {
  const onDropItem = (newList) => {
    console.log(newList);
  }

  const onClickItem = (index) => {
    alert(index);
  }

  const renderItem = (
    <div>
      ...
    </div>
  );

  return (
    <SortableList
      data={data}
      renderItem={renderItem}
      onDropItem={onDropItem}
      onClickItem={onClickItem}
    />
  );
}
```