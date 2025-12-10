import useClient from "../../hooks/useClient";

const Sitemap = () => {
  const { data, isLoading } = useClient({
    queryKey: ["Sitemap"],
    url: "/profile/settings/static-pages",
    isPrivate: false,
  });

  const terms = data?.staticPage || [];
  const sitemap = terms.find(
    (item: any) => item.type === "about_us"
  );

  if (isLoading) {
    return (
      <div className="section-padding-x section-padding-y text-center text-gray-500">
        Loading sitemap...
      </div>
    );
  }

  return (
    <section className="bg-gray-50">
      <div className="section-padding-x section-padding-y max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-semibold text-gray-800 mb-6 text-center">
          Sitemap
        </h1>

        {/* Divider */}
        <div className="w-20 h-1 bg-[#0E9FBA] mx-auto mb-10 rounded-full" />

        {/* Content */}
        <div
          className="
            bg-white
            rounded-xl
            shadow-sm
            px-6 sm:px-10
            py-8
            text-left
            prose prose-gray max-w-none
            prose-h1:text-2xl
            prose-h2:text-xl
            prose-h3:text-lg
            prose-p:leading-relaxed
            prose-a:text-[#0E9FBA]
            prose-a:no-underline
            hover:prose-a:underline
          "
          dangerouslySetInnerHTML={{ __html: sitemap?.body }}
        />
      </div>
    </section>
  );
};

export default Sitemap;