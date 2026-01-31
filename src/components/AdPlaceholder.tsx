interface AdProps {
  width: string;
  maxWidth?: string;
  height: string;
  label: string;
}

export const AdPlaceholder = ({ width, maxWidth, height, label }: AdProps) => {
  return (
    <div
      className="bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 text-sm font-medium"
      style={{ width, maxWidth: maxWidth || 'none', height }}
    >
      <span className="mb-1">Advertisement</span>
      <span className="text-xs opacity-70">{label}</span>
    </div>
  );
};