import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

  return <div>hello dashboard</div>;
}
