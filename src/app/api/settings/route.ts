import {NextResponse} from "next/server"; import {clearData} from "@/lib/store"; export async function DELETE(req: Request){
  if (process.env.NODE_ENV === "production" || process.env.LOCAL_DATA_ADMIN !== "true") return NextResponse.json({ error: "Data clearing is local-only and disabled" }, { status: 403 });
  const token = req.headers.get("x-local-admin");
  if (!token || token !== process.env.LOCAL_DATA_ADMIN_TOKEN) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await clearData(); return NextResponse.json({ ok: true });
}
