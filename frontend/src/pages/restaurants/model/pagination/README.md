# Пагинация

## Базовое разбиение

### updateQuery

В методе fetchMore у useQuery склеиваем результат, который потом покажется нам  

```js
const { fetchMore } = useQuery(TodosAllQuery)

/**
 * В данном случае будет список из 10 todos
 * - начальный + через fetchMore загруженный
 * 
 * Данный варик не кэшируется нормально
 */
fetchMore({
    variables: { limit: 10, offset: 10 },
    updateQuery: (existing, { fetchMoreResult }) => {
        return [...existing, ...fetchMoreResult]
    }
})
```

В таком случае кэширование по `page` отключится
```
RestaurantGetAll:{"page": 1}: {} 4 keys
RestaurantGetAll:{"page": 2}: {} 4 keys
```

### Merge
https://www.apollographql.com/docs/react/pagination/core-api  
Можно добится такого же результата через Policy, но это будет уже глобально
```ts
const todosPolicy: TypePolicy['fields'] = {
	TodosAllQuery: {
		fields: {

			// отключаем кэширование на основе любого аргумента
			// пример выше с RestaurantGetAll:{"page": 1}: {} 4 keys
			keyArgs: [],

			// склеиваем по порядку результаты
			merge(existing, incoming, { args: { offset = 0 } }) {
				const merged = existing ? existing.slice(0) : [];
				for (let i = 0; i < incoming.length; ++i) {
					merged[offset + i] = incoming[i];
				}
				return merged;
			},
		},
	},
};
```


### Read

