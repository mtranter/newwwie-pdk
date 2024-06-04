$version: "2"

namespace com.newwwie

use aws.protocols#restJson1
/// A sample smithy api

@restJson1
service AdminApi {
    version: "1.0"
    operations: [
        ListSlackInviteRequests
        ApproveSlackInvites
        ListSlackMembers
    ]
    errors: [
        BadRequestError
        NotAuthorizedError
        InternalFailureError
    ]
}
