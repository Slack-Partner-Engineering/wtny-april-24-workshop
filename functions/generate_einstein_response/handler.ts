import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { GenerateEinsteinResponseDefinition } from "./definition.ts";

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(
  GenerateEinsteinResponseDefinition,
  async ({ inputs, client }) => {
    // Get the token:
    const auth = await client.apps.auth.external.get({
      external_token_id: inputs.salesforce_access_token,
    });

    const { external_token, token_response_extras } = auth;
    const instance_url = token_response_extras.instance_url;

    const request_url =
      `${instance_url}/services/data/v60.0/einstein/prompt-templates/${inputs.prompt_template_name}/generations`;

    const request_body = {
      "isPreview": false,
      "inputParams": {
        "valueMap": {
          [`Input:${inputs.template_input_name}`]: {
            "value": {
              "id": `${inputs.template_input_value}`,
            },
          },
        },
      },
      "additionalConfig": {
        "applicationName": "PromptTemplateGenerationsInvocable",
      },
    };

    // Run the flow with REST API
    const response = await fetch(
      request_url,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${external_token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(request_body),
      },
    );
    console.log(JSON.stringify(request_body));

    console.log(response);

    // Check if response failed
    if (!response.ok) {
      const error = "Failed to generate response";
      return { error: error, outputs: { generated_response: error } };
    }

    // Gather outputs
    const response_body = await response.json();
    console.log(response_body);

    const generated_response: string = response_body.generations[0].text;

    // Complete function
    return { outputs: { generated_response } };
  },
);
