$version: "2"

namespace com.newwwie

@readonly
@http(method: "POST", uri: "/invites", code: 201)
@handler(language: "typescript")
operation CreateSlackInvite {
    input: CreateSlackInviteRequest
    output: CreateSlackInviteResponse
}

structure CreateSlackInviteRequest {
  @required
  email: String

  @required
  company: String

  @required
  position: String

  linkedIn: String

  @required
  howDidYouHearAboutUs: String

  anythinElse: String
}

structure CreateSlackInviteResponse {
  @required
  message: String
}