import Text "mo:core/Text";

module {
  // ── IC Management Canister types ─────────────────────────────────────────

  type HttpHeader = { name : Text; value : Text };

  type HttpRequestResult = {
    status : Nat;
    headers : [HttpHeader];
    body : Blob;
  };

  type TransformArgs = {
    response : HttpRequestResult;
    context : Blob;
  };

  type IC = actor {
    http_request : ({
      url : Text;
      max_response_bytes : ?Nat64;
      method : { #get; #head; #post };
      headers : [HttpHeader];
      body : ?Blob;
      transform : ?{
        function : query TransformArgs -> async HttpRequestResult;
        context : Blob;
      };
      is_replicated : ?Bool;
    }) -> async HttpRequestResult;
  };

  let ic : IC = actor "aaaaa-aa";

  // ── Public types (matches caffeineai-http-outcalls interface) ─────────────

  public type Header = { name : Text; value : Text };

  public type TransformationInput = {
    context : Blob;
    response : HttpRequestResult;
  };

  public type TransformationOutput = HttpRequestResult;

  public type Transform = query TransformationInput -> async TransformationOutput;

  // ── transform helper (strip non-deterministic headers) ───────────────────

  public func transform(input : TransformationInput) : TransformationOutput {
    { input.response with headers = [] };
  };

  // ── HTTP GET ──────────────────────────────────────────────────────────────

  public func httpGetRequest(url : Text, extraHeaders : [Header], transformFn : Transform) : async Text {
    let response = await ic.http_request({
      url;
      max_response_bytes = ?(20_000 : Nat64);
      method = #get;
      headers = extraHeaders;
      body = null;
      transform = ?{ function = transformFn; context = "" };
      is_replicated = ?false;
    });
    switch (response.body.decodeUtf8()) {
      case (?t) { t };
      case null { "" };
    };
  };

  // ── HTTP POST ─────────────────────────────────────────────────────────────

  public func httpPostRequest(url : Text, extraHeaders : [Header], body : Text, transformFn : Transform) : async Text {
    let response = await ic.http_request({
      url;
      max_response_bytes = ?(20_000 : Nat64);
      method = #post;
      headers = extraHeaders;
      body = ?(body.encodeUtf8());
      transform = ?{ function = transformFn; context = "" };
      is_replicated = ?false;
    });
    switch (response.body.decodeUtf8()) {
      case (?t) { t };
      case null { "" };
    };
  };
};
