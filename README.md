# Auth Grpc Microservice | NestJs Monorepo

Commands For Generating the directory structure.

```bash
nest generate app auth
nest g resource users
yarn add --save @nestjs/microservices @grpc/grpc-js @grpc/proto-loader ts-proto
```

Proto type command auto generations from proto file (UNIX systems).

```bash
# Its one whole command. [Jhus to reduce scrolling space, but its supposed to be one line]
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./ 
--ts_proto_opt=nestJs ./proto/auth.proto
```

What worked for me! (On Windows)

```bash
# Its one whole command.  [Jhus to reduce scrolling space, but its supposed to be one line]
protoc --plugin=protoc-gen-ts_proto=C:\Users\editing\Desktop\coding\auth-grpc\node_modules\.bin\protoc-gen-ts_proto.cmd 
--ts_proto_out=./ --ts_proto_opt=nestJs ./proto/auth.proto
```

Generating the shared common lib directory

```bash
nest g lib common
```

Generating the user rest api types within the apigateway

```bash
nest g resource users
```

Built with love
