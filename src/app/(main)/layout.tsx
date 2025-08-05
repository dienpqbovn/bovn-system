export default async function LayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-auto max-w-7xl p-5 sm:p-10">{children}</main>;
}
