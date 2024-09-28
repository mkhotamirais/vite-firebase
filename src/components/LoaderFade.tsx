import { FadeLoader } from "react-spinners";
export default function LoaderFade() {
  return (
    <div className="flex items-center justify-center py-8">
      <FadeLoader color="hsl(var(--primary))" width={3} height={9} />
    </div>
  );
}
