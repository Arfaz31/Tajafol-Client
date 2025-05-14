export default function ProductFeatures() {
  return (
    <div className="bg-background rounded-lg p-5">
      <h4 className="font-semibold mb-3">Product Features</h4>
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
            ✓
          </span>
          <span>Premium quality fruit from the best farms</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
            ✓
          </span>
          <span>Hand-picked at the peak of ripeness</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
            ✓
          </span>
          <span>No artificial ripening agents used</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
            ✓
          </span>
          <span>Direct from farm to your doorstep</span>
        </li>
      </ul>
    </div>
  );
}
