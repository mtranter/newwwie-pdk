$version: "2"
namespace com.newwwie

@readonly
@http(method: "GET", uri: "/invites")
@handler(language: "typescript")
operation ListSlackInviteRequests {
    output: ListSlackInviteRequestsResponse
}

structure ListSlackInviteRequestsResponse {
  @required
  slackRequests: SlackInviteRequests
}

list SlackInviteRequests {
    member: SlackInviteRequest
}

structure SlackInviteRequest {
  @required
  id: String
  
  @required
  email: String

  @required
  company: String

  @required
  position: String

  linkedIn: String

  @required
  howDidYouHearAboutUs: String

  anythingElse: String
}