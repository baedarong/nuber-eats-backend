## 1 INTRODUCTION

누버 이츠 클론 코딩 - Backend using nestJS

# 2 GRAPHQL API

    패키지 설치
    npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql

## TypeScript 및 GraphQL의 성능 활용

**개요**  
Nest는 GraphQL 애플리케이션을 구축하는 두 가지 방법, 즉 code first 및 schema first을 제공합니다.

**GraphQL 및 TypeScript 시작하기**  
GraphQL은 API를 위한 강력한 쿼리 언어(Query Language)이자, 기존 데이터로 쿼리를 수행하기 위한 런타임(Runtime)입니다. 또한, REST API에서 일반적으로 발견되는 많은 문제(Over-fetching, Under-fetching 등)를 해결하는 접근 방식입니다.

패키지가 설치되면 GraphQLModule을 가져와 forRoot() 정적 메서드로 구성할 수 있습니다.  
forRoot()를 통해 설정한 옵션은 ApolloServer 생성자에 전달됩니다.  
https://docs.nestjs.com/graphql/quick-start#getting-started-with-graphql--typescript

**Code first (GraphQL스키마를 자동으로 생성)**  
code first 접근 방식에서는 데코레이터와 TypeScript 클래스를 사용하여 해당 GraphQL 스키마(schema.graphql파일)를 생성합니다.  
code first 접근 방식을 사용하려면 먼저 옵션 객체에 autoSchemaFile 속성을 추가하세요.  
autoSchemaFile 속성 값은 자동으로 생성된 스키마가 생성될 경로입니다.또는 메모리에서 즉석에서 스키마를 생성할 수 있습니다.  
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

GraphQL Playground (샌드박스용)  
https://studio.apollographql.com/sandbox/explorer

GraphQL Playground IDE  
https://github.com/graphql/graphql-playground#installation

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
`@Args() createRestaurantInput: CreateRestaurantInput`

## class-validator, class-transformer 설치

`  npm i class-validator class-transformer
 `
