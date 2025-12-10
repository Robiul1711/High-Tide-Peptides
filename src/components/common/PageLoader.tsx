const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="h-12 w-12 rounded-full border-4 border-[#0E9FBA] border-t-transparent animate-spin" />
    </div>
  );
};

export default PageLoader;
