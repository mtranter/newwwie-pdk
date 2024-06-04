$version: "2"

namespace com.newwwie

use aws.protocols#restJson1
/// A sample smithy api

@restJson1
service PublicApi {
    version: "1.0"
    operations: [CreateSlackInvite]
    errors: [
        BadRequestError
        NotAuthorizedError
        InternalFailureError
    ]
}
