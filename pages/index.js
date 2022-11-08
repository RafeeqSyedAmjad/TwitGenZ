import Head from "next/head";
import Sidebar from "../components/Sidebar";
import { getProviders, getSession, useSession } from "next-auth/react";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Modal from "../components/Modal";  
import { useRecoilState } from "recoil"; 
import {modalState} from "../atoms/modalAtom";   
import Widgets from "../components/Widgets";

export default function Home({trendingResults, followResults, providers}) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);


  if (!session) return <Login providers={providers} />;


  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className="bg-[#15202b] min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar/>
        <Feed/>
        <Widgets
          trendingResults = {trendingResults}
          followResults = {followResults}
        />

        {isOpen && <Modal />}
        
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://api.npoint.io/6ae2de55f8bf30eacda5").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://api.npoint.io/205fd0f681370da77497").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
