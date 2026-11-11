import { createFileRoute } from "@tanstack/react-router";
import { DomainPage } from "@/components/DomainPage";
import { fundedDatasetDomains } from "@/data/funded-dataset-domains.generated";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/datasets/$domain")({
  head: ({ params }) => {
    const domain = fundedDatasetDomains.find((item) => item.key === params.domain);
    const label = domain?.label ?? "Dataset";
    return {
      meta: [
        ...socialMeta,
        { title: `${label} Datasets — Lacuna Fund` },
        {
          name: "description",
          content: `Lacuna Fund projects in ${label}.`,
        },
      ],
    };
  },
  component: DatasetDomainRoute,
});

function DatasetDomainRoute() {
  const { domain } = Route.useParams();
  return <DomainPage domainKey={domain} />;
}
