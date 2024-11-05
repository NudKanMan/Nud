import { redirect, RedirectType } from 'next/navigation';

export default function Home() {
  return redirect("/home", RedirectType.push);
}
