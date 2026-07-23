import { NextResponse } from "next/server";
import { matterStatuses } from "@/lib/submissionTypes";
import type { MatterStatus } from "@/lib/submissionTypes";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const newStatus = body.status as MatterStatus;

    if (!matterStatuses.includes(newStatus)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const { data: current, error: currentError } = await supabase
      .from("submissions")
      .select("status")
      .eq("id", id)
      .single();

    if (currentError) {
      return NextResponse.json({ error: currentError.message }, { status: 500 });
    }

    const oldStatus = typeof current?.status === "string" ? current.status : null;
    const { error: updateError } = await supabase.from("submissions").update({ status: newStatus }).eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    const { error: historyError } = await supabase.from("status_history").insert({
      submission_id: id,
      old_status: oldStatus,
      new_status: newStatus,
      changed_by: user.id,
    });

    if (historyError) {
      return NextResponse.json({ error: historyError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Status update failed." },
      { status: 500 },
    );
  }
}
