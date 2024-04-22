import "std/dotenv/load.ts";
import { Manifest } from "deno-slack-sdk/mod.ts";
import SalesforceProvider from "./external_auth/salesforce_provider.ts";
import { RunAFlowDefinition } from "./functions/run_a_flow/definition.ts";
import { GenerateEinsteinResponseDefinition } from "./functions/generate_einstein_response/definition.ts";

// Wildcards are not supported in allow lists
// Parse multiple URLs from a single .env variable
const outgoingDomains = Deno.env.get("SALESFORCE_INSTANCE_DOMAINS")!.split(",");

export default Manifest({
  name: "Salesforce custom functions",
  description:
    "Custom implementation of Salesforce actions to run a flow, invocable action, etc.",
  icon: "assets/icon.png",
  externalAuthProviders: [SalesforceProvider],
  functions: [RunAFlowDefinition, GenerateEinsteinResponseDefinition],
  outgoingDomains: outgoingDomains,
  botScopes: [
    "commands",
  ],
});
