import OutCall "../lib/outcall";
import Types "../types/ai-advisor";
import AiAdvisorLib "../lib/ai-advisor";

mixin () {
  var apiKey : Text = "";
  var currentModel : Text = "claude-3-5-sonnet-20241022";
  var extendedThinkingEnabled : Bool = false;

  // Transform callback required by the IC http-outcalls mechanism.
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Set the Anthropic API key.
  public func setApiKey(key : Text) : async () {
    apiKey := key;
  };

  // Set the Claude model to use.
  // Supported: "claude-3-5-sonnet-20241022" (default), "claude-3-7-sonnet-20250219"
  public func setModel(model : Text) : async () {
    currentModel := model;
  };

  // Return the currently selected model.
  public query func getModel() : async Text {
    currentModel
  };

  // Enable or disable extended thinking (only effective with claude-3-7-sonnet-20250219).
  public func setExtendedThinking(enabled : Bool) : async () {
    extendedThinkingEnabled := enabled;
  };

  // Return whether extended thinking is currently enabled.
  public query func getExtendedThinking() : async Bool {
    extendedThinkingEnabled
  };

  // Returns structured sales advice for a given user query and optional context.
  public func getAdvisorAdvice(
    userQuery : Text,
    context : Types.AdvisorContext,
  ) : async Types.AdvisorResponse {
    await AiAdvisorLib.getAdvisorAdvice(userQuery, context, apiKey, currentModel, extendedThinkingEnabled, transform);
  };

  // Generates a multi-module training course outline for a vertical and optional product.
  public func generateCourse(
    vertical : Text,
    product : ?Text,
  ) : async Types.CourseOutline {
    await AiAdvisorLib.generateCourse(vertical, product, apiKey, currentModel, extendedThinkingEnabled, transform);
  };

  // Produces an ASCII signal flow schematic for a described use case.
  public func generateSchematic(
    useCaseDescription : Text,
  ) : async Types.Schematic {
    await AiAdvisorLib.generateSchematic(useCaseDescription, apiKey, currentModel, extendedThinkingEnabled, transform);
  };

  // Produces an executive slide deck outline for a vertical and product.
  public func generatePresentation(
    vertical : Text,
    product : Text,
  ) : async Types.Presentation {
    await AiAdvisorLib.generatePresentation(vertical, product, apiKey, currentModel, extendedThinkingEnabled, transform);
  };
};
