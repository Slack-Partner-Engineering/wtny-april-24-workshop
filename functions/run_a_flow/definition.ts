import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const RunAFlowDefinition = DefineFunction({
  callback_id: "run_a_flow",
  title: "Run a Flow",
  description:
    "Run a Salesforce Flow and wait for the flow output to be returned",
  source_file: "functions/run_a_flow/handler.ts",
  input_parameters: {
    properties: {
      salesforce_access_token: {
        type: Schema.slack.types.oauth2,
        title: "Salesforce access token",
        oauth2_provider_key: "salesforce",
      },
      flow_name: {
        type: Schema.types.string,
        title: "Flow name",
        description: "Only auto-launched flows are supported",
      },
      input_string: {
        type: Schema.types.string,
        title: "Input",
      },
    },
    required: ["salesforce_access_token", "flow_name"],
  },
  output_parameters: {
    properties: {
      output_string: {
        type: Schema.types.string,
        title: "Output string",
      },
    },
    required: [],
  },
});
