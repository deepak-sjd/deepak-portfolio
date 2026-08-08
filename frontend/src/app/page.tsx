
import Navbar from "@/components/layout/Navbar";
import Home from "@/components/sections/Home";
import ScrollProgress from "@/components/common/ScrollProgress";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Home />
    </>
  );
}