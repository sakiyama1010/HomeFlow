import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { summarizeSweeps } from "./tools/summarize.js";

const server = new McpServer({
  name: "cleaning-mcp",
  version: "0.1.0",
});

server.tool(
  "summarize_sweeps",
  "掃除対象データを要約して返す",
  {},
  async () => {
    return {
      content: [
        {
          type: "json",
          json: await summarizeSweeps(),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
