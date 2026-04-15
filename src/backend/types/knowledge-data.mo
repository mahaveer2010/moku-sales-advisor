module {
  public type ProductSpec = {
    bandwidth : Text;
    adcBits : Nat;
    channels : Nat;
    sampleRate : Text;
    formFactor : Text;
    connectivity : Text;
    voltage : Text;
  };

  public type Product = {
    id : Text;
    name : Text;
    tagline : Text;
    spec : ProductSpec;
    instruments : [Text];
    useCases : [Text];
  };

  public type SolutionMapping = {
    painArea : Text;
    mokModel : Text; // "moku-go" | "moku-pro" | "moku-delta"
    instruments : [Text];
    description : Text;
  };

  public type IndustryVertical = {
    id : Text;
    name : Text;
    overview : Text;
    painAreas : [Text];
    solutionMappings : [SolutionMapping];
  };
};
