import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const GenerateEinsteinResponseDefinition = DefineFunction({
  callback_id: "generate_einstein_response",
  title: "Generate an Einstein prompt template response",
  description:
    "Generates a response based on the specified prompt template and input parameters.",
  source_file: "functions/generate_einstein_response/handler.ts",
  input_parameters: {
    properties: {
      salesforce_access_token: {
        type: Schema.slack.types.oauth2,
        title: "Salesforce access token",
        oauth2_provider_key: "salesforce",
      },
      prompt_template_name: {
        type: Schema.types.string,
        title: "Prompt template API name",
      },
      template_input_name: {
        type: Schema.types.string,
        title: "Template input name",
      },
      template_input_value: {
        type: Schema.types.string,
        title: "Template input value",
        hint: "This needs to be a real value",
      },
    },
    required: [
      "salesforce_access_token",
      "prompt_template_name",
      "template_input_name",
      "template_input_value",
    ],
  },
  output_parameters: {
    properties: {
      generated_response: {
        type: Schema.types.string,
        title: "Generated response",
      },
    },
    required: ["generated_response"],
  },
});
