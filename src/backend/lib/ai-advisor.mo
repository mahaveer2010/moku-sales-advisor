import OutCall "outcall";
import Types "../types/ai-advisor";
import Text "mo:core/Text";
import Array "mo:core/Array";
module {
  // ── System prompt ──────────────────────────────────────────────────────────
  let systemPrompt : Text = "You are an expert sales and solutions engineer for Liquid Instruments. You specialize in Moku Go, Moku Pro, and Moku Delta hardware platforms and their software instruments. Always respond with valid JSON only — no markdown fences, no prose outside the JSON. Focus responses on practical sales advice, technical specifications, use-case mapping, and domain-specific solution architectures for verticals such as aerospace, defense, ISRO, OEMs (Tejas Networks, Lekha Wireless), telecom, research, and education.";

  // ── JSON helpers ───────────────────────────────────────────────────────────

  // Escape a Text value for safe embedding in a JSON string.
  func jsonEscape(s : Text) : Text {
    s.replace(#text "\\", "\\\\").replace(#text "\"", "\\\"").replace(#text "\n", "\\n").replace(#text "\r", "\\r")
  };

  // Extract the value of a JSON string field: "key":"<value>"
  // Finds the first occurrence of "fieldName":"..." and returns the value.
  func extractField(json : Text, fieldName : Text) : Text {
    let needle = "\"" # fieldName # "\":\"";
    let it = json.split(#text needle);
    ignore it.next(); // part before the needle
    switch (it.next()) {
      case null { "" };
      case (?afterKey) {
        switch (afterKey.split(#text "\"").next()) {
          case null { "" };
          case (?value) { value };
        };
      };
    };
  };

  // Extract an array of strings from a JSON array field: "key":["a","b","c"]
  func extractArray(json : Text, fieldName : Text) : [Text] {
    let needle = "\"" # fieldName # "\":[";
    let it = json.split(#text needle);
    ignore it.next(); // part before the needle
    switch (it.next()) {
      case null { [] };
      case (?afterBracket) {
        // Grab content up to closing ]
        switch (afterBracket.split(#text "]").next()) {
          case null { [] };
          case (?arrayContent) {
            // Split on "," and strip surrounding quotes/whitespace
            let raw = arrayContent.split(#text ",").toArray();
            let cleaned = raw.map(func(item : Text) : Text {
              item.replace(#text "\"", "").trim(#text " ").trim(#text "\n").trim(#text "\r")
            });
            cleaned.filter(func(s : Text) : Bool { not s.isEmpty() })
          };
        };
      };
    };
  };

  // Extract the LLM content string from an Anthropic Messages API JSON response.
  // Response shape: { "content": [ { "type": "text", "text": "..." }, ... ] }
  // When extended thinking is on, the content array may also include a thinking block.
  // We find the first object with "type":"text" and return its "text" field.
  func extractContent(responseJson : Text) : Text {
    // Split on "\"type\":\"text\"" to find the text block
    let typeNeedle = "\"type\":\"text\"";
    let it = responseJson.split(#text typeNeedle);
    ignore it.next(); // part before first match
    switch (it.next()) {
      case null {
        // Fallback: try to extract plain "text" field
        let fallback = extractField(responseJson, "text");
        if (fallback.isEmpty()) responseJson else fallback
      };
      case (?afterType) {
        // After "type":"text", look for "text":"<value>"
        let textNeedle = "\"text\":\"";
        let parts = afterType.split(#text textNeedle).toArray();
        if (parts.size() < 2) {
          responseJson
        } else {
          // parts[1] starts right after the opening quote of the text value
          let rest = parts[1];
          // Use the same extractField approach on a synthetic fragment
          let synthetic = "{\"text\":\"" # rest;
          let extracted = extractField(synthetic, "text");
          if (extracted.isEmpty()) responseJson else extracted
        };
      };
    };
  };

  // Build an Anthropic Messages API request body.
  // When extendedThinking is true and the model supports it (claude-3-7-sonnet),
  // a top-level "thinking" field is added with budget_tokens.
  func buildRequest(
    userMessage : Text,
    history : [Types.SessionMessage],
    model : Text,
    extendedThinking : Bool,
  ) : Text {
    // Build messages array from history + current user message (no system role in messages for Anthropic)
    var messagesArr = "";
    var first = true;
    for (msg in history.values()) {
      if (not first) { messagesArr #= "," };
      messagesArr #= "{\"role\":\"" # jsonEscape(msg.role) # "\",\"content\":\"" # jsonEscape(msg.content) # "\"}";
      first := false;
    };
    if (not first) { messagesArr #= "," };
    messagesArr #= "{\"role\":\"user\",\"content\":\"" # jsonEscape(userMessage) # "\"}";

    let systemField = "\"system\":\"" # jsonEscape(systemPrompt) # "\"";

    // Extended thinking is only supported on claude-3-7-sonnet-20250219
    let useThinking = extendedThinking and model.startsWith(#text "claude-3-7");

    let thinkingField = if (useThinking) {
      ",\"thinking\":{\"type\":\"enabled\",\"budget_tokens\":8000}"
    } else { "" };

    // Extended thinking requires a higher max_tokens to accommodate the thinking budget
    let maxTokens = if (useThinking) { "16000" } else { "4096" };

    "{\"model\":\"" # jsonEscape(model) # "\"," # systemField #
      ",\"max_tokens\":" # maxTokens #
      ",\"messages\":[" # messagesArr # "]" #
      thinkingField # "}"
  };

  // POST to Anthropic and return the content string from the response.
  func callLLM(
    prompt : Text,
    history : [Types.SessionMessage],
    apiKey : Text,
    model : Text,
    extendedThinking : Bool,
    transform : OutCall.Transform,
  ) : async Text {
    let body = buildRequest(prompt, history, model, extendedThinking);
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "x-api-key"; value = apiKey },
      { name = "anthropic-version"; value = "2023-06-01" },
    ];
    let raw = await OutCall.httpPostRequest(
      "https://api.anthropic.com/v1/messages",
      headers,
      body,
      transform,
    );
    extractContent(raw)
  };

  // ── Array-of-object parsers ────────────────────────────────────────────────

  // Parse the "modules" array from course JSON.
  func parseModules(json : Text) : [Types.CourseModule] {
    let needle = "\"modules\":[";
    let it = json.split(#text needle);
    ignore it.next();
    switch (it.next()) {
      case null { [] };
      case (?arrContent) {
        let chunks = arrContent.split(#text "{").toArray();
        var modules : [Types.CourseModule] = [];
        for (chunk in chunks.values()) {
          if (not chunk.isEmpty()) {
            let fragment = "{" # chunk;
            let m : Types.CourseModule = {
              moduleName = extractField(fragment, "moduleName");
              objectives = extractArray(fragment, "objectives");
              labExercises = extractArray(fragment, "labExercises");
            };
            if (not m.moduleName.isEmpty()) {
              modules := modules.concat([m]);
            };
          };
        };
        modules
      };
    };
  };

  // Parse the "slides" array from presentation JSON.
  func parseSlides(json : Text) : [Types.Slide] {
    let needle = "\"slides\":[";
    let it = json.split(#text needle);
    ignore it.next();
    switch (it.next()) {
      case null { [] };
      case (?arrContent) {
        let chunks = arrContent.split(#text "{").toArray();
        var slides : [Types.Slide] = [];
        for (chunk in chunks.values()) {
          if (not chunk.isEmpty()) {
            let fragment = "{" # chunk;
            let s : Types.Slide = {
              slideTitle = extractField(fragment, "slideTitle");
              bulletPoints = extractArray(fragment, "bulletPoints");
            };
            if (not s.slideTitle.isEmpty()) {
              slides := slides.concat([s]);
            };
          };
        };
        slides
      };
    };
  };

  // ── Public lib functions ───────────────────────────────────────────────────

  // Calls the LLM via http-outcalls to produce structured sales advice.
  public func getAdvisorAdvice(
    userQuery : Text,
    context : Types.AdvisorContext,
    apiKey : Text,
    model : Text,
    extendedThinking : Bool,
    transform : OutCall.Transform,
  ) : async Types.AdvisorResponse {
    let verticalNote = switch (context.vertical) {
      case (?v) { " Target vertical: " # v # "." };
      case null { "" };
    };
    let productNote = switch (context.product) {
      case (?p) { " Focus on product: " # p # "." };
      case null { "" };
    };
    let history = switch (context.sessionHistory) {
      case (?h) { h };
      case null { [] };
    };

    let prompt = "Provide structured sales advice for the following query: " # userQuery #
      verticalNote # productNote #
      " Respond with a JSON object with exactly these fields: " #
      "recommendedProduct (string), recommendedInstruments (array of strings), " #
      "useCaseSummary (string), nextSteps (array of strings).";

    let raw = await callLLM(prompt, history, apiKey, model, extendedThinking, transform);

    {
      recommendedProduct = extractField(raw, "recommendedProduct");
      recommendedInstruments = extractArray(raw, "recommendedInstruments");
      useCaseSummary = extractField(raw, "useCaseSummary");
      nextSteps = extractArray(raw, "nextSteps");
      rawResponse = raw;
    }
  };

  // Calls the LLM via http-outcalls to generate a multi-module training course outline.
  public func generateCourse(
    vertical : Text,
    product : ?Text,
    apiKey : Text,
    model : Text,
    extendedThinking : Bool,
    transform : OutCall.Transform,
  ) : async Types.CourseOutline {
    let productNote = switch (product) {
      case (?p) { " focusing on " # p };
      case null { "" };
    };

    let prompt = "Generate a comprehensive training course outline for the " # vertical #
      " vertical" # productNote # " using Liquid Instruments Moku platforms. " #
      "Include Verilog, VHDL, Python API, and MATLAB API modules where relevant. " #
      "Respond with a JSON object with exactly these fields: " #
      "title (string), fullMarkdown (string containing the full course in markdown format), " #
      "modules (array of objects each with moduleName, objectives, labExercises — all strings or string arrays).";

    let raw = await callLLM(prompt, [], apiKey, model, extendedThinking, transform);

    {
      title = extractField(raw, "title");
      modules = parseModules(raw);
      fullMarkdown = extractField(raw, "fullMarkdown");
    }
  };

  // Calls the LLM via http-outcalls to produce an ASCII signal flow schematic.
  public func generateSchematic(
    useCaseDescription : Text,
    apiKey : Text,
    model : Text,
    extendedThinking : Bool,
    transform : OutCall.Transform,
  ) : async Types.Schematic {
    let prompt = "Generate an ASCII signal flow schematic for the following use case: " # useCaseDescription #
      " Respond with a JSON object with exactly these fields: " #
      "title (string), asciiDiagram (string with ASCII art signal flow diagram), " #
      "componentList (array of strings listing each component), notes (string with design notes).";

    let raw = await callLLM(prompt, [], apiKey, model, extendedThinking, transform);

    {
      title = extractField(raw, "title");
      asciiDiagram = extractField(raw, "asciiDiagram");
      componentList = extractArray(raw, "componentList");
      notes = extractField(raw, "notes");
    }
  };

  // Calls the LLM via http-outcalls to produce an executive slide deck outline.
  public func generatePresentation(
    vertical : Text,
    product : Text,
    apiKey : Text,
    model : Text,
    extendedThinking : Bool,
    transform : OutCall.Transform,
  ) : async Types.Presentation {
    let prompt = "Create an executive slide deck outline for selling " # product #
      " to the " # vertical # " vertical. " #
      "Respond with a JSON object with exactly these fields: " #
      "title (string), talkingPointsSummary (string), " #
      "slides (array of objects each with slideTitle (string) and bulletPoints (array of strings)).";

    let raw = await callLLM(prompt, [], apiKey, model, extendedThinking, transform);

    {
      title = extractField(raw, "title");
      slides = parseSlides(raw);
      talkingPointsSummary = extractField(raw, "talkingPointsSummary");
    }
  };
};
