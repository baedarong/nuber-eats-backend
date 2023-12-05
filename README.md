# 1 INTRODUCTION

누버 이츠 클론 코딩 - Backend using Node.js framework

# 2 GRAPHQL API

**GraphQL 및 TypeScript 시작하기**  
GraphQL은 API를 위한 강력한 쿼리 언어(Query Language)이자, 기존 데이터로 쿼리를 수행하기 위한 런타임(Runtime)입니다. 또한, REST API에서 일반적으로 발견되는 많은 문제(Over-fetching, Under-fetching 등)를 해결하는 접근 방식입니다.

패키지가 설치되면 GraphQLModule을 가져와 forRoot() 정적 메서드로 구성할 수 있습니다.  
forRoot()를 통해 설정한 옵션은 ApolloServer 생성자에 전달됩니다.  
https://docs.nestjs.com/graphql/quick-start#getting-started-with-graphql--typescript

@nestjs/graphql 패키지 설치

    npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql

## TypeScript 및 GraphQL의 활용

**개요**  
Nest는 GraphQL 애플리케이션을 구축하는 두 가지 방법, 즉 code first 및 schema first을 제공합니다.

**Code first (GraphQL스키마를 자동으로 생성)**  
code first 접근 방식에서는 데코레이터와 TypeScript 클래스를 사용하여 해당 GraphQL 스키마(schema.graphql파일)를 생성합니다.  
code first 접근 방식을 사용하려면 먼저 옵션 객체에 autoSchemaFile 속성을 추가하세요.  
autoSchemaFile 속성 값은 자동으로 생성된 스키마가 생성될 경로입니다. 또는 메모리에서 즉석에서 스키마를 생성할 수 있습니다.  
이를 활성화하려면 autoSchemaFile 속성을 true로 설정하십시오.

```
// 경로 지정시 해당 경로에 schema.graphql파일을 생성
autoSchemaFile: join(process.cwd(), 'src/schema.graphql')

// true로 지정시 자동으로 메모리에 생성 (파일은 생성되지 않음)
autoSchemaFile: true
```

https://docs.nestjs.com/graphql/quick-start#code-first

**Schema first (.graphql파일을 직접 생성 및 작성)**  
Schema first 접근 방식을 사용하려면 먼저 옵션 객체에 typePaths 속성을 추가합니다.  
typePaths 속성은 GraphQLModule이 작성할 GraphQL SDL 스키마 정의 파일을 찾아야 하는 위치를 나타냅니다.  
이러한 파일은 메모리에 결합됩니다.이를 통해 스키마를 여러 파일로 분할하고 해당 resolver 근처에서 찾을 수 있습니다.  
https://docs.nestjs.com/graphql/quick-start#schema-first

## **Code first resolver**

Code first방식에서 resolver 클래스는 resolver 함수를 정의하고 Query type을 생성합니다.  
여러 해석기 클래스를 정의할 수 있습니다. Nest는 런타임에 이들을 결합합니다.  
https://docs.nestjs.com/graphql/resolvers#code-first-resolver

## **Object types (@ObjectTypes)**

GraphQL 스키마의 대부분의 정의는 object types입니다.  
정의하는 각 object type은 응용 프로그램 클라이언트가 상호 작용해야 하는 도메인 객체를 나타내야 합니다.  
이 경우 code first 접근 방식을 사용하여 TypeScript 클래스를 사용하여 스키마를 정의하고 TypeScript 데코레이터를 사용하여 해당 클래스의 field에 주석을 추가합니다.  
https://docs.nestjs.com/graphql/resolvers#object-types

## Args decorator

@Args() 데코레이터를 사용하여 메서드 핸들러에서 사용할 요청에서 인수를 추출합니다. 이것은 REST 경로 매개변수 인수 추출과 매우 유사한 방식으로 작동합니다.

```
@Args('id') id: string
```

https://docs.nestjs.com/graphql/resolvers#args-decorator-options

## Input Type (@InputType)

Mutation이 객체를 argument로 취해야 하는 경우 Input type을 만들 수 있습니다.  
Input type은 argument로 전달할 수 있는 특수한 유형의 객체이다.

```
@InputType()
export class UpvotePostInput {
	@Field()
	postId: number;
}
```

https://docs.nestjs.com/graphql/mutations#code-first

## Input Type과 ArgsType의 차이점

@InputType사용  
`@Args('createRestaurantInput') createRestaurantInput: createRestaurantInput  `

@ArgsType사용  
`@Args() createRestaurantInput: CreateResta urantInput`

## Validating Args Types

class-validator, class-transformer 설치

`  npm i class-validator class-transformer
 `

# 3 DATABASE CONFIGURATION

## TypeORM AND PostgreSQL

TypeORM  
https://typeorm.io/#/

Postgres.app  
https://postgresapp.com/

Postico  
https://eggerapps.at/postico

## TypeORM

TypeORM은 NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo 및 Electron 플랫폼에서 실행할 수 있는 ORM이며 TypeScript 및 JavaScript(ES5, ES6, ES7, ES8)와 함께 사용할 수 있습니다.  
https://github.com/typeorm/typeorm

Database  
Nest는 데이터베이스에 구애받지 않으므로 모든 SQL 또는 NoSQL 데이터베이스와 쉽게 통합할 수 있습니다.  
https://docs.nestjs.com/techniques/database

TypeORM Integration  
SQL 및 NoSQL 데이터베이스와의 통합을 위해 Nest는 **@nestjs/typeorm** 패키지를 제공합니다.  
Nest는 TypeScript에서 사용할 수 있는 가장 성숙한 ORM(Object Relational Mapper)이기 때문에 TypeORM을 사용합니다.  
TypeScript로 작성되었기 때문에 Nest 프레임워크와 잘 통합됩니다.

설치

    npm install --save @nestjs/typeorm typeorm pg

_Warning_  
synchronize: true은 production에서 사용하면 안됩니다.  
그렇지 않으면 production 데이터가 손실될 수 있습니다.

## Configuration

응용 프로그램은 종종 다른 환경에서 실행됩니다. 환경에 따라 다른 구성 설정을 사용해야 합니다.  
Nest에서 이 기술을 사용하는 좋은 방법은 적절한 .env 파일을 로드하는 ConfigService를 노출하는 ConfigModule을 만드는 것입니다.

```
npm i @nestjs/config --save
"start:dev": "cross-env NODE_ENV=dev nest start --watch",
```

https://docs.nestjs.com/techniques/configuration

**cross-env**  
cross-env를 통해 가상변수를 설정할 수 있습니다.
NODE_ENV=production으로 환경 변수를 설정하면 대부분의 Windows 명령 프롬프트가 인식합니다. cross-env를 사용하면 플랫폼에 맞게 환경 변수를 설정하거나 사용하는 것에 대해 걱정하지 않고 단일 명령을 사용할 수 있습니다. POSIX 시스템에서 실행되는 것처럼 설정하기만 하면 cross-env가 적절하게 설정합니다.  
`npm i cross-env `
https://www.npmjs.com/package/cross-env

## ConfigModule

**env.dev**

```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

**ConfigModule.forRoot({})**

```
host: process.env.DB_HOST,
port: +process.env.DB_PORT,
username: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
```

## Validating ConfigModule

**Joi**  
JavaScript용 가장 강력한 스키마 설명 언어 및 데이터 유효성 검사기.

    npm i joi
    import  *  as  Joi  from  'joi';

https://joi.dev/api/?v=17.4.2  
https://www.npmjs.com/package/joi

**Schema validation**
Joi 내장 유효성 검사기. Joi를 사용하여 개체 스키마를 정의하고 이에 대해 JavaScript 개체의 유효성을 검사합니다.  
https://docs.nestjs.com/techniques/configuration#schema-validation

**validationOptions**  
allowUnknown: 환경 변수에 알 수 없는 키를 허용할지 여부를 제어합니다. 기본값은 true입니다.  
abortEarly: true인 경우 첫 번째 오류에서 유효성 검사를 중지합니다. 거짓이면 모든 오류를 반환합니다. 기본값은 false입니다.

## 4 TYPEORM AND NEST

## TypeORM Entity

Entity는 **데이터베이스 테이블**(또는 MongoDB를 사용할 때 컬렉션)에 매핑되는 클래스입니다. 새 클래스를 정의하고 @Entity()로 표시하여 엔터티를 만들 수 있습니다. 기본 엔터티는 열과 관계로 구성됩니다. 각 엔터티에는 기본 열(또는 MongoDB를 사용하는 경우 ObjectId 열)이 있어야 합니다(MUST). @PrimaryGeneratedColumn()

https://typeorm.io/#/entities
