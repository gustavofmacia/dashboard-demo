interface Props {
  title: string;
  children: React.ReactNode;
}

export const WidgetItem = ({ title, children }: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-6 py-8">
      <h5 className="text-center text-2xl">{title}</h5>
      {children}
    </div>
  );
};
