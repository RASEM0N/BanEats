## Правила
- Надо выстроить правила для Backend, по которым получается
  - конечные данные
  - название graphql методов
- Включить strict true в tsconfig

## Именнование
- добавить в описание методов gql, какие права нужны, нужны ли быть авторизованным и т.д.
- authorization по другому должен класс называтся


## Backend
- вся логика с IF_DEV, IS_PROD вынести в класс 
- Насчет ролей AuthPublic и т.д. привести в порядок

- Надо к одному привести InputType, ObjectType, ArgsType, а то щас в разнобой идёт
- Как-то придумать момент насчет ErrorCode. Нужен список ошибок для какого метода чтоб задукоментировано было
- Привести в порядок throw new CustomError({
- Убрать TODO-шки
- Добавить подтверждение изменения почты и пароля у User
- Прогнать test coverage и дописать места, которые не покрыты
- Написать e2e тесты на GraphQl, resolver
- errorCode в ответе пользователю сделано как enum, чтоб можно было глянуть, какие именно ошибки вылезают
- https://stackru.com/questions/62218995/kak-obojti-etu-oshibku-typeorm-entityrepository-ustarel-vmesto-etogo-ispolzujte
- Вместо типа Number лучше юзать Int или Float