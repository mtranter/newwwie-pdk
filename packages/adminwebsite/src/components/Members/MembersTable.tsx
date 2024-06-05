import {
  Button,
  Header,
  Link,
  SpaceBetween,
} from "@cloudscape-design/components";
import Pagination from "@cloudscape-design/components/pagination";
import Table from "@cloudscape-design/components/table";
import TextFilter from "@cloudscape-design/components/text-filter";
import {
  SlackInviteRequest,
  useListSlackMembers,
} from "@newwwie/adminapi-typescript-react-query-hooks";
import { useState } from "react";

type Props = {
  refreshId: number;
};

export default (_: Props) => {
  const { data } = useListSlackMembers({
    refetchInterval: 1000,
  });
  const [selectedItems, setSelectedItems] = useState<SlackInviteRequest[]>([]);

  return data?.members ? (
    <Table
      items={data?.members}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      selectedItems={selectedItems}
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
        <TextFilter filteringPlaceholder="Find Members" filteringText="" />
      }
      pagination={<Pagination currentPageIndex={1} pagesCount={1} />}
      header={<Header>Newwwie Slack Members</Header>}
    />
  ) : (
    <div>No Members 😔</div>
  );
};
