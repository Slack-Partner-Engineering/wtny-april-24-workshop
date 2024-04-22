import "std/dotenv/load.ts";
import { DefineOAuth2Provider, Schema } from "deno-slack-sdk/mod.ts";

const SalesforceProvider = DefineOAuth2Provider({
  provider_key: "salesforce",
  provider_type: Schema.providers.oauth2.CUSTOM,
  options: {
    provider_name: "Salesforce",
    authorization_url: "https://login.salesforce.com/services/oauth2/authorize",
    token_url: "https://login.salesforce.com/services/oauth2/token",
    client_id: Deno.env.get("CLIENT_ID")!,
    scope: ["full", "refresh_token"],
    authorization_url_extras: {
      prompt: "login",
    },
    use_pkce: false,
    identity_config: {
      url: "https://login.salesforce.com/services/oauth2/userinfo",
      account_identifier: "$.preferred_username",
    },
  },
});

export default SalesforceProvider;
