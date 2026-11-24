# 附錄｜gRPC 開發環境（選做）

> gRPC（遠端程序呼叫框架）不是本課主介面；這份附錄只做到「本機 server 與 client 互通」。
> 瀏覽器要直接說 gRPC 需要 gRPC-Web 加 proxy，成本高，列為延伸。

## 1. 安裝

````powershell
bun add @grpc/grpc-js @grpc/proto-loader
````

需要產生強型別時再加：

````powershell
bun add -d ts-proto
````

## 2. 定義服務

````proto
// proto/order.proto
syntax = "proto3";
package order;
service OrderService {
  rpc GetOrder (OrderRequest) returns (OrderReply);
}
message OrderRequest { string id = 1; }
message OrderReply { string id = 1; string status = 2; }
````

## 3. 伺服器

````ts
// server.ts
import * as grpc from "@grpc/grpc-js";
import * as loader from "@grpc/proto-loader";

const pkg = loader.loadSync("proto/order.proto");
const proto = grpc.loadPackageDefinition(pkg) as any;

const server = new grpc.Server();
server.addService(proto.order.OrderService.service, {
  GetOrder: (call: any, cb: any) => cb(null, { id: call.request.id, status: "READY" })
});
server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("gRPC on 50051");
});
````

## 4. 用戶端

````ts
// client.ts
import * as grpc from "@grpc/grpc-js";
import * as loader from "@grpc/proto-loader";

const pkg = loader.loadSync("proto/order.proto");
const proto = grpc.loadPackageDefinition(pkg) as any;
const client = new proto.order.OrderService("localhost:50051", grpc.credentials.createInsecure());

client.GetOrder({ id: "1042" }, (err: any, res: any) => {
  if (err) throw err;
  console.log(res);
});
````

## 5. 執行

| 順序 | 指令 | 預期 |
|---:|---|---|
| 1 | `bun run server.ts` | 顯示 `gRPC on 50051` |
| 2 | 另開終端機 `bun run client.ts` | 印出 `{ id: "1042", status: "READY" }` |

## 6. 瀏覽器端（延伸，成本高）

| 項目 | 說明 |
|---|---|
| 需要 | gRPC-Web 協定＋Envoy（或同等 proxy） |
| 好處 | 強型別、雙向串流 |
| 代價 | 多一層部署、除錯較難 |
| 本課做法 | 主介面 REST；即時更新用 SSE |

## 7. 檢查點

1. server 與 client 能互通，並說出「為什麼瀏覽器不能直接連」。
2. 說出 gRPC 與 REST 各適合什麼情境。
3. 若不做，交件時註明「未實作」，不影響其他分數。
