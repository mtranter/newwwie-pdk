/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import {
  ContentLayout,
  Header,
  SpaceBetween,
  // Spinner,
} from "@cloudscape-design/components";
import { useState } from "react";
import InvitesTable from "./../../components/Invites/InvitesTable";
import MembersTable from "./../../components/Members/MembersTable";
// import { useSayHello } from "adminapi-typescript-react-query-hooks";

/**
 * Component to render the home "/" route.
 */
const Home: React.FC = () => {
  const [refreshId, setRefreshId] = useState(0);
  const onMemberApproved = () => {
    setRefreshId(refreshId + 1);
  };
  return (
    <ContentLayout header={<Header>Home</Header>}>
      <SpaceBetween size="l">
        <InvitesTable onApproval={onMemberApproved} />
        <MembersTable refreshId={refreshId} />
      </SpaceBetween>
    </ContentLayout>
  );
};

export default Home;
