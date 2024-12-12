## Правила
- Надо выстроить правила для Backend, по которым получается
  - конечные данные
  - название graphql методов


## Backend

- вся логика с IF_DEV, IS_PROD вынести в класс 

- Надо насчет обработки ошибок придумать чето
- Надо чтоб не на уровне были папки types, constants, restaurant. Restaurant выделить в отдельную папку
- Надо бы добавить alias путей импортов
- Надо к одному привести InputType, ObjectType, ArgsType, а то щас в разнобой идёт
- Сделать перехватчик общий ошибок, чтоб допустим 400, 500 ошибку отдавать
- Как-то придумать момент насчет ErrorCode. Нужен список ошибок для какого метода чтоб задукоментировано было
- Надо избавится от return {
                    				isOk: false,
                    				message: e.message,
                    				errorCode: e.errorCode,
                    			};
  просто результат возвращать, а общий обработчик магическим образом обработает это всё...
- Убрать TODO-шки
- Прикольны было методы service переделать на rxjs
- Изменить modules/authorization to modules/auth
- Добавить подтверждение изменения почты и пароля у User
- Прогнать test coverage и дописать места, которые не покрыты
- Написать e2e тесты на GraphQl, resolver
- errorCode в ответе пользователю сделано как enum, чтоб можно было глянуть, какие именно ошибки вылезают
- https://stackru.com/questions/62218995/kak-obojti-etu-oshibku-typeorm-entityrepository-ustarel-vmesto-etogo-ispolzujte
- Вместо типа Number лучше юзать Int или Float

- Вместо папки modules лучше сделать модуль Shared, в которой уже будут другие модули: Jwt, Mailer
- Вместо папки modules лучше сделать модуль Features, в которой уже будут другие модули: Auth, User, Restaurants...
получится

@Module({
    imports: [UserModule. UserModule, RestaurantsModule]
})
export class FeaturesModule {}

- Подрефакторить... все таки слоистая архитектура... а зависимости между друг другом ёмаё

## Frontend
- ...