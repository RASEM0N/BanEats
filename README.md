- переименовать все что связанно с UberEats на Eats. Чтоб Uber нигде не было

## Front
- настроить index.html
  - добавить мету информацию всякую
  - добавить манифест
  - добавить иконки
- сделать PWA из этого 
  - добавить ServiceWorker. Хм...можно ли будет GQL запросы кэшировать...
  - добавить кэш IndexDB

## Backend

### Правила
- Включить strict true в tsconfig

### Именнование
- добавить в описание методов gql, какие права нужны, нужны ли быть авторизованным и т.д.

### Backend
- Добавить нормальную обработку ошибок валидации
```
"originalError": {
          "message": [
            "email must be longer than or equal to 4 characters",
            "email must be an email",
            "password must be longer than or equal to 10 characters",
            "role must be one of the following values: admin, client, owner, delivery"
          ],
```

- Добавить Логгер для запросов GraphQL. Моргана хороша для HTTP запросов
- Убрать TODO-шки
- Добавить подтверждение изменения почты и пароля у User
- Прогнать test coverage и дописать места, которые не покрыты
- Написать e2e тесты на GraphQl, resolver
- errorCode в ответе пользователю сделано как enum, чтоб можно было глянуть, какие именно ошибки вылезают
- https://stackru.com/questions/62218995/kak-obojti-etu-oshibku-typeorm-entityrepository-ustarel-vmesto-etogo-ispolzujte