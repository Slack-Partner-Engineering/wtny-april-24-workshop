import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { RunAFlowDefinition } from "./definition.ts";

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(
  RunAFlowDefinition,
  async ({ inputs, client }) => {
    // Get the token:
    const auth = await client.apps.auth.external.get({
      external_token_id: inputs.salesforce_access_token,
    });

    const { external_token, token_response_extras } = auth;
    const instance_url = token_response_extras.instance_url;

    const request_url =
      `${instance_url}/services/data/v60.0/actions/custom/flow/${inputs.flow_name}`;

    const request_body = {
      "inputs": [
        {
          "input_string": inputs.input_string,
        },
      ],
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

    // Check if response failed
    if (!response.ok) {
      console.log(response);
      
      const error = "Failed to run flow";
      return { error: error, outputs: {} };
    }

    // Gather outputs
    const response_body = await response.json();
    console.log(response_body);
    
    const output_string: string = response_body[0].outputValues.output_string;

    // Complete function
    return { outputs: { output_string } };
  },
);
