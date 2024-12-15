## Правила
- Включить strict true в tsconfig

## Именнование
- добавить в описание методов gql, какие права нужны, нужны ли быть авторизованным и т.д.

## Backend
- Исправить Output, чтоб не было свойств дата, а сразу же были данные

Вместо
```
query {
   UserMe {
      data { user { email name  }  } 
   }
}
```

Было бы
```
query {
   UserMe {
      user { email name  }
   }
}
```

- Убрать TODO-шки
- Насчет ролей AuthPublic и т.д. привести в порядок
- Добавить подтверждение изменения почты и пароля у User
- Прогнать test coverage и дописать места, которые не покрыты
- Написать e2e тесты на GraphQl, resolver
- errorCode в ответе пользователю сделано как enum, чтоб можно было глянуть, какие именно ошибки вылезают
- https://stackru.com/questions/62218995/kak-obojti-etu-oshibku-typeorm-entityrepository-ustarel-vmesto-etogo-ispolzujte