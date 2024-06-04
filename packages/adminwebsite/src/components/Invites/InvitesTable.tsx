import { Button, Link, SpaceBetween } from "@cloudscape-design/components";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import Table from "@cloudscape-design/components/table";
import TextFilter from "@cloudscape-design/components/text-filter";
import {
  SlackInviteRequest,
  useListSlackInviteRequests,
  useApproveSlackInvites,
} from "@newwwie/adminapi-typescript-react-query-hooks";
import { useState } from "react";

type Props = {
  onApproval: () => void;
};

export default ({ onApproval }: Props) => {
  const { data: inviteRequests, refetch } = useListSlackInviteRequests();
  const { mutateAsync } = useApproveSlackInvites();
  const [selectedItems, setSelectedItems] = useState<SlackInviteRequest[]>([]);

  const approveInvites = () => {
    void mutateAsync({
      approveSlackInvitesRequestContent: {
        invites: selectedItems.map((item) => ({ id: item.id })),
      },
    }).then(async () => {
      await refetch();
      setSelectedItems([]);
      onApproval();
    });
  };

  return inviteRequests?.slackRequests ? (
    <Table
      items={inviteRequests?.slackRequests}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      selectedItems={selectedItems}
      selectionType="multi"
      columnDefinitions={[
        {
          id: "email",
          header: "Email",
          cell: (item) => <Link href="#">{item.email}</Link>,
          isRowHeader: false,
        },
        {
          id: "company",
          header: "Company",
          cell: (item) => item.company,
        },
        {
          id: "position",
          header: "Position",
          cell: (item) => item.position,
        },
        {
          id: "linkedin",
          header: "LinkedIn Profile",
          cell: (item) => (
            <Link href={item.linkedIn ?? "#"}>{item.linkedIn ?? "-"}</Link>
          ),
        },
        {
          id: "hear",
          header: "How did you hear about us?",
          cell: (item) => item.howDidYouHearAboutUs,
        },
      ]}
      columnDisplay={[
        { id: "id", visible: false },
        { id: "email", visible: true },
        { id: "company", visible: true },
        { id: "position", visible: true },
        { id: "linkedin", visible: true },
        { id: "hear", visible: true },
      ]}
      enableKeyboardNavigation
      loadingText="Loading resources"
      trackBy="id"
      filter={
        <TextFilter filteringPlaceholder="Find invites" filteringText="" />
      }
      header={
        <Header
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                onClick={() => approveInvites()}
                disabled={selectedItems.length === 0}
                variant="primary"
              >
                Approve
              </Button>
            </SpaceBetween>
          }
        >
          Slack Invite Requests
        </Header>
      }
      pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
    />
  ) : (
    <div>No Requests</div>
  );
};
