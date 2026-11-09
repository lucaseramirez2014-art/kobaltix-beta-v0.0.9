import {Suspense} from "react";
import RepoClient from "./RepoClient";
export default function Page(){return <Suspense fallback={<div className="min-h-screen bg-[#0c0d0e] text-[#ededed] p-8">Loading repository…</div>}><RepoClient/></Suspense>}