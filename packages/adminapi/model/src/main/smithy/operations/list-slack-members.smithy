$version: "2"

namespace com.newwwie

@readonly
@http(method: "GET", uri: "/member")
@handler(language: "typescript")
operation ListSlackMembers {
    output: ListSlackMembersResponse
}

structure ListSlackMembersResponse {
    @required
    members: SlackMembers
}

list SlackMembers {
    member: SlackMember
}

structure SlackMember {
    @required
    id: String
    @required
    createDateISO: String
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
