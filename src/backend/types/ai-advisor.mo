module {
  // Input types for advisor endpoints

  public type AdvisorContext = {
    vertical : ?Text;
    product : ?Text;
    sessionHistory : ?[SessionMessage];
  };

  public type SessionMessage = {
    role : Text; // "user" | "assistant"
    content : Text;
  };

  // Output types for advisor endpoint

  public type AdvisorResponse = {
    recommendedProduct : Text;
    recommendedInstruments : [Text];
    useCaseSummary : Text;
    nextSteps : [Text];
    rawResponse : Text;
  };

  // Output types for course generator endpoint

  public type CourseModule = {
    moduleName : Text;
    objectives : [Text];
    labExercises : [Text];
  };

  public type CourseOutline = {
    title : Text;
    modules : [CourseModule];
    fullMarkdown : Text;
  };

  // Output types for schematic generator endpoint

  public type Schematic = {
    title : Text;
    asciiDiagram : Text;
    componentList : [Text];
    notes : Text;
  };

  // Output types for presentation generator endpoint

  public type Slide = {
    slideTitle : Text;
    bulletPoints : [Text];
  };

  public type Presentation = {
    title : Text;
    slides : [Slide];
    talkingPointsSummary : Text;
  };
};
