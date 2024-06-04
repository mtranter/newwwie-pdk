$version: "2"

namespace com.newwwie

@readonly
@http(method: "POST", uri: "/invites/approvals", code: 201)
@handler(language: "typescript")
operation ApproveSlackInvites {
    input: ApproveSlackInvitesRequest
    output: ApproveSlackInviteResponse
}

structure ApproveSlackInvitesRequest {
  @required
  invites: ApproveSlackInviteList
}


list ApproveSlackInviteList {
  member: ApproveSlackInvite
}

structure ApproveSlackInvite {
  @required
  id: String
}

structure ApproveSlackInviteResponse {
  @required
  message: String
}